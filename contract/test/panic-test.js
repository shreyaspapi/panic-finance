const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");

describe("Transfer All Assets", function () {
  const daiAddress = "0x88271d333C72e51516B67f5567c728E702b3eeE8";
  const usdcAddress = "0xc94dd466416A7dFE166aB2cF916D3875C049EBB7";

  it("Should transfer all erc20 assets", async function () {
    const [alice, bob] = await ethers.getSigners();
    const Panic = await ethers.getContractFactory("Panic");
    const panic = await Panic.deploy();
    await panic.deployed();

    const erc20Abi = JSON.parse(fs.readFileSync("./test/abi/erc20.json"));

    const dai = await ethers.getContractAt(erc20Abi, daiAddress, alice);
    await dai.mint(alice.address, ethers.utils.parseEther("1000"));

    const usdc = await ethers.getContractAt(erc20Abi, usdcAddress, alice);
    await usdc.mint(alice.address, ethers.utils.parseUnits("1000"));

    expect(await dai.balanceOf(alice.address)).above(
      ethers.utils.parseEther("100")
    );
    expect(await usdc.balanceOf(alice.address)).above(
      ethers.utils.parseUnits("100")
    );

    await dai.approve(panic.address, ethers.constants.MaxUint256);
    await usdc.approve(panic.address, ethers.constants.MaxUint256);

    await panic.assetsTransfer(bob.address, [daiAddress, usdcAddress], []);

    expect(await dai.balanceOf(alice.address)).equal(0);
    expect(await usdc.balanceOf(alice.address)).equal(0);

    expect(await dai.balanceOf(bob.address)).above(
      ethers.utils.parseEther("100")
    );
    expect(await usdc.balanceOf(bob.address)).above(
      ethers.utils.parseUnits("100")
    );
  });

  it("Should error transfer amount exceeds allowance", async function () {
    const [alice, bob] = await ethers.getSigners();
    const Panic = await ethers.getContractFactory("Panic");
    const panic = await Panic.deploy();
    await panic.deployed();

    const erc20Abi = JSON.parse(fs.readFileSync("./test/abi/erc20.json"));

    const dai = await ethers.getContractAt(erc20Abi, daiAddress, alice);
    await dai.mint(alice.address, ethers.utils.parseEther("1000"));

    const usdc = await ethers.getContractAt(erc20Abi, usdcAddress, alice);
    await usdc.mint(alice.address, ethers.utils.parseUnits("1000"));

    expect(await dai.balanceOf(alice.address)).above(
      ethers.utils.parseEther("100")
    );
    expect(await usdc.balanceOf(alice.address)).above(
      ethers.utils.parseUnits("100")
    );

    // test for error: ERC20: transfer amount exceeds allowance'

    await expect(
      panic.assetsTransfer(bob.address, [daiAddress, usdcAddress], [])
    ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
  });

  it('Calculates impermanent loss correctly', async () => {

    const [alice, bob] = await ethers.getSigners();
    const Panic = await ethers.getContractFactory("Panic");
    const panic = await Panic.deploy();
    await panic.deployed();

    const params = {
      p1Initial: 1,
      p2Initial: 1300,
      p1Current: 1,
      p2Current: 1600,
    };

    const result = await panic.calculateImpermanentLoss(params);
    expect(result).to.equal("23");
  });


});
