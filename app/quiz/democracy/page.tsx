"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star } from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum voting age in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "Every Indian citizen who is 18 years or older has the right to vote.",
  },
  {
    id: 2,
    question: "Who conducts elections in India?",
    options: ["Prime Minister", "President", "Election Commission", "Supreme Court"],
    correct: 2,
    explanation: "The Election Commission of India is responsible for conducting free and fair elections.",
  },
  {
    id: 3,
    question: "What is the term of Lok Sabha?",
    options: ["3 years", "4 years", "5 years", "6 years"],
    correct: 2,
    explanation: "The Lok Sabha (House of the People) has a term of 5 years.",
  },
  {
    id: 4,
    question: "Who is the head of state in India?",
    options: ["Prime Minister", "President", "Chief Justice", "Speaker of Lok Sabha"],
    correct: 1,
    explanation:
      "The President is the head of state, though most executive powers are exercised by the Prime Minister.",
  },
  {
    id: 5,
    question: "Which of these is NOT a feature of Indian democracy?",
    options: ["Universal Adult Franchise", "Federal System", "Single-Party System", "Independent Judiciary"],
    correct: 2,
    explanation:
      "India has a multi-party system, not a single-party system. Multiple political parties can contest elections.",
  },
]

export default function DemocracyQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed! 🎉</h2>
              <p className="text-xl text-gray-600">Great job learning about Democracy in India!</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold mb-2">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-lg">Your Score</div>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < Math.ceil((score / quizQuestions.length) * 5) ? "text-yellow-300 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={resetQuiz} className="w-full bg-purple-600 hover:bg-purple-700">
                🔄 Take Quiz Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/learn/democracy-in-india">📚 Back to Democracy in India</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/learn">🏠 Back to Learning</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/learn/democracy-in-india">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Democracy in India
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">🗳️ Democracy Quiz</h1>
            <div className="text-lg font-semibold text-gray-700">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-white mb-2">
              <span>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-white/20" />
          </div>

          {/* Question Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800">
                {quizQuestions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full p-4 text-left justify-start text-lg h-auto ${
                    showResult
                      ? index === quizQuestions[currentQuestion].correct
                        ? "bg-green-500 text-white border-green-500"
                        : selectedAnswer === index && index !== quizQuestions[currentQuestion].correct
                          ? "bg-red-500 text-white border-red-500"
                          : "opacity-50"
                      : selectedAnswer === index
                        ? "bg-purple-600 text-white"
                        : "hover:bg-gray-100"
                  }`}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                  {showResult && index === quizQuestions[currentQuestion].correct && (
                    <CheckCircle className="w-6 h-6 ml-auto text-white" />
                  )}
                  {showResult && selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                    <XCircle className="w-6 h-6 ml-auto text-white" />
                  )}
                </Button>
              ))}

              {showResult && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">💡 Explanation:</h4>
                  <p className="text-purple-700">{quizQuestions[currentQuestion].explanation}</p>
                </div>
              )}

              {!showResult && (
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"} →
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
