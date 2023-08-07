const { ethers } = require("hardhat");
require("dotenv").config(); 


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const AmmContract = await ethers.getContractFactory("AMMcontract"); 

  const tokenA = await Token.deploy("TokenA", "A", {
    gasPrice: ethers.utils.parseUnits("200", "gwei"), 
  });
  const tokenB = await Token.deploy("TokenB", "B", {
    gasPrice: ethers.utils.parseUnits("200", "gwei"), 
  });

  await tokenA.deployed();
  await tokenB.deployed();
  const Amm_Contract = await AmmContract.deploy(tokenA.address, tokenB.address);
  await Amm_Contract.deployed();
  await tokenA.approve(Amm_Contract.address, ethers.utils.parseUnits("200", "gwei"));
  await tokenB.approve(Amm_Contract.address, ethers.utils.parseUnits("200", "gwei"));

  console.log(Amm_Contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
