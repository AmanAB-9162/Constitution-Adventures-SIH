"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, CheckCircle, XCircle, Award, Leaf, TreePine, Recycle } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

interface QuizState {
  currentQuestion: number
  score: number
  answers: (number | null)[]
  timeLeft: number
  isActive: boolean
  showResults: boolean
  startTime: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which gas is primarily responsible for global warming?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: 1,
    explanation:
      "Carbon dioxide (CO2) is the primary greenhouse gas responsible for global warming, trapping heat in Earth's atmosphere.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What is the main cause of ozone layer depletion?",
    options: ["Carbon monoxide", "Chlorofluorocarbons (CFCs)", "Methane", "Sulfur dioxide"],
    correct: 1,
    explanation:
      "Chlorofluorocarbons (CFCs) are the main cause of ozone layer depletion, breaking down ozone molecules in the stratosphere.",
    difficulty: "medium",
  },
  {
    id: 3,
    question: "Which renewable energy source is most widely used globally?",
    options: ["Solar power", "Wind power", "Hydroelectric power", "Geothermal power"],
    correct: 2,
    explanation:
      "Hydroelectric power is the most widely used renewable energy source globally, generating electricity from flowing water.",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "What percentage of Earth's water is freshwater?",
    options: ["10%", "5%", "3%", "1%"],
    correct: 2,
    explanation: "Only about 3% of Earth's water is freshwater, with most of it frozen in ice caps and glaciers.",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "Which ecosystem is known as the 'lungs of the Earth'?",
    options: ["Grasslands", "Amazon Rainforest", "Coral reefs", "Tundra"],
    correct: 1,
    explanation:
      "The Amazon Rainforest is called the 'lungs of the Earth' because it produces about 20% of the world's oxygen.",
    difficulty: "easy",
  },
  {
    id: 6,
    question: "What is the process by which plants absorb CO2 from the atmosphere?",
    options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
    correct: 1,
    explanation:
      "Photosynthesis is the process by which plants absorb CO2 from the atmosphere and convert it into oxygen and glucose using sunlight.",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "Which country produces the most renewable energy?",
    options: ["United States", "Germany", "China", "India"],
    correct: 2,
    explanation:
      "China is the world's largest producer of renewable energy, leading in solar, wind, and hydroelectric power generation.",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "What is the main component of acid rain?",
    options: ["Nitric acid", "Sulfuric acid", "Hydrochloric acid", "Carbonic acid"],
    correct: 1,
    explanation:
      "Sulfuric acid is the main component of acid rain, formed when sulfur dioxide from pollution combines with water in the atmosphere.",
    difficulty: "hard",
  },
  {
    id: 9,
    question: "Which international agreement aims to combat climate change?",
    options: ["Kyoto Protocol", "Paris Agreement", "Montreal Protocol", "Basel Convention"],
    correct: 1,
    explanation:
      "The Paris Agreement is the main international treaty aimed at combating climate change by limiting global temperature rise.",
    difficulty: "medium",
  },
  {
    id: 10,
    question: "What is the term for species that are at risk of extinction?",
    options: ["Vulnerable species", "Endangered species", "Extinct species", "Endemic species"],
    correct: 1,
    explanation:
      "Endangered species are those at risk of extinction due to habitat loss, climate change, or human activities.",
    difficulty: "easy",
  },
  {
    id: 11,
    question: "Which layer of the atmosphere contains the ozone layer?",
    options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    correct: 1,
    explanation: "The ozone layer is located in the stratosphere, about 10-30 kilometers above Earth's surface.",
    difficulty: "hard",
  },
  {
    id: 12,
    question: "What is the most effective way to reduce carbon footprint?",
    options: ["Recycling", "Using renewable energy", "Reducing meat consumption", "All of the above"],
    correct: 3,
    explanation:
      "All these actions help reduce carbon footprint: recycling reduces waste, renewable energy cuts emissions, and reducing meat consumption lowers agricultural emissions.",
    difficulty: "medium",
  },
  {
    id: 13,
    question: "Which gas makes up the largest percentage of greenhouse gases?",
    options: ["Carbon dioxide", "Methane", "Nitrous oxide", "Fluorinated gases"],
    correct: 0,
    explanation:
      "Carbon dioxide makes up about 76% of all greenhouse gas emissions, primarily from burning fossil fuels.",
    difficulty: "medium",
  },
  {
    id: 14,
    question: "What is biodiversity?",
    options: [
      "Number of trees in a forest",
      "Variety of life on Earth",
      "Amount of water in oceans",
      "Types of rocks in soil",
    ],
    correct: 1,
    explanation:
      "Biodiversity refers to the variety of life on Earth, including different species, ecosystems, and genetic diversity.",
    difficulty: "easy",
  },
  {
    id: 15,
    question: "Which human activity contributes most to deforestation?",
    options: ["Urban development", "Agriculture", "Mining", "Tourism"],
    correct: 1,
    explanation: "Agriculture is the leading cause of deforestation, accounting for about 80% of forest loss globally.",
    difficulty: "medium",
  },
]

