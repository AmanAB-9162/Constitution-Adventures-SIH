"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Shield, CheckCircle, XCircle, Clock } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const safetyQuestions: Question[] = [
  {
    id: 1,
    question: "What is the emergency number for police in India?",
    options: ["100", "101", "102", "112"],
    correct: 3,
    explanation: "112 is the unified emergency number for all services including police in India.",
  },
  {
    id: 2,
    question: "What should you do if you see a stranger following you?",
    options: ["Run away quietly", "Go to a crowded place", "Hide somewhere", "Ignore them"],
    correct: 1,
    explanation: "Always go to a crowded, safe place like a shop or where there are many people around.",
  },
  {
    id: 3,
    question: "Which number should you call for medical emergencies?",
    options: ["100", "102", "101", "1098"],
    correct: 1,
    explanation: "102 or 108 are the ambulance emergency numbers for medical help.",
  },
  {
    id: 4,
    question: "What information should you give when calling for help?",
    options: ["Only your name", "Your location and what happened", "Just the problem", "Your age only"],
    correct: 1,
    explanation: "Always give your exact location and clearly explain what happened so help can reach you quickly.",
  },
  {
    id: 5,
    question: "If someone online asks to meet you, what should you do?",
    options: [
      "Meet them in a public place",
      "Tell your parents/guardian",
      "Go alone to meet them",
      "Give them your address",
    ],
    correct: 1,
    explanation: "Never meet strangers from the internet. Always tell a trusted adult about such requests.",
  },
  {
    id: 6,
    question: "What is the child helpline number in India?",
    options: ["1098", "1091", "1930", "1938"],
    correct: 0,
    explanation: "1098 is the child helpline number for children who need help or are in trouble.",
  },
  {
    id: 7,
    question: "When crossing the road, what should you always do?",
    options: ["Run quickly", "Look both ways", "Use your phone", "Walk backwards"],
    correct: 1,
    explanation: "Always look both ways before crossing and use pedestrian crossings when available.",
  },
  {
    id: 8,
    question: "What should you do if there's a fire in your building?",
    options: ["Hide under the bed", "Use the elevator", "Call 101 and evacuate", "Open all windows"],
    correct: 2,
    explanation: "Call 101 for fire department and evacuate using stairs, never elevators during a fire.",
  },
  {
    id: 9,
    question: "If you're being bullied at school, what's the best thing to do?",
    options: ["Fight back", "Tell a trusted adult", "Ignore it completely", "Bully others too"],
    correct: 1,
    explanation: "Always tell a trusted adult like parents, teachers, or counselors about bullying.",
  },
  {
    id: 10,
    question: "What should you never share online?",
    options: ["Your favorite color", "Personal information", "Your hobbies", "Your favorite food"],
    correct: 1,
    explanation: "Never share personal information like your address, phone number, or school details online.",
  },
  {
    id: 11,
    question: "What is the women's helpline number?",
    options: ["1091", "1098", "1930", "102"],
    correct: 0,
    explanation: "1091 is the women's helpline number for women in distress or danger.",
  },
  {
    id: 12,
    question: "If you smell gas at home, what should you do first?",
    options: ["Light a match", "Turn on lights", "Open windows and doors", "Use electrical switches"],
    correct: 2,
    explanation: "Open windows and doors for ventilation, avoid using any electrical switches or flames.",
  },
  {
    id: 13,
    question: "What should you do if you get lost in a crowded place?",
    options: [
      "Keep walking around",
      "Ask any stranger for help",
      "Stay where you are and call for help",
      "Leave the area",
    ],
    correct: 2,
    explanation: "Stay in one place and call for help or find a police officer or security guard.",
  },
  {
    id: 14,
    question: "Which of these is a safe password?",
    options: ["123456", "password", "MyName123!", "abc"],
    correct: 2,
    explanation: "A safe password has a mix of letters, numbers, and symbols, and is not easy to guess.",
  },
  {
    id: 15,
    question: "What should you do during an earthquake?",
    options: ["Run outside immediately", "Stand in a doorway", "Drop, Cover, and Hold", "Use the elevator"],
    correct: 2,
    explanation: "Drop to your knees, take cover under a desk or table, and hold on until shaking stops.",
  },
]

