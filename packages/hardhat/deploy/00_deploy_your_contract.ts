import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployScrollAcademy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("🚀 Deploying ScrollAcademy contract...");

  // Deploy the contract
  const scrollAcademyDeployment = await deploy("ScrollAcademy", {
    from: deployer,
    args: ["ipfs://YOUR_BASE_URI/"], // Update with your IPFS base URI later
    log: true,
    autoMine: true,
  });

  console.log("✅ Contract deployed at:", scrollAcademyDeployment.address);

  // Get the contract instance using ContractFactory
  const ScrollAcademy = await hre.ethers.getContractFactory("ScrollAcademy");
  const scrollAcademy = ScrollAcademy.attach(scrollAcademyDeployment.address) as any;

  console.log("📚 Setting up modules...");

  // Helper function to hash quiz answers
  const hashAnswers = (answers: number[]) => {
    return hre.ethers.keccak256(hre.ethers.AbiCoder.defaultAbiCoder().encode(["uint256[]"], [answers]));
  };

  // Module 1: Blockchain & Decentralization
  // Correct answers: [2, 1, 0, 3] (0-indexed)
  console.log("Adding Module 1: Blockchain & Decentralization");
  const module1Answers = hashAnswers([2, 1, 0, 3]);
  await scrollAcademy.addModule(
    "Blockchain & Decentralization",
    "Understanding the fundamentals of blockchain technology and decentralization",
    module1Answers,
  );

  // Module 2: Layer 2 Solutions
  // Correct answers: [1, 2, 0, 1] (0-indexed)
  console.log("Adding Module 2: Layer 2 Solutions");
  const module2Answers = hashAnswers([1, 2, 0, 1]);
  await scrollAcademy.addModule(
    "Layer 2 Solutions",
    "Exploring Layer 2 scaling solutions for Ethereum",
    module2Answers,
  );

  // Module 3: What are ZK Rollups
  // Correct answers: [0, 1, 2, 0] (0-indexed)
  console.log("Adding Module 3: What are ZK Rollups");
  const module3Answers = hashAnswers([0, 1, 2, 0]);
  await scrollAcademy.addModule(
    "What are ZK Rollups",
    "Deep dive into Zero-Knowledge Rollup technology",
    module3Answers,
  );

  // Module 4: Scroll & Why Scroll
  // Correct answers: [2, 1, 1, 2] (0-indexed)
  console.log("Adding Module 4: Scroll & Why Scroll");
  const module4Answers = hashAnswers([2, 1, 1, 2]);
  await scrollAcademy.addModule(
    "Scroll & Why Scroll",
    "Discover what makes Scroll unique in the L2 ecosystem",
    module4Answers,
  );

  // Module 5: How to Create a Wallet
  // Correct answers: [1, 0, 2, 1] (0-indexed)
  console.log("Adding Module 5: How to Create a Wallet");
  const module5Answers = hashAnswers([1, 0, 2, 1]);
  await scrollAcademy.addModule(
    "How to Create a Wallet",
    "Step-by-step guide to creating your first crypto wallet",
    module5Answers,
  );

  // Module 6: How to Bridge
  // Correct answers: [0, 2, 1, 0] (0-indexed)
  console.log("Adding Module 6: How to Bridge");
  const module6Answers = hashAnswers([0, 2, 1, 0]);
  await scrollAcademy.addModule("How to Bridge", "Learn to bridge assets between Ethereum and Scroll", module6Answers);

  // Module 7: How to Deploy to Scroll Network
  // Correct answers: [1, 1, 0, 2] (0-indexed)
  console.log("Adding Module 7: How to Deploy to Scroll Network");
  const module7Answers = hashAnswers([1, 1, 0, 2]);
  await scrollAcademy.addModule(
    "How to Deploy to Scroll Network",
    "Deploy your first smart contract on Scroll",
    module7Answers,
  );

  console.log("✅ All 7 modules added successfully!");
  console.log("📝 Contract address:", scrollAcademyDeployment.address);
  console.log("🎓 ScrollAcademy is ready for students!");
};

export default deployScrollAcademy;
deployScrollAcademy.tags = ["ScrollAcademy"];
