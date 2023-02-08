const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");

describe("Uniswap Liquidity Provider", function () {
  // All Addresses
  const positionsManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  const daiAddress = "0x88271d333C72e51516B67f5567c728E702b3eeE8";
  const usdcAddress = "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7";

  const erc20Abi = JSON.parse(fs.readFileSync("./test/abi/erc20.json"));

  it("Should mint test tokens and approve to position manager", async function () {
    const [alice, bob] = await ethers.getSigners();

    const dai = await ethers.getContractAt(erc20Abi, daiAddress, alice);
    await dai.mint(alice.address, ethers.utils.parseEther("1000"));
    await dai.mint(bob.address, ethers.utils.parseEther("1000"));

    const usdc = await ethers.getContractAt(erc20Abi, usdcAddress, alice);
    await usdc.mint(alice.address, ethers.utils.parseUnits("1000"));
    await usdc.mint(bob.address, ethers.utils.parseUnits("1000"));

    expect(await dai.balanceOf(alice.address)).above(
      ethers.utils.parseEther("100")
    );
    expect(await dai.balanceOf(bob.address)).above(
      ethers.utils.parseEther("100")
    );

    expect(await usdc.balanceOf(alice.address)).above(
      ethers.utils.parseUnits("100")
    );
    expect(await usdc.balanceOf(bob.address)).above(
      ethers.utils.parseUnits("100")
    );

    await dai.approve(positionsManagerAddress, ethers.constants.MaxUint256);
    await usdc.approve(positionsManagerAddress, ethers.constants.MaxUint256);

    expect(await dai.allowance(alice.address, positionsManagerAddress)).equal(
      ethers.constants.MaxUint256
    );
    expect(await usdc.allowance(alice.address, positionsManagerAddress)).equal(
      ethers.constants.MaxUint256
    );
  });

  // use this token id to remove liquidity
  let tokenId = 0;
  it("Should add liquidity to uniswap", async function () {
    const [alice, bob] = await ethers.getSigners();

    const nonFungablePositionManager = await ethers.getContractAt(
      "INonfungiblePositionManager",
      positionsManagerAddress,
      alice
    );

    const token0 = daiAddress;
    const token1 = usdcAddress;
    const fee = "3000";
    const tickLower = "-60";
    const tickUpper = "60";
    const amount0Desired = "9999999999999999";
    const amount1Desired = "9999999999999999";
    const amount0Min = "0";
    const amount1Min = "0";
    const recipient = alice.getAddress();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 1000;

    const tx = await nonFungablePositionManager.mint({
      token0,
      token1,
      fee,
      tickLower,
      tickUpper,
      amount0Desired,
      amount1Desired,
      amount0Min,
      amount1Min,
      recipient,
      deadline,
    });

    const reciept = await tx.wait();

    // search for event in transaction
    const event = reciept.logs.find((e) => e.data === "0x");
    tokenId = parseInt(event.topics[3]);

    expect(tokenId).above(0);
  });

  it("Should remove the liquidity position from uniswap", async function () {
    const Panic = await ethers.getContractFactory("Panic");
    const panic = await Panic.deploy();
    await panic.deployed();

    const [alice, bob] = await ethers.getSigners();

    const dai = await ethers.getContractAt(erc20Abi, daiAddress, alice);
    const usdc = await ethers.getContractAt(erc20Abi, usdcAddress, alice);

    const daiBefore = await dai.balanceOf(alice.address);
    const usdcBefore = await usdc.balanceOf(alice.address);

    const nonFungablePositionManager = await ethers.getContractAt(
      "INonfungiblePositionManager",
      positionsManagerAddress,
      alice
    );

    expect(await nonFungablePositionManager.ownerOf(tokenId)).equal(
      alice.address
    );

    const position = await nonFungablePositionManager.positions(tokenId);
    await nonFungablePositionManager.approve(panic.address, tokenId);

    const tx = await panic.removeUniswapV3Liquidity(
      positionsManagerAddress,
      tokenId,
      daiAddress,
      usdcAddress,
      position[7]
    );

    const daiAfter = await dai.balanceOf(alice.address);
    const usdcAfter = await usdc.balanceOf(alice.address);

    expect(daiAfter).above(daiBefore);
    expect(usdcAfter).above(usdcBefore);
  });
});