export default function EnvironmentQuiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: new Array(questions.length).fill(null),
    timeLeft: 30,
    isActive: false,
    showResults: false,
    startTime: 0,
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (quizState.isActive && quizState.timeLeft > 0 && !showExplanation) {
      interval = setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
    } else if (quizState.timeLeft === 0 && !showExplanation) {
      handleTimeUp()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [quizState.isActive, quizState.timeLeft, showExplanation])

  const startQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      isActive: true,
      startTime: Date.now(),
      timeLeft: 30,
    }))
  }

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1) // Mark as unanswered
    }
    setShowExplanation(true)

    setTimeout(() => {
      nextQuestion()
    }, 4000)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const isCorrect = answerIndex === questions[quizState.currentQuestion].correct

    setQuizState((prev) => ({
      ...prev,
      answers: prev.answers.map((ans, idx) => (idx === prev.currentQuestion ? answerIndex : ans)),
      score: isCorrect ? prev.score + getQuestionPoints(questions[prev.currentQuestion].difficulty) : prev.score,
    }))

    setTimeout(() => {
      nextQuestion()
    }, 4000)
  }

  const getQuestionPoints = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return 10
      case "medium":
        return 15
      case "hard":
        return 20
      default:
        return 10
    }
  }

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeLeft: 30,
      }))
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      isActive: false,
      showResults: true,
    }))
  }

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: new Array(questions.length).fill(null),
      timeLeft: 30,
      isActive: false,
      showResults: false,
      startTime: 0,
    })
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const getScoreMessage = () => {
    const percentage = (quizState.score / (questions.length * 15)) * 100
    if (percentage >= 90) return { message: "Environmental Champion! 🌟", color: "text-green-600" }
    if (percentage >= 75) return { message: "Eco Warrior! 🌱", color: "text-blue-600" }
    if (percentage >= 60) return { message: "Nature Friend! 🌿", color: "text-yellow-600" }
    return { message: "Keep Learning! 📚", color: "text-gray-600" }
  }

  const currentQuestion = questions[quizState.currentQuestion]

  if (quizState.showResults) {
    const scoreMessage = getScoreMessage()
    const totalPossibleScore = questions.reduce((sum, q) => sum + getQuestionPoints(q.difficulty), 0)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/environment">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Environment Heroes
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Environment Quiz Results</h1>
          </div>

          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-yellow-500" />
              </div>
              <CardTitle className={`text-2xl ${scoreMessage.color}`}>{scoreMessage.message}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-green-600">
                {quizState.score} / {totalPossibleScore}
              </div>
              <div className="text-lg text-gray-600">
                You answered {quizState.answers.filter((ans, idx) => ans === questions[idx].correct).length} out of{" "}
                {questions.length} questions correctly
              </div>
              <Progress value={(quizState.score / totalPossibleScore) * 100} className="w-full max-w-md mx-auto h-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = quizState.answers[index]
                  const isCorrect = userAnswer === question.correct

                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium mb-2">
                            {index + 1}. {question.question}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Your answer:{" "}
                            {userAnswer !== null && userAnswer >= 0 ? question.options[userAnswer] : "No answer"}
                          </div>
                          <div className="text-sm text-green-600">
                            Correct answer: {question.options[question.correct]}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              question.difficulty === "easy"
                                ? "secondary"
                                : question.difficulty === "medium"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {question.difficulty}
                          </Badge>
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{question.explanation}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={resetQuiz} className="bg-green-600 hover:bg-green-700">
              Take Quiz Again
            </Button>
            <Link href="/environment">
              <Button variant="outline">Back to Environment Heroes</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!quizState.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/environment">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Environment Heroes
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Environment Quiz</h1>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2">
                  <Leaf className="w-12 h-12 text-green-500" />
                  <TreePine className="w-12 h-12 text-green-600" />
                  <Recycle className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-700">Test Your Environmental Knowledge!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg text-gray-600">
                Challenge yourself with {questions.length} questions about environmental science, climate change,
                renewable energy, and conservation.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{questions.length}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">30s</div>
                  <div className="text-sm text-gray-600">Per Question</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">10-20</div>
                  <div className="text-sm text-gray-600">Points Each</div>
                </div>
              </div>

              <div className="space-y-2 text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-800">Topics Covered:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Climate Change & Global Warming</li>
                  <li>• Renewable Energy Sources</li>
                  <li>• Biodiversity & Conservation</li>
                  <li>• Pollution & Environmental Protection</li>
                  <li>• Sustainable Development</li>
                </ul>
              </div>

              <Button onClick={startQuiz} size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Environment Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/environment">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Environment Heroes
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Question {quizState.currentQuestion + 1} of {questions.length}
            </Badge>
            <Badge
              variant={
                currentQuestion.difficulty === "easy"
                  ? "secondary"
                  : currentQuestion.difficulty === "medium"
                    ? "default"
                    : "destructive"
              }
            >
              {currentQuestion.difficulty} - {getQuestionPoints(currentQuestion.difficulty)} pts
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">Score: {quizState.score}</span>
          </div>
          <Progress value={((quizState.currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Timer */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-bold text-blue-600">{quizState.timeLeft}s</span>
              <div className="flex-1 ml-4">
                <Progress value={(quizState.timeLeft / 30) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswer === index
                    ? showExplanation
                      ? index === currentQuestion.correct
                        ? "default"
                        : "destructive"
                      : "default"
                    : "outline"
                }
                className={`w-full justify-start text-left h-auto p-4 ${
                  showExplanation && index === currentQuestion.correct
                    ? "bg-green-100 border-green-500 text-green-700"
                    : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showExplanation && index === currentQuestion.correct && (
                  <CheckCircle className="w-5 h-5 ml-auto text-green-600" />
                )}
                {showExplanation && selectedAnswer === index && index !== currentQuestion.correct && (
                  <XCircle className="w-5 h-5 ml-auto text-red-600" />
                )}
              </Button>
            ))}

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800 mb-2">Explanation:</div>
                <div className="text-blue-700">{currentQuestion.explanation}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
