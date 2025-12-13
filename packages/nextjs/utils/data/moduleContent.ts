export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-based)
}

export interface Module {
  id: number;
  title: string;
  emoji: string;
  description: string;
  content: string;
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: 1,
    title: "Blockchain & Decentralization",
    emoji: "🔗",
    description: "Understanding the fundamentals of blockchain technology and decentralization",
    content: `
# Blockchain & Decentralization

## What is a Blockchain?

A blockchain is a distributed, immutable ledger that records transactions across a network of computers. Think of it as a digital ledger that everyone can see, but no one can tamper with.

**Key Properties:**
- **Decentralized**: No single entity controls the network
- **Transparent**: All transactions are visible to everyone
- **Immutable**: Once recorded, data cannot be altered
- **Secure**: Cryptographic techniques protect the data

## How Does it Work?

Transactions are grouped into blocks, and each block is cryptographically linked to the previous one, forming a "chain." This creates an auditable history that's nearly impossible to forge.

**The Process:**
1. A transaction is initiated
2. The transaction is broadcast to all nodes
3. Nodes validate the transaction
4. Valid transactions are added to a block
5. The block is added to the chain
6. The transaction is complete

## Why Decentralization Matters

Traditional systems rely on central authorities (banks, governments, corporations). Decentralization removes these middlemen:

- **No single point of failure**: The network continues even if some nodes go down
- **Censorship resistance**: No authority can block transactions
- **Trustless**: You don't need to trust any intermediary
- **Permissionless**: Anyone can participate without approval

## Real-World Applications

Beyond cryptocurrency, blockchain enables:
- Smart contracts (self-executing agreements)
- Supply chain tracking
- Digital identity verification
- Decentralized finance (DeFi)
- NFTs and digital ownership

Blockchain technology is transforming how we think about trust, ownership, and value transfer in the digital age.
    `,
    quiz: [
      {
        question: "What makes blockchain data immutable?",
        options: [
          "It's stored on multiple servers",
          "It's encrypted with passwords",
          "Each block is cryptographically linked to the previous block",
          "Only administrators can modify it",
        ],
        correctAnswer: 2,
      },
      {
        question: "What does 'trustless' mean in blockchain context?",
        options: [
          "No one can be trusted on the network",
          "You don't need to trust intermediaries to transact",
          "The system is untrustworthy",
          "Only verified users are trusted",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which is NOT a benefit of decentralization?",
        options: [
          "Faster transaction processing than any centralized system",
          "No single point of failure",
          "Censorship resistance",
          "Permissionless participation",
        ],
        correctAnswer: 0,
      },
      {
        question: "What happens when a transaction is validated?",
        options: [
          "It's immediately sent to your wallet",
          "It's stored in a database",
          "It's deleted from the network",
          "It's added to a block on the blockchain",
        ],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 2,
    title: "Layer 2 Solutions",
    emoji: "⚡",
    description: "Exploring Layer 2 scaling solutions for Ethereum",
    content: `
# Layer 2 Solutions

## The Scaling Challenge

Ethereum processes about 15-30 transactions per second (TPS). During high demand, this leads to:
- **High gas fees**: Simple transactions can cost $50-$200+
- **Slow confirmations**: Transactions take minutes to finalize
- **Limited throughput**: The network becomes congested

Layer 2 solutions solve these problems without compromising security.

## What is Layer 2?

Layer 2 (L2) refers to protocols built on top of Ethereum (Layer 1) that handle transactions off-chain while inheriting Ethereum's security guarantees.

**Think of it like this:**
- **Layer 1 (Ethereum)**: The main highway (secure but congested)
- **Layer 2**: Express lanes built above the highway (fast and cheap, still connected to the main road)

## How L2s Work

Instead of processing every transaction on Ethereum mainnet:
1. Transactions happen on the L2 network (fast & cheap)
2. Many transactions are bundled together
3. A summary or proof is posted to Ethereum L1
4. Ethereum validates and secures the batch

This means you get:
- **100-1000x lower fees**
- **Near-instant confirmations**
- **Same security as Ethereum**

## Types of Layer 2s

**Optimistic Rollups:**
- Assume transactions are valid by default
- Use fraud proofs if someone challenges
- Examples: Optimism, Arbitrum

**ZK-Rollups:**
- Use zero-knowledge proofs to verify transactions
- Mathematically guaranteed correctness
- Examples: Scroll, zkSync, Polygon zkEVM

**State Channels:**
- Direct peer-to-peer transactions off-chain
- Example: Lightning Network (Bitcoin)

**Sidechains:**
- Independent chains with their own consensus
- Example: Polygon PoS

## Why Layer 2 Matters

L2 solutions enable:
- **Mass adoption**: Lower costs make blockchain accessible
- **Better UX**: Fast transactions feel like Web2
- **More use cases**: Gaming, social, micropayments become viable
- **Ethereum scaling**: Preserves decentralization while increasing capacity

The future is multi-chain, and Layer 2s are the bridge between Ethereum's security and mainstream usability.
    `,
    quiz: [
      {
        question: "What is the main problem Layer 2 solutions address?",
        options: [
          "Ethereum's lack of smart contracts",
          "Ethereum's limited throughput and high fees",
          "Ethereum's security vulnerabilities",
          "Ethereum's centralization",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do Layer 2s maintain security?",
        options: [
          "They have their own validators",
          "They use centralized servers",
          "They inherit security from Ethereum Layer 1",
          "They don't need security",
        ],
        correctAnswer: 2,
      },
      {
        question: "What does a Layer 2 post to Ethereum mainnet?",
        options: [
          "A summary or proof of batched transactions",
          "Every single transaction individually",
          "User passwords and private keys",
          "Nothing at all",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which is a benefit of Layer 2 solutions?",
        options: [
          "They replace Ethereum entirely",
          "100-1000x lower transaction fees",
          "They remove the need for wallets",
          "They make smart contracts obsolete",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "What are ZK Rollups",
    emoji: "🔐",
    description: "Deep dive into Zero-Knowledge Rollup technology",
    content: `
# What are ZK Rollups?

## Zero-Knowledge Proofs: The Magic Behind ZK Rollups

Imagine you want to prove you know a secret password without revealing it. That's what zero-knowledge proofs do!

**A Zero-Knowledge Proof allows you to prove something is true without revealing WHY it's true.**

## How ZK Rollups Work

ZK Rollups execute transactions off-chain and use cryptographic proofs to verify their validity on-chain.

**The Process:**
1. Thousands of transactions happen on the L2 (off-chain)
2. A "sequencer" batches these transactions
3. A ZK proof is generated proving all transactions are valid
4. The proof + compressed data is posted to Ethereum
5. Ethereum verifies the proof (takes milliseconds)
6. Transactions are finalized with full L1 security

## ZK Rollups vs Optimistic Rollups

**ZK Rollups:**
- ✅ Instant finality (no waiting period)
- ✅ Validity proofs (mathematically guaranteed correct)
- ✅ Higher security
- ❌ More complex technology
- ❌ Harder to make EVM-compatible

**Optimistic Rollups:**
- ✅ Easier to build
- ✅ Better EVM compatibility (initially)
- ❌ 7-day withdrawal period
- ❌ Rely on fraud proofs (assume validity)

## Types of ZK Proofs

**zk-SNARKs** (Succinct Non-interactive Arguments of Knowledge):
- Small proof size
- Fast verification
- Used by Scroll

**zk-STARKs** (Scalable Transparent Arguments of Knowledge):
- No trusted setup needed
- Larger proof size
- Quantum-resistant

## Why ZK Rollups are Game-Changing

**For Users:**
- Near-instant withdrawals (no 7-day waiting)
- Maximum security
- Extremely low fees

**For Developers:**
- Build the same way as on Ethereum
- Access to Ethereum's liquidity
- Inherit Ethereum's network effects

**For Ethereum:**
- Massive scalability (10,000+ TPS possible)
- Maintains decentralization
- Reduces L1 congestion

## Real-World Use Cases

ZK Rollups enable:
- High-frequency DeFi trading
- On-chain gaming (thousands of actions/second)
- Privacy-preserving transactions
- Enterprise blockchain applications
- Mass market dApps

ZK Rollups represent the cutting edge of blockchain scaling - combining mathematical certainty with practical scalability.
    `,
    quiz: [
      {
        question: "What does a zero-knowledge proof allow you to do?",
        options: [
          "Prove something is true without revealing the underlying information",
          "Hide all your transactions from everyone",
          "Bypass Ethereum's security",
          "Mine cryptocurrency faster",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is the main advantage of ZK Rollups over Optimistic Rollups?",
        options: [
          "They're cheaper to use",
          "Instant finality with validity proofs",
          "They don't require Ethereum",
          "They're easier to build",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does a ZK Rollup post to Ethereum?",
        options: [
          "Individual user addresses",
          "Private keys",
          "A cryptographic proof and compressed transaction data",
          "Full transaction details for every user",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which technology does Scroll use?",
        options: ["zk-SNARKs", "Plasma chains", "State channels", "Sidechains"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 4,
    title: "Scroll & Why Scroll",
    emoji: "📜",
    description: "Discover what makes Scroll unique in the L2 ecosystem",
    content: `
# Scroll & Why Scroll

## What is Scroll?

Scroll is a ZK Rollup Layer 2 solution for Ethereum that focuses on being **bytecode-level compatible** with the Ethereum Virtual Machine (EVM).

**In simple terms:** Scroll lets you use Ethereum apps and tools exactly as they are, but with:
- 100x lower fees
- Near-instant confirmations
- Full Ethereum security

## Why Scroll Exists

While other L2s compromise on compatibility or decentralization, Scroll aims to:
1. Maintain complete EVM equivalence
2. Keep the network decentralized
3. Provide ZK Rollup benefits

**The Vision:** Make Ethereum accessible to billions without sacrificing its core values.

## What Makes Scroll Unique?

### 1. EVM Equivalence
- Deploy contracts from Ethereum with ZERO changes
- All Ethereum tools work out of the box (Hardhat, Foundry, Remix)
- No need to learn new programming languages
- Existing dApps can migrate seamlessly

### 2. zkEVM Technology
Scroll built a ZK proof system for the EVM itself:
- Proves the correctness of EVM bytecode execution
- Generates validity proofs for transaction batches
- Extremely complex engineering feat

### 3. Decentralized Proving Network
Unlike some L2s with centralized sequencers, Scroll is building:
- Decentralized provers (anyone can participate)
- Decentralized sequencers (coming soon)
- Censorship resistance

### 4. Open Source & Community-Driven
- Fully open-source codebase
- Transparent development
- Community governance roadmap

## Scroll vs Other L2s

**Scroll vs Optimism/Arbitrum:**
- ✅ ZK proofs (instant finality)
- ✅ No 7-day withdrawal period
- ✅ Stronger security guarantees

**Scroll vs zkSync/Polygon zkEVM:**
- ✅ Better EVM equivalence
- ✅ More mature ecosystem
- ✅ Focus on decentralization

## The Scroll Ecosystem

**DeFi:**
- DEXs (Uniswap, SyncSwap)
- Lending protocols (Aave)
- Stablecoins (USDC, USDT)

**NFTs & Gaming:**
- NFT marketplaces
- On-chain games
- Generative art

**Infrastructure:**
- Oracles (Chainlink)
- Bridges (native + third-party)
- Wallets (MetaMask, Rabby)

## Why Build on Scroll?

**For Developers:**
- Same dev experience as Ethereum
- Lower costs for your users
- Access to Ethereum's ecosystem
- Growing community and support

**For Users:**
- Tiny transaction fees (pennies)
- Fast confirmations (2-3 seconds)
- Same security as Ethereum
- Use familiar wallets and tools

## The Future of Scroll

Scroll is working towards:
- Further decentralization
- Even lower fees through optimization
- Greater throughput
- Enhanced privacy features
- Cross-L2 communication

Scroll isn't just another L2 - it's a commitment to scaling Ethereum the right way: secure, decentralized, and accessible to all.
    `,
    quiz: [
      {
        question: "What type of Layer 2 solution is Scroll?",
        options: ["Optimistic Rollup", "State Channel", "ZK Rollup", "Sidechain"],
        correctAnswer: 2,
      },
      {
        question: "What does 'EVM equivalence' mean?",
        options: [
          "Scroll uses a different programming language",
          "Ethereum contracts work on Scroll with zero changes",
          "Scroll is faster than Ethereum",
          "Scroll replaces Ethereum",
        ],
        correctAnswer: 1,
      },
      {
        question: "How long is the withdrawal period on Scroll?",
        options: ["7 days", "Instant (no waiting period)", "24 hours", "1 month"],
        correctAnswer: 1,
      },
      {
        question: "What is unique about Scroll's approach?",
        options: [
          "It's the only Layer 2",
          "It focuses on both decentralization and EVM equivalence",
          "It's cheaper than all other chains",
          "It doesn't use Ethereum",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    title: "How to Create a Wallet",
    emoji: "👛",
    description: "Step-by-step guide to creating your first crypto wallet",
    content: `
# How to Create a Wallet

## What is a Crypto Wallet?

A crypto wallet is your gateway to blockchain. It's not a physical wallet - it's a tool that stores your private keys and lets you interact with blockchain networks.

**Key Concepts:**
- **Private Key**: Secret code that proves ownership (NEVER share this!)
- **Public Key**: Your blockchain address (safe to share)
- **Seed Phrase**: 12-24 words that can recover your wallet

Think of it like email:
- Public address = email address (sharable)
- Private key = password (secret)

## Types of Wallets

### Hot Wallets (Software)
Connected to the internet:
- **Browser Extensions**: MetaMask, Rabby, Coinbase Wallet
- **Mobile Apps**: Trust Wallet, Rainbow, MetaMask Mobile
- **Desktop Apps**: Exodus, Atomic Wallet

**Pros:** Convenient, easy to use
**Cons:** More vulnerable to hacks

### Cold Wallets (Hardware)
Offline storage:
- Ledger
- Trezor

**Pros:** Maximum security
**Cons:** Cost money, less convenient

## Creating Your First Wallet (MetaMask)

MetaMask is the most popular Ethereum wallet. Here's how to set it up:

### Step 1: Install MetaMask
1. Go to metamask.io
2. Click "Download"
3. Add the browser extension (Chrome, Firefox, Brave)
4. Click "Create a new wallet"

### Step 2: Create a Password
- Choose a strong password
- This password encrypts your wallet locally
- You'll need it every time you open MetaMask

### Step 3: Save Your Seed Phrase
**THIS IS THE MOST IMPORTANT STEP!**

You'll receive 12 words - this is your seed phrase.

**Critical Rules:**
- ✅ Write it down on paper
- ✅ Store it in a safe place (fireproof safe, safety deposit box)
- ✅ Never store it digitally (no screenshots, no cloud storage)
- ❌ Never share it with anyone
- ❌ MetaMask support will NEVER ask for it

**Why it matters:** Anyone with your seed phrase can access your funds forever. If you lose it, your crypto is gone permanently.

### Step 4: Confirm Your Seed Phrase
- MetaMask will ask you to select words in order
- This ensures you saved it correctly

### Step 5: You're Done!
Your wallet is ready. You'll see:
- Your wallet address (0x...)
- Your balance (starts at 0)
- Options to buy, send, or receive crypto

## Adding Scroll Network to MetaMask

To use Scroll, add the network:

1. Open MetaMask
2. Click the network dropdown (top left)
3. Click "Add Network"
4. Enter Scroll's details:
   - **Network Name**: Scroll
   - **RPC URL**: https://rpc.scroll.io
   - **Chain ID**: 534352
   - **Currency Symbol**: ETH
   - **Block Explorer**: https://scrollscan.com

5. Click "Save"
6. Switch to Scroll network

## Security Best Practices

**Do:**
- Use a hardware wallet for large amounts
- Enable 2FA on exchanges
- Double-check addresses before sending
- Keep software updated
- Use official websites only

**Don't:**
- Share your seed phrase/private key
- Click suspicious links
- Connect to untrusted dApps
- Keep large amounts on exchanges
- Use public WiFi for transactions

## Common Mistakes to Avoid

1. **Not backing up seed phrase**: Write it down!
2. **Sending to wrong network**: Check the network before sending
3. **Falling for scams**: No one will give you free crypto
4. **Ignoring gas fees**: Always keep some ETH for fees
5. **Using weak passwords**: Use strong, unique passwords

## What's Next?

Now that you have a wallet:
1. Get some ETH (buy on an exchange or use a faucet for testnets)
2. Bridge to Scroll (next module!)
3. Start exploring dApps
4. Join the community

Remember: In crypto, you are your own bank. With great power comes great responsibility!
    `,
    quiz: [
      {
        question: "What should you NEVER do with your seed phrase?",
        options: [
          "Write it on paper",
          "Share it with anyone or store it digitally",
          "Keep it in a safe place",
          "Verify it during setup",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a private key?",
        options: [
          "A secret code that proves ownership of your wallet",
          "Your public wallet address",
          "The name of your wallet",
          "A password for MetaMask",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which type of wallet is most secure for large amounts?",
        options: ["Browser extension", "Mobile app", "Hardware wallet (cold storage)", "Email account"],
        correctAnswer: 2,
      },
      {
        question: "What is the Chain ID for Scroll network?",
        options: ["1", "534352", "137", "8453"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 6,
    title: "How to Bridge",
    emoji: "🌉",
    description: "Learn to bridge assets between Ethereum and Scroll",
    content: `
# How to Bridge

## What is Bridging?

Bridging is the process of moving crypto assets from one blockchain to another. Think of it as exchanging dollars for euros - same value, different "country."

When you bridge from Ethereum to Scroll:
- Your ETH on Ethereum is locked
- Equivalent ETH is minted on Scroll
- You can now use it on Scroll for cheap transactions

## Why Bridge to Scroll?

**Benefits of using Scroll:**
- 💰 Pay pennies instead of $50+ for transactions
- ⚡ Near-instant confirmations (2-3 seconds)
- 🔒 Same security as Ethereum
- 🛠️ Access to all Scroll dApps and DeFi

## Types of Bridges

### Native Bridges (Official)
- Built by the L2 team
- Highest security
- Longer withdrawal times
- Example: Scroll's official bridge

### Third-Party Bridges
- Built by external teams
- Faster (sometimes)
- Additional trust assumptions
- Examples: Orbiter, Owlto

**For beginners: Use the official Scroll bridge!**

## How to Bridge: Step-by-Step

### Prerequisites
- MetaMask wallet installed
- Some ETH on Ethereum mainnet
- Scroll network added to MetaMask

### Bridging ETH to Scroll

**Step 1: Go to the Official Bridge**
- Visit: scroll.io/bridge
- Connect your MetaMask wallet

**Step 2: Select Networks**
- From: Ethereum Mainnet
- To: Scroll
- (Should be pre-selected)

**Step 3: Enter Amount**
- Input how much ETH to bridge
- Leave ~0.01 ETH on mainnet for future gas fees
- Check the estimated gas cost

**Step 4: Approve Transaction**
- Click "Send"
- Review the details in MetaMask
- Confirm the transaction
- Wait for confirmation (~15 seconds on Ethereum)

**Step 5: Wait for Finalization**
- Deposit usually takes 10-15 minutes
- Your ETH will appear in your wallet on Scroll
- You'll receive the same amount (minus gas fees)

### Bridging Tokens (USDC, USDT, etc.)

The process is similar, but you'll need to:
1. Approve the token first (one-time transaction)
2. Bridge the token (second transaction)
3. Wait for finalization

## Bridging Back to Ethereum (Withdrawals)

**Important:** Withdrawing from Scroll to Ethereum takes longer!

**The Process:**
1. Go to scroll.io/bridge
2. Select: From Scroll → To Ethereum
3. Enter amount and confirm
4. Wait ~4 hours for finalization
5. Claim your funds on Ethereum

**Why does it take longer?**
ZK proofs need to be generated and verified on Ethereum mainnet. This ensures maximum security.

## Bridge Costs

**Deposit (Ethereum → Scroll):**
- Gas on Ethereum: ~$5-$20 (varies with network congestion)
- No fees on Scroll side

**Withdrawal (Scroll → Ethereum):**
- Small fee on Scroll: ~$0.10
- Gas on Ethereum for claiming: ~$5-$15

## Safety Tips

**Before Bridging:**
- ✅ Double-check the website URL
- ✅ Verify it's the official Scroll bridge
- ✅ Start with a small test amount
- ✅ Ensure you have gas fees on both sides

**Red Flags (Scams):**
- ❌ Websites asking for your seed phrase
- ❌ "Too good to be true" token swaps
- ❌ Unverified bridge contracts
- ❌ Direct messages offering bridge help

## Alternative: Using Exchanges

Some centralized exchanges support direct Scroll withdrawals:
- Check if your exchange (Binance, OKX, etc.) offers Scroll network
- Withdraw directly to Scroll (no bridge needed)
- Usually cheaper and faster

## Common Issues & Solutions

**Issue: Transaction pending for hours**
- Solution: Check Etherscan for status. If stuck, try speeding up with higher gas.

**Issue: Funds not showing on Scroll**
- Solution: Wait 15-20 minutes. Add Scroll network to MetaMask if not visible.

**Issue: Bridge says "insufficient balance"**
- Solution: Leave some ETH for gas fees on the source chain.

**Issue: High gas fees**
- Solution: Bridge during off-peak hours (weekends, late night UTC).

## Best Practices

1. **Bridge in larger amounts** - Fees are fixed, so bridging $100 vs $1000 costs the same
2. **Bridge during low gas** - Use tools like ethgasstation.info to find optimal times
3. **Keep some ETH on both chains** - For gas fees
4. **Bookmark official sites** - Avoid phishing
5. **Use native bridge first** - Safest option for beginners

## What to Do After Bridging

Once your funds are on Scroll:
1. Explore dApps (DeFi, NFTs, games)
2. Swap tokens on DEXs (Uniswap, SyncSwap)
3. Provide liquidity and earn yield
4. Deploy smart contracts (next module!)
5. Join the Scroll community

Congratulations! You're now ready to experience Ethereum's power at Layer 2 speeds. Welcome to Scroll! 🎉
    `,
    quiz: [
      {
        question: "What happens to your ETH when you bridge from Ethereum to Scroll?",
        options: [
          "It's locked on Ethereum and equivalent ETH is minted on Scroll",
          "It's destroyed on Ethereum",
          "It's converted to a different cryptocurrency",
          "It's sent to Scroll's bank account",
        ],
        correctAnswer: 0,
      },
      {
        question: "How long does it typically take to bridge FROM Scroll TO Ethereum?",
        options: ["Instant", "10-15 minutes", "~4 hours", "7 days"],
        correctAnswer: 2,
      },
      {
        question: "What should you always verify before using a bridge?",
        options: [
          "The weather forecast",
          "The official website URL to avoid scams",
          "Your friend's approval",
          "The current Bitcoin price",
        ],
        correctAnswer: 1,
      },
      {
        question: "Why should you leave some ETH on Ethereum mainnet after bridging?",
        options: [
          "For future gas fees on Ethereum transactions",
          "It's required by law",
          "MetaMask charges a monthly fee",
          "To keep your wallet active",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 7,
    title: "How to Deploy to Scroll Network",
    emoji: "🚀",
    description: "Deploy your first smart contract on Scroll",
    content: `
# How to Deploy to Scroll Network

## What Does "Deploy" Mean?

Deploying a smart contract means publishing your code to the blockchain so that:
- It has a permanent address
- Anyone can interact with it
- It runs autonomously without central servers

Once deployed, the contract is immutable (can't be changed) and will exist forever.

## Why Deploy to Scroll?

**Compared to Ethereum Mainnet:**
- 💰 100x cheaper deployment costs ($0.50 vs $50+)
- ⚡ Instant deployment (2-3 seconds vs 15+ seconds)
- 🔧 Identical tooling (Hardhat, Foundry, Remix)
- 🔒 Same security guarantees

Perfect for testing and production dApps!

## Prerequisites

Before deploying, ensure you have:
1. ✅ MetaMask with Scroll network added
2. ✅ ETH on Scroll (bridge some if needed)
3. ✅ Basic Solidity knowledge
4. ✅ Development tools installed

## Method 1: Deploy with Remix (Easiest)

**Remix is a browser-based IDE - no installation required!**

### Step 1: Write Your Smart Contract
1. Go to remix.ethereum.org
2. Create a new file: HelloScroll.sol
3. Write a simple contract

### Step 2: Compile the Contract
1. Click "Solidity Compiler" tab (left sidebar)
2. Select compiler version 0.8.20
3. Click "Compile HelloScroll.sol"
4. Wait for green checkmark

### Step 3: Deploy to Scroll
1. Click "Deploy & Run Transactions" tab
2. Change "Environment" to "Injected Provider - MetaMask"
3. MetaMask will popup - select Scroll network
4. Click "Deploy"
5. Confirm the transaction in MetaMask
6. Wait 2-3 seconds

🎉 Contract deployed! You'll see the address and can interact with it.

## Method 2: Deploy with Hardhat (Professional)

Hardhat is the industry-standard framework for serious dApp development.

### Step 1: Setup Hardhat Project
Create your Hardhat project and install dependencies

### Step 2: Configure Hardhat for Scroll
Add Scroll network configuration to your hardhat.config.js

### Step 3: Write Your Contract
Create your smart contract in the contracts folder

### Step 4: Create Deploy Script
Write a deployment script in the scripts folder

### Step 5: Deploy
Run: npx hardhat run scripts/deploy.js --network scroll

## Verifying Your Contract

After deployment, verify your contract on ScrollScan:
1. Go to scrollscan.com
2. Find your contract address
3. Click "Verify and Publish"
4. Enter contract details and source code
5. Submit for verification

Verified contracts show their source code publicly and build trust.

## Best Practices

1. **Test on testnet first** - Always deploy to Scroll Sepolia before mainnet
2. **Use verified libraries** - Only import trusted dependencies
3. **Add comments** - Document your code thoroughly
4. **Consider upgradability** - Use proxy patterns if you need to update logic
5. **Audit your code** - Get professional audits for production contracts

## Common Deployment Issues

**Issue: "Insufficient funds"**
- Solution: Bridge more ETH to Scroll

**Issue: "Nonce too high"**
- Solution: Reset MetaMask account in settings

**Issue: "Gas estimation failed"**
- Solution: Check your contract for errors, try increasing gas limit

**Issue: "Contract verification failed"**
- Solution: Ensure compiler version matches, flatten your contract if using imports

## What's Next?

After deploying your contract:
1. Test all functions thoroughly
2. Verify on ScrollScan for transparency
3. Build a frontend to interact with it
4. Share with the Scroll community
5. Monitor contract activity

Congratulations! You've completed the Scroll Academy. You now have the knowledge to:
- Understand blockchain and Layer 2 technology
- Use ZK Rollups and Scroll confidently
- Create wallets and bridge assets safely
- Deploy smart contracts to Scroll

Welcome to the future of Ethereum scaling! 🎓🚀
    `,
    quiz: [
      {
        question: "What happens when you deploy a smart contract?",
        options: [
          "It gets saved on your computer",
          "It gets published to the blockchain with a permanent address",
          "It gets sent to Ethereum Foundation",
          "It gets deleted after 24 hours",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the main benefit of deploying on Scroll vs Ethereum mainnet?",
        options: [
          "Scroll is more secure",
          "100x cheaper deployment costs",
          "Scroll uses Python instead of Solidity",
          "Contracts run faster on Scroll",
        ],
        correctAnswer: 1,
      },
      {
        question: "What should you ALWAYS do before deploying to mainnet?",
        options: ["Test on testnet first", "Tweet about it", "Buy more ETH", "Delete all your code"],
        correctAnswer: 0,
      },
      {
        question: "Why should you verify your contract on ScrollScan?",
        options: [
          "It's required by law",
          "It costs less gas",
          "It shows source code publicly and builds trust",
          "It makes the contract run faster",
        ],
        correctAnswer: 2,
      },
    ],
  },
];
