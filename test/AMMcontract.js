const { expect } = require("chai");

describe("AmmContract", () => {
  let tokenA;
  let tokenB;
  let AMMContract;
  let ammContract;
  const AmountApprove = ethers.utils.parseEther("100000000");

  before(async () => {
    let token = await ethers.getContractFactory("Token");
    tokenA = await token.deploy("tokenA", "A");
    tokenB = await token.deploy("tokenB", "B");
    await tokenA.deployed();
    await tokenB.deployed();
    AMMContract = await ethers.getContractFactory("AMMcontract");
    ammContract = await AMMContract.deploy(tokenA.address, tokenB.address);
    await ammContract.deployed();
    await tokenA.approve(ammContract.address, AmountApprove);
    await tokenB.approve(ammContract.address, AmountApprove);
  });
  it("should give address contract deployment", () => {
    console.log(ammContract.address);
  });
  it("should give the correct quote value", async () => {
    const AmountA = ethers.utils.parseEther("10");
    const balanceA = ethers.utils.parseEther("2");
    const balanceB = ethers.utils.parseEther("400");
    let amountB = await ammContract.quote(AmountA, balanceA, balanceB);
    const etherValue = ethers.utils.formatEther(amountB);
    expect(etherValue).to.equal("2000.0");
  });
  it("should add liquidity to pool firstTime", async () => {
    const amountADesired = ethers.utils.parseEther("1");
    const amountBDesired = ethers.utils.parseEther("200");

    const [reserveABefore, reserveBBefore] = await ammContract.getReserves();

    await ammContract.addLiquidity(amountADesired, amountBDesired);

    const [reserveAAfter, reserveBAfter] = await ammContract.getReserves();

    expect(reserveAAfter).to.equal(reserveABefore.add(amountADesired));
    expect(reserveBAfter).to.equal(reserveBBefore.add(amountBDesired));
  });
  it("should swap tokens using tokenToTokenSwap", async () => {
    const [reserveABefore, reserveBBefore] = await ammContract.getReserves();

    const inputAmount = ethers.utils.parseEther("1");
    let result = await ammContract.tokenToTokenSwap(
      tokenA.address,
      tokenB.address,
      inputAmount
    );
    const [reserveAAfter, reserveBAfter] = await ammContract.getReserves();
  });
});
