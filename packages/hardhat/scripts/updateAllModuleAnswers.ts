import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying with account:", deployer.address);

  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");

  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ INSUFFICIENT FUNDS! Get test ETH from: https://scroll.io/faucet");
    return;
  }

  // DEPLOY
  console.log("\n📦 Deploying ScrollAcademy...");
  const ScrollAcademy = await ethers.getContractFactory("ScrollAcademy");
  const academy = await ScrollAcademy.deploy("https://scroll-academy.com/api/tokens/");
  await academy.waitForDeployment();

  const address = await academy.getAddress();
  console.log("✅ Contract deployed:", address);

  // ADD MODULES - FIXED WITH 0-INDEXED ANSWERS
  console.log("\n📚 Adding 7 modules...");

  const modules = [
    {
      title: "Blockchain & Decentralization",
      description: "Understanding the fundamentals of blockchain technology and decentralization",
      answers: [2, 1, 0, 3], // ✅ FIXED: 0-indexed
    },
    {
      title: "Layer 2 Solutions",
      description: "Exploring Layer 2 scaling solutions for Ethereum",
      answers: [1, 2, 0, 1], // ✅ FIXED: 0-indexed
    },
    {
      title: "What are ZK Rollups",
      description: "Deep dive into Zero-Knowledge Rollup technology",
      answers: [0, 1, 2, 0], // ✅ FIXED: 0-indexed
    },
    {
      title: "Scroll & Why Scroll",
      description: "Discover what makes Scroll unique in the L2 ecosystem",
      answers: [2, 1, 1, 2], // ✅ FIXED: 0-indexed
    },
    {
      title: "How to Create a Wallet",
      description: "Step-by-step guide to creating your first crypto wallet",
      answers: [1, 0, 2, 1], // ✅ FIXED: 0-indexed
    },
    {
      title: "How to Bridge",
      description: "Learn to bridge assets between Ethereum and Scroll",
      answers: [0, 2, 1, 0], // ✅ FIXED: 0-indexed
    },
    {
      title: "How to Deploy to Scroll Network",
      description: "Deploy your first smart contract on Scroll",
      answers: [1, 1, 0, 2], // ✅ FIXED: 0-indexed
    },
  ];

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];

    // Calculate hash
    const hash = ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["uint256[]"], [module.answers]));

    console.log(`\n➕ Module ${i + 1}: ${module.title}`);
    console.log(`   Answers: [${module.answers.join(", ")}]`);
    console.log(`   Hash: ${hash.slice(0, 20)}...`);

    try {
      const tx = await academy.addModule(module.title, module.description, hash);
      await tx.wait();
      console.log("   ✅ Added successfully!");
    } catch (error: any) {
      console.error("   ❌ Failed:", error.message);
    }
  }

  console.log("\n🎉 DEPLOYMENT COMPLETE!");
  console.log("====================================");
  console.log("📝 Contract Address:", address);
  console.log("🔗 Network: Scroll Sepolia");
  console.log("👤 Deployer:", deployer.address);
  console.log("====================================");

  console.log("\n📋 TEST THE QUIZ (0-INDEXED):");
  console.log("Module 1: Select options at index [2, 1, 0, 3]");
  console.log("Module 2: Select options at index [1, 2, 0, 1]");
  console.log("Module 3: Select options at index [0, 1, 2, 0]");
  console.log("Module 4: Select options at index [2, 1, 1, 2]");
  console.log("Module 5: Select options at index [1, 0, 2, 1]");
  console.log("Module 6: Select options at index [0, 2, 1, 0]");
  console.log("Module 7: Select options at index [1, 1, 0, 2]");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
