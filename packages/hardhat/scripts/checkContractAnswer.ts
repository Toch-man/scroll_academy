import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x6E0af415e9c535311970b304F7FB78fA4C9728a6";
  const academy = await ethers.getContractAt("ScrollAcademy", contractAddress);

  console.log("Fixing hash mismatch...");

  // Calculate hash EXACTLY as contract does
  const correctAnswers = [2, 1, 0, 3];
  const correctHash = ethers.keccak256(ethers.solidityPacked(["uint256[]"], [correctAnswers]));

  console.log("Correct answers:", correctAnswers);
  console.log("Correct hash (abi.encodePacked):", correctHash);

  // Update contract
  await academy.updateModuleAnswers(1, correctHash);

  console.log("✅ Contract fixed!");
  console.log("\nNow test the quiz with answers [2, 1, 0, 3]");
}

main().catch(console.error);
