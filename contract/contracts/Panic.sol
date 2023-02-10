// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "../interface/INonfungiblePositionManager.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Panic is Ownable, Initializable, ERC721Holder {

    struct LossInputs {
        address token0;
        address token1;
        uint256 p0Initial;
        uint256 p1Initial;
        uint256 p0Current;
        uint256 p1Current;
        uint256 amount; // percent loss * 100 (if loss of 0.1 %, amount = 10)
        uint128 liquidity;
        address nonFungablePositionManager;
    }

    address public usdc = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public uniswapv3Factory = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

    mapping(uint256 => bool) public checkPositions;
    mapping(uint256 => LossInputs) public lossInputs;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    event PanicTransfer(address indexed _from, address indexed _to);
    event PanicUniswapV3LiquidityRemoved(
        address indexed _user,
        uint256 _tokenId,
        address indexed _token0,
        address indexed _token1,
        uint256 _amount0,
        uint256 _amount1
    );
    event PanicUniswapV3LiquidityLooking(
        address indexed _user,
        address indexed _token0,
        address indexed _token1,
        uint256 _tokenId
    );

    function assetsTransfer(
        address _newOwner,
        address[] memory _erc20,
        address[] memory _erc721
    ) external {
        for (uint256 i = 0; i < _erc20.length; i++) {
            uint256 senderBalance = IERC20(_erc20[i]).balanceOf(msg.sender);
            IERC20(_erc20[i]).transferFrom(
                msg.sender,
                address(this),
                senderBalance
            );
            IERC20(_erc20[i]).transfer(_newOwner, senderBalance);
        }

        for (uint256 i = 0; i < _erc721.length; i++) {
            uint256 senderBalance = IERC721(_erc721[i]).balanceOf(msg.sender);
            IERC721(_erc721[i]).transferFrom(
                msg.sender,
                address(this),
                senderBalance
            );
            IERC721(_erc721[i]).transferFrom(
                address(this),
                _newOwner,
                senderBalance
            );
        }

        emit PanicTransfer(msg.sender, _newOwner);
    }

    function removeUniswapV3Liquidity(
        INonfungiblePositionManager _nonfungiblePositionManager,
        uint256 _tokenId,
        address token0,
        address token1,
        uint128 liquidity
    ) public {
        _nonfungiblePositionManager.safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId
        );

        INonfungiblePositionManager.DecreaseLiquidityParams
            memory params = INonfungiblePositionManager
                .DecreaseLiquidityParams({
                    tokenId: _tokenId,
                    liquidity: liquidity,
                    amount0Min: 0,
                    amount1Min: 0,
                    deadline: block.timestamp + 3000
                });

        (uint256 amount0, uint256 amount1) = _nonfungiblePositionManager
            .decreaseLiquidity(params);

        INonfungiblePositionManager.CollectParams
            memory collectParams = INonfungiblePositionManager.CollectParams({
                tokenId: _tokenId,
                recipient: address(this),
                amount0Max: uint128(amount0),
                amount1Max: uint128(amount1)
            });
        _nonfungiblePositionManager.collect(collectParams);

        _nonfungiblePositionManager.approve(msg.sender, _tokenId);
        _nonfungiblePositionManager.safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId
        );

        IERC20(token0).approve(msg.sender, amount0);
        IERC20(token1).approve(msg.sender, amount1);
        IERC20(token0).transfer(
            msg.sender,
            IERC20(token0).balanceOf(address(this))
        );
        IERC20(token1).transfer(
            msg.sender,
            IERC20(token1).balanceOf(address(this))
        );

        checkPositions[_tokenId] = false;


        emit PanicUniswapV3LiquidityRemoved(
            msg.sender,
            _tokenId,
            token0,
            token1,
            amount0,
            amount1
        );
    }

    function lookForUniswapV3Liquidity(
        INonfungiblePositionManager _nonfungiblePositionManager,
        uint256 _tokenId,
        address token0,
        address token1,
        uint256 token0InitialPrice,
        uint256 token1InitialPrice,
        uint256 checkloss,
        uint128 liquidity
    ) external {
        require(_nonfungiblePositionManager.ownerOf(_tokenId) == msg.sender, "Panic: Not owner");
        require(!checkPositions[_tokenId], "Panic: Already looking");

        checkPositions[_tokenId] = true;

        lossInputs[_tokenId] = LossInputs({
            token0: token0,
            token1: token1,
            p0Initial: token0InitialPrice,
            p1Initial: token1InitialPrice,
            p0Current: token0InitialPrice,
            p1Current: token0InitialPrice,
            amount: checkloss,
            liquidity: liquidity,
            nonFungablePositionManager: address(_nonfungiblePositionManager)
        });

        emit PanicUniswapV3LiquidityLooking(
            msg.sender,
            token0,
            token1,
            _tokenId
        );

    }

    function changeLossInputs(LossInputs memory inputs, uint256 _tokenId) external {
        require(checkPositions[_tokenId], "Panic: Not looking");
        lossInputs[_tokenId] = inputs;
    }

    function calculateImpermanentLoss(LossInputs memory inputs) public view returns (uint256) {
        return ((inputs.p0Initial * inputs.p1Current - inputs.p1Initial * inputs.p0Current) * 100) / (inputs.p0Initial + inputs.p1Initial);
    }

    function removeLiquidityIfLoss(uint256 _tokenId) external {
        require(checkPositions[_tokenId], "Panic: Not looking");
        
        uint256 loss = calculateImpermanentLoss(lossInputs[_tokenId]);
        
        if(loss > lossInputs[_tokenId].amount) {
            removeUniswapV3Liquidity(INonfungiblePositionManager(lossInputs[_tokenId].nonFungablePositionManager), _tokenId, lossInputs[_tokenId].token0, lossInputs[_tokenId].token1, lossInputs[_tokenId].liquidity);
        }

    }


}
