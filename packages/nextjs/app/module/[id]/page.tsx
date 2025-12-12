"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { useAccount } from "wagmi";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { modules } from "~~/utils/data/moduleContent";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { address: connectedAddress } = useAccount();
  const moduleId = parseInt(params.id as string);
  const module = modules.find(m => m.id === moduleId);

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<"success" | "error" | null>(null);

  // Read module completion status
  const { data: isCompleted } = useScaffoldReadContract({
    contractName: "ScrollAcademy",
    functionName: "hasCompletedModule",
    args: [connectedAddress, BigInt(moduleId)],
  });

  // Read user progress to check if previous module is completed
  const { data: userProgress } = useScaffoldReadContract({
    contractName: "ScrollAcademy",
    functionName: "getUserProgress",
    args: [connectedAddress],
  });

  const completedModulesCount = userProgress ? Number(userProgress[0]) : 0;
  const canAccessModule = moduleId === 1 || completedModulesCount >= moduleId - 1;

  // Submit quiz contract write
  const { writeContractAsync: submitQuiz } = useScaffoldWriteContract("ScrollAcademy");

  useEffect(() => {
    if (module && !showQuiz) {
      setSelectedAnswers(new Array(module.quiz.length).fill(-1));
    }
  }, [module, showQuiz]);

  if (!connectedAddress) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Connect Your Wallet</h1>
          <p className="text-base md:text-lg text-gray-600">Please connect your wallet to access modules.</p>
          <Link
            href="/modules"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Module Not Found</h1>
          <Link
            href="/modules"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  if (!canAccessModule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Module Locked 🔒</h1>
          <p className="text-base md:text-lg text-gray-600">Complete the previous module first to unlock this one.</p>
          <Link
            href="/modules"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    // Check if all questions are answered
    if (selectedAnswers.some(answer => answer === -1)) {
      alert("Please answer all questions before submitting!");
      return;
    }

    setIsSubmitting(true);
    setQuizResult(null);

    try {
      await submitQuiz({
        functionName: "submitQuiz",
        args: [BigInt(moduleId), selectedAnswers.map(a => BigInt(a))],
      });

      setQuizResult("success");
      setTimeout(() => {
        router.push("/modules");
      }, 3000);
    } catch (error: any) {
      console.error("Quiz submission error:", error);
      setQuizResult("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 md:py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/modules" className="p-2 hover:bg-white rounded-lg transition-colors">
            <ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs md:text-sm font-semibold text-purple-600">Module {module.id} of 7</span>
              {isCompleted && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  ✓ Completed
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-3xl md:text-4xl">{module.emoji}</span>
              <span className="break-words">{module.title}</span>
            </h1>
          </div>
        </div>

        {/* Content or Quiz */}
        {!showQuiz ? (
          <>
            {/* Lesson Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="prose prose-sm md:prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4 mb-2" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-sm md:text-base" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-sm md:text-base" {...props} />
                    ),
                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                  }}
                >
                  {module.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Take Quiz Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Ready to Test Your Knowledge?</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Complete the quiz to finish this module and unlock the next one.
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-base md:text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Take the Quiz →
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Quiz Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Quiz Time! 🎯</h2>
                <p className="text-sm md:text-base text-gray-600">
                  Answer all questions correctly to complete this module.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                {module.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => (
                        <label
                          key={oIndex}
                          className={`flex items-start gap-3 p-3 md:p-4 rounded-lg cursor-pointer transition-all ${
                            selectedAnswers[qIndex] === oIndex
                              ? "bg-purple-600 text-white shadow-lg"
                              : "bg-white hover:bg-purple-50 text-gray-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            value={oIndex}
                            checked={selectedAnswers[qIndex] === oIndex}
                            onChange={() => handleAnswerSelect(qIndex, oIndex)}
                            className="mt-1 w-4 h-4 md:w-5 md:h-5"
                          />
                          <span className="flex-1 text-sm md:text-base">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowQuiz(false)}
                  className="flex-1 px-6 py-3 md:py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm md:text-base"
                  disabled={isSubmitting}
                >
                  Back to Lesson
                </button>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting || selectedAnswers.some(a => a === -1)}
                  className={`flex-1 px-6 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base transition-all ${
                    isSubmitting || selectedAnswers.some(a => a === -1)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </button>
              </div>

              {/* Result Messages */}
              {quizResult === "success" && (
                <div className="mt-6 p-4 md:p-6 bg-green-100 border-2 border-green-500 rounded-xl text-center">
                  <CheckCircleIcon className="w-12 h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg md:text-xl font-bold text-green-800 mb-1">Congratulations! 🎉</h3>
                  <p className="text-sm md:text-base text-green-700">
                    You've completed this module. Redirecting to modules...
                  </p>
                </div>
              )}

              {quizResult === "error" && (
                <div className="mt-6 p-4 md:p-6 bg-red-100 border-2 border-red-500 rounded-xl text-center">
                  <h3 className="text-lg md:text-xl font-bold text-red-800 mb-1">Incorrect Answers ❌</h3>
                  <p className="text-sm md:text-base text-red-700 mb-3">
                    Some answers were wrong. Review the lesson and try again!
                  </p>
                  <button
                    onClick={() => {
                      setShowQuiz(false);
                      setQuizResult(null);
                      setSelectedAnswers(new Array(module.quiz.length).fill(-1));
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 text-sm md:text-base"
                  >
                    Review Lesson
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {moduleId > 1 && (
            <Link
              href={`/module/${moduleId - 1}`}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:shadow-lg transition-all text-sm md:text-base"
            >
              <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
              Previous Module
            </Link>
          )}
          {moduleId < 7 && isCompleted && (
            <Link
              href={`/module/${moduleId + 1}`}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all ml-auto text-sm md:text-base"
            >
              Next Module
              <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
