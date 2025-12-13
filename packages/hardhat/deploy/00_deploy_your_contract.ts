import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployScrollAcademy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("🚀 Deploying ScrollAcademy contract...");

  // Deploy the contract
  const scrollAcademyDeployment = await deploy("ScrollAcademy", {
    from: deployer,
    args: ["ipfs://YOUR_BASE_URI/"],
    log: true,
    autoMine: true,
  });

  console.log("✅ Contract deployed at:", scrollAcademyDeployment.address);

  // Get the contract instance
  const ScrollAcademy = await hre.ethers.getContractFactory("ScrollAcademy");
  const scrollAcademy = ScrollAcademy.attach(scrollAcademyDeployment.address) as any;

  console.log("📚 Setting up modules...");

  // Module 1: Blockchain & Decentralization
  // Correct answers: [2, 1, 0, 3] (0-indexed)
  console.log("Adding Module 1: Blockchain & Decentralization");
  const tx1 = await scrollAcademy.addModule(
    "Blockchain & Decentralization",
    "Understanding the fundamentals of blockchain technology and decentralization",
    [2, 1, 0, 3], // No hashing! Just the raw answer indices
  );
  await tx1.wait();
  console.log("✅ Module 1 added");

  // Module 2: Layer 2 Solutions
  // Correct answers: [1, 2, 0, 1] (0-indexed)
  console.log("Adding Module 2: Layer 2 Solutions");
  const tx2 = await scrollAcademy.addModule(
    "Layer 2 Solutions",
    "Exploring Layer 2 scaling solutions for Ethereum",
    [1, 2, 0, 1],
  );
  await tx2.wait();
  console.log("✅ Module 2 added");

  // Module 3: What are ZK Rollups
  // Correct answers: [0, 1, 2, 0] (0-indexed)
  console.log("Adding Module 3: What are ZK Rollups");
  const tx3 = await scrollAcademy.addModule(
    "What are ZK Rollups",
    "Deep dive into Zero-Knowledge Rollup technology",
    [0, 1, 2, 0],
  );
  await tx3.wait();
  console.log("✅ Module 3 added");

  // Module 4: Scroll & Why Scroll
  // Correct answers: [2, 1, 1, 1] (0-indexed)
  console.log("Adding Module 4: Scroll & Why Scroll");
  const tx4 = await scrollAcademy.addModule(
    "Scroll & Why Scroll",
    "Discover what makes Scroll unique in the L2 ecosystem",
    [2, 1, 1, 2],
  );
  await tx4.wait();
  console.log("✅ Module 4 added");

  // Module 5: How to Create a Wallet
  // Correct answers: [1, 0, 2, 1] (0-indexed)
  console.log("Adding Module 5: How to Create a Wallet");
  const tx5 = await scrollAcademy.addModule(
    "How to Create a Wallet",
    "Step-by-step guide to creating your first crypto wallet",
    [1, 0, 2, 1],
  );
  await tx5.wait();
  console.log("✅ Module 5 added");

  // Module 6: How to Bridge
  // Correct answers: [0, 2, 1, 0] (0-indexed)
  console.log("Adding Module 6: How to Bridge");
  const tx6 = await scrollAcademy.addModule(
    "How to Bridge",
    "Learn to bridge assets between Ethereum and Scroll",
    [0, 2, 1, 0],
  );
  await tx6.wait();
  console.log("✅ Module 6 added");

  // Module 7: How to Deploy to Scroll Network
  // Correct answers: [1, 1, 0, 2] (0-indexed)
  console.log("Adding Module 7: How to Deploy to Scroll Network");
  const tx7 = await scrollAcademy.addModule(
    "How to Deploy to Scroll Network",
    "Deploy your first smart contract on Scroll",
    [1, 1, 0, 2],
  );
  await tx7.wait();
  console.log("✅ Module 7 added");

  console.log("\n✅ All 7 modules added successfully!");
  console.log("📝 Contract address:", scrollAcademyDeployment.address);
  console.log("🎓 ScrollAcademy is ready for students!");
};

export default deployScrollAcademy;
deployScrollAcademy.tags = ["ScrollAcademy"];
