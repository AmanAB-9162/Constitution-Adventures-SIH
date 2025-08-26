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
    question: "What is the first word of the Indian Constitution's Preamble?",
    options: ["We", "India", "Constitution", "People"],
    correct: 0,
    explanation: "The Preamble starts with 'WE, the people of India...'",
  },
  {
    id: 2,
    question: "Which of these words was NOT in the original Preamble?",
    options: ["Sovereign", "Socialist", "Republic", "Justice"],
    correct: 1,
    explanation: "'Socialist' was added later by the 42nd Amendment in 1976.",
  },
  {
    id: 3,
    question: "What does 'Secular' mean in the context of India?",
    options: ["Religious country", "No religion", "All religions equal", "Hindu country"],
    correct: 2,
    explanation: "Secular means the state treats all religions equally and doesn't favor any particular religion.",
  },
  {
    id: 4,
    question: "Who is known as the 'Father of the Indian Constitution'?",
    options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
    correct: 1,
    explanation: "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution for his role in drafting it.",
  },
  {
    id: 5,
    question: "When was the Preamble adopted?",
    options: ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1948"],
    correct: 2,
    explanation: "The Preamble was adopted on 26 November 1949, along with the Constitution.",
  },
]

export default function PreambleQuizPage() {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed! 🎉</h2>
              <p className="text-xl text-gray-600">Great job learning about the Preamble!</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
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
              <Button onClick={resetQuiz} className="w-full bg-blue-600 hover:bg-blue-700">
                🔄 Take Quiz Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/learn/the-preamble">📚 Back to Preamble</Link>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/learn/the-preamble">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Preamble
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">📜 Preamble Quiz</h1>
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
                        ? "bg-blue-600 text-white"
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
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Explanation:</h4>
                  <p className="text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                </div>
              )}

              {!showResult && (
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
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
