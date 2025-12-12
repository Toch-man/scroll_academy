"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { useScaffoldReadContract } from "../../hooks/scaffold-eth";
import { modules } from "../../utils/data/moduleContent";
import { useAccount } from "wagmi";
import { CheckCircleIcon, LockClosedIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

export default function ModulesPage() {
  const { address: connectedAddress } = useAccount();
  const [moduleStatuses, setModuleStatuses] = useState<{ [key: number]: boolean }>({});

  // Read user progress from contract
  const { data: userProgress } = useScaffoldReadContract({
    contractName: "ScrollAcademy",
    functionName: "getUserProgress",
    args: [connectedAddress],
  });

  const completedModules = userProgress ? Number(userProgress[0]) : 0;
  const totalModules = userProgress ? Number(userProgress[1]) : 7;
  const hasGraduated = userProgress ? userProgress[2] : false;

  // Check completion status for each module
  useEffect(() => {
    if (!connectedAddress) return;

    const statuses: { [key: number]: boolean } = {};
    modules.forEach(module => {
      // Module is completed if it's within completedModules count
      statuses[module.id] = module.id <= completedModules;
    });
    setModuleStatuses(statuses);
  }, [connectedAddress, completedModules]);

  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  if (!connectedAddress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Connect Your Wallet</h1>
          <p className="text-lg text-gray-600">Please connect your wallet to view modules and track progress.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 md:py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Scroll Academy</h1>
          <p className="text-base md:text-xl text-gray-600">
            Complete all 7 modules to earn your Grandmaster NFT badge
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Progress</h2>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {completedModules} of {totalModules} modules completed
              </p>
            </div>
            {hasGraduated && (
              <Link
                href="/badge"
                className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-sm md:text-base"
              >
                🏆 View Your Badge
              </Link>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm font-semibold text-purple-600">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="overflow-hidden h-3 md:h-4 text-xs flex rounded-full bg-purple-100">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-4 md:gap-6">
          {modules.map((module, index) => {
            const isCompleted = moduleStatuses[module.id] || false;
            const isLocked = index > 0 && !moduleStatuses[index];
            const canAccess = index === 0 || moduleStatuses[index];

            return (
              <div
                key={module.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  isLocked ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Module Number Badge */}
                  <div
                    className={`flex items-center justify-center w-full md:w-24 h-20 md:h-auto text-3xl md:text-4xl font-bold ${
                      isCompleted
                        ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                        : isLocked
                          ? "bg-gray-200 text-gray-400"
                          : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="w-10 h-10 md:w-12 md:h-12" />
                    ) : isLocked ? (
                      <LockClosedIcon className="w-8 h-8 md:w-10 md:h-10" />
                    ) : (
                      module.emoji
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-purple-600">Module {module.id}</span>
                          {isCompleted && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Completed
                            </span>
                          )}
                          {isLocked && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                              Locked
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{module.title}</h3>
                        <p className="text-sm md:text-base text-gray-600 line-clamp-2">{module.description}</p>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-end md:justify-start">
                        {canAccess ? (
                          <Link
                            href={`/module/${module.id}`}
                            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base whitespace-nowrap"
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="hidden sm:inline">Review</span>
                                <span className="sm:hidden">Review</span>
                              </>
                            ) : (
                              <>
                                <PlayCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="hidden sm:inline">Start Module</span>
                                <span className="sm:hidden">Start</span>
                              </>
                            )}
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed text-sm md:text-base whitespace-nowrap"
                          >
                            <LockClosedIcon className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden sm:inline">Complete Previous</span>
                            <span className="sm:hidden">Locked</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {!hasGraduated && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 text-center text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Keep Going! 💪</h3>
            <p className="text-sm md:text-base opacity-90">
              Complete {totalModules - completedModules} more module{totalModules - completedModules !== 1 ? "s" : ""}{" "}
              to earn your Grandmaster NFT badge.
            </p>
          </div>
        )}

        {hasGraduated && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl shadow-xl p-6 md:p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">🎉 Congratulations, Grandmaster!</h3>
            <p className="text-sm md:text-base mb-4">
              You&apos;ve completed all modules and earned your soulbound NFT badge!
            </p>
            <Link
              href="/badge"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-yellow-600 rounded-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              View Your Badge →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
