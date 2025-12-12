"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { AcademicCapIcon, RocketLaunchIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium text-sm">
            <SparklesIcon className="w-4 h-4" />
            Learn. Build. Earn NFT Badge.
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Master{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Scroll</span>{" "}
            in 7 Modules
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Learn about blockchain, Layer 2s, and ZK-Rollups. Complete all modules and earn a unique Grandmaster NFT
            badge.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {connectedAddress ? (
              <Link
                href="/modules"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <RocketLaunchIcon className="w-6 h-6" />
                Start Learning
              </Link>
            ) : (
              <div className="px-8 py-4 bg-gray-200 text-gray-500 rounded-lg font-semibold text-lg flex items-center gap-2 cursor-not-allowed">
                <RocketLaunchIcon className="w-6 h-6" />
                Connect Wallet to Start
              </div>
            )}

            <Link
              href="/badge"
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-purple-500 transition-all duration-300 flex items-center gap-2"
            >
              <AcademicCapIcon className="w-6 h-6" />
              View My Badge
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">7</div>
              <div className="text-gray-600 mt-2">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">28</div>
              <div className="text-gray-600 mt-2">Quiz Questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">1</div>
              <div className="text-gray-600 mt-2">NFT Badge</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What You'll Learn</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain Basics</h3>
              <p className="text-gray-600">
                Understand decentralization, blockchain technology, and why it matters for the future.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Layer 2 Solutions</h3>
              <p className="text-gray-600">Learn how L2s scale Ethereum with lower fees and faster transactions.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ZK-Rollups & Scroll</h3>
              <p className="text-gray-600">Master zero-knowledge proofs and discover what makes Scroll unique.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👛</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wallet Setup</h3>
              <p className="text-gray-600">Create your first crypto wallet and add Scroll network to MetaMask.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bridging Assets</h3>
              <p className="text-gray-600">Learn to safely bridge assets between Ethereum and Scroll.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deploy Contracts</h3>
              <p className="text-gray-600">Deploy your first smart contract on Scroll network like a pro.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Become a Scroll Grandmaster?</h2>
          <p className="text-xl opacity-90">Complete all 7 modules and earn your soulbound NFT badge. Let's go! 🎓</p>
          {connectedAddress ? (
            <Link
              href="/modules"
              className="inline-block px-10 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 mt-4"
            >
              Begin Your Journey →
            </Link>
          ) : (
            <div className="inline-block px-10 py-4 bg-gray-300 text-gray-500 rounded-lg font-bold text-lg cursor-not-allowed mt-4">
              Connect Wallet to Begin
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
