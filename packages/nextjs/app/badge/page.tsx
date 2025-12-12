"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import { useScaffoldReadContract } from "../../hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { AcademicCapIcon, ArrowLeftIcon, CheckBadgeIcon, SparklesIcon, TrophyIcon } from "@heroicons/react/24/solid";

export default function BadgePage() {
  const { address: connectedAddress } = useAccount();
  const [copied, setCopied] = useState(false);

  // Read user progress
  const { data: userProgress } = useScaffoldReadContract({
    contractName: "ScrollAcademy",
    functionName: "getUserProgress",
    args: [connectedAddress],
  });

  const completedModules = userProgress ? Number(userProgress[0]) : 0;
  const totalModules = userProgress ? Number(userProgress[1]) : 7;
  const hasGraduated = userProgress ? userProgress[2] : false;
  const badgeTokenId = userProgress ? Number(userProgress[3]) : 0;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connectedAddress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center space-y-4 max-w-md">
          <TrophyIcon className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Connect Your Wallet</h1>
          <p className="text-base md:text-lg text-gray-600">Connect your wallet to view your Grandmaster badge.</p>
          <Link
            href="/modules"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            Go to Modules
          </Link>
        </div>
      </div>
    );
  }

  if (!hasGraduated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 md:mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-sm md:text-base">Back to Modules</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <TrophyIcon className="w-16 h-16 md:w-24 md:h-24 text-gray-400" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-dashed border-gray-300 rounded-full animate-spin-slow"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Badge Not Yet Earned</h1>
              <p className="text-base md:text-xl text-gray-600 max-w-xl mx-auto">
                Complete all 7 modules to earn your exclusive Scroll Academy Grandmaster NFT badge!
              </p>
            </div>

            {/* Progress */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base md:text-lg font-bold text-gray-900">Your Progress</span>
                <span className="text-2xl md:text-3xl font-bold text-purple-600">
                  {completedModules}/{totalModules}
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3 md:h-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 md:h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(completedModules / totalModules) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-3">
                {totalModules - completedModules} module{totalModules - completedModules !== 1 ? "s" : ""} remaining
              </p>
            </div>

            <Link
              href="/modules"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-base md:text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Continue Learning →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <Link href="/modules" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="text-sm md:text-base">Back to Modules</span>
        </Link>

        {/* Congratulations Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 md:p-8 text-center text-white">
            <SparklesIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl md:text-5xl font-bold mb-2">Congratulations! 🎉</h1>
            <p className="text-base md:text-xl opacity-90">You are now a Scroll Academy Grandmaster</p>
          </div>

          {/* Badge Display */}
          <div className="p-6 md:p-12">
            <div className="relative max-w-md mx-auto mb-8">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-yellow-300 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 border-4 border-orange-300 rounded-full animate-pulse"></div>
              </div>

              {/* Main badge */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-full flex flex-col items-center justify-center">
                  <AcademicCapIcon className="w-16 h-16 md:w-20 md:h-20 text-yellow-600 mb-2" />
                  <span className="text-lg md:text-2xl font-bold text-gray-900">Grandmaster</span>
                  <span className="text-xs md:text-sm text-gray-600">Scroll Academy</span>
                </div>
              </div>

              {/* Floating badges */}
              <CheckBadgeIcon className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-green-500 animate-bounce" />
              <TrophyIcon
                className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 text-yellow-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <SparklesIcon
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-purple-500 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
              <SparklesIcon
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-12 md:h-12 text-blue-500 animate-bounce"
                style={{ animationDelay: "0.6s" }}
              />
            </div>

            {/* Badge Details */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Badge Type</p>
                    <p className="text-base md:text-lg font-bold text-gray-900">Soulbound NFT</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Token ID</p>
                    <p className="text-base md:text-lg font-bold text-gray-900">#{badgeTokenId}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Modules Completed</p>
                    <p className="text-base md:text-lg font-bold text-green-600">
                      {completedModules}/{totalModules} ✓
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-base md:text-lg font-bold text-purple-600">Non-Transferable</p>
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <p className="text-xs md:text-sm text-gray-600 mb-2">Badge Holder</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <code className="flex-1 text-xs md:text-sm font-mono bg-white px-3 py-2 rounded border border-gray-200 break-all">
                    {connectedAddress}
                  </code>
                  <button
                    onClick={() => copyToClipboard(connectedAddress || "")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    {copied ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-700">7/7</div>
                  <div className="text-xs md:text-sm text-blue-600 mt-1">Modules</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-700">28/28</div>
                  <div className="text-xs md:text-sm text-green-600 mt-1">Quiz Questions</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-700">100%</div>
                  <div className="text-xs md:text-sm text-purple-600 mt-1">Complete</div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Share Your Achievement 🎊</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://twitter.com/intent/tweet?text=I%20just%20became%20a%20Scroll%20Academy%20Grandmaster!%20%F0%9F%8E%93%20Completed%20all%207%20modules%20and%20earned%20my%20soulbound%20NFT%20badge.%20%23ScrollAcademy%20%23Web3%20%23Layer2`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base"
                >
                  Share on Twitter
                </a>
                <Link
                  href="/modules"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm md:text-base"
                >
                  Review Modules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