export default function SafetyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizStarted, setQuizStarted] = useState(false)

  // Timer effect
  useState(() => {
    if (quizStarted && timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1) // Time up, no answer selected
    }
  })

  const startQuiz = () => {
    setQuizStarted(true)
    setTimeLeft(30)
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === safetyQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < safetyQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(30)
      } else {
        setQuizCompleted(true)
      }
    }, 3000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setTimeLeft(30)
    setQuizStarted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / safetyQuestions.length) * 100
    if (percentage >= 90) return "🌟 Excellent! You're a safety expert!"
    if (percentage >= 80) return "🎉 Great job! You know your safety well!"
    if (percentage >= 70) return "👍 Good work! Keep learning about safety!"
    if (percentage >= 60) return "📚 Not bad! Review safety tips and try again!"
    return "🔄 Keep practicing! Safety knowledge is very important!"
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Shield className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete! 🛡️</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              Score: {score}/{safetyQuestions.length}
            </p>
            <p className="text-lg text-gray-600 mb-6">{getScoreMessage()}</p>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-blue-800 mb-2">Remember:</h3>
              <p className="text-blue-700">
                Safety knowledge can save lives! Keep these emergency numbers handy: 112 (Police), 102 (Ambulance), 101
                (Fire), 1098 (Child Helpline)
              </p>
            </div>

            <div className="space-y-4">
              <Button onClick={resetQuiz} className="w-full bg-blue-600 hover:bg-blue-700">
                🔄 Take Quiz Again
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/safety">🛡️ Back to Safety</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/safety">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Safety
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">🛡️ Safety Quiz</h1>
            <div className="text-lg font-semibold text-gray-700">
              {quizStarted ? `${currentQuestion + 1}/${safetyQuestions.length}` : "Ready?"}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!quizStarted ? (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🛡️</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Safety Knowledge Quiz</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Test your knowledge about safety, emergency numbers, and how to stay safe in different situations!
                </p>
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-red-800 mb-2">Quiz Details:</h3>
                  <ul className="text-left text-red-700 space-y-1">
                    <li>📝 {safetyQuestions.length} questions about safety</li>
                    <li>⏰ 30 seconds per question</li>
                    <li>🎯 Learn emergency numbers and safety tips</li>
                    <li>🏆 Get your safety knowledge score</li>
                  </ul>
                </div>
                <Button onClick={startQuiz} size="lg" className="bg-red-600 hover:bg-red-700">
                  🚀 Start Safety Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <Card className="bg-white/95 backdrop-blur-sm mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {safetyQuestions.length}
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / safetyQuestions.length) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Safety Question</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className={`text-lg font-bold ${timeLeft <= 10 ? "text-red-600" : "text-gray-700"}`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">{safetyQuestions[currentQuestion].question}</p>

                <div className="space-y-3">
                  {safetyQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full text-left justify-start p-4 h-auto ${
                        showResult
                          ? index === safetyQuestions[currentQuestion].correct
                            ? "bg-green-100 border-green-500 text-green-800"
                            : index === selectedAnswer
                              ? "bg-red-100 border-red-500 text-red-800"
                              : ""
                          : "hover:bg-blue-50"
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                    >
                      <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showResult && index === safetyQuestions[currentQuestion].correct && (
                        <CheckCircle className="w-5 h-5 ml-auto text-green-600" />
                      )}
                      {showResult && index === selectedAnswer && index !== safetyQuestions[currentQuestion].correct && (
                        <XCircle className="w-5 h-5 ml-auto text-red-600" />
                      )}
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      <strong>Explanation:</strong> {safetyQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    🛡️ <strong>Safety Tip:</strong> Remember these emergency numbers and safety rules - they could save
                    your life or someone else's!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
