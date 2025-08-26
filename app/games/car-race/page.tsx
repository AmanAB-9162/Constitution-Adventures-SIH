"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, Zap, Flag } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Car {
  id: number
  name: string
  position: number
  color: string
  emoji: string
  speed: number
}

const questions: Question[] = [
  {
    question: "Which right allows you to speak freely?",
    options: ["Right to Equality", "Right to Freedom", "Right to Education", "Right to Privacy"],
    correct: 1,
    explanation: "Right to Freedom includes freedom of speech and expression.",
  },
  {
    question: "What is the minimum age to vote in India?",
    options: ["16 years", "17 years", "18 years", "21 years"],
    correct: 2,
    explanation: "Citizens can vote from the age of 18 years.",
  },
  {
    question: "How many fundamental duties are there?",
    options: ["10", "11", "12", "13"],
    correct: 1,
    explanation: "There are 11 fundamental duties for Indian citizens.",
  },
  {
    question: "What does 'Republic' mean?",
    options: ["King rules", "People elect leaders", "No government", "Military rule"],
    correct: 1,
    explanation: "Republic means the head of state is elected by the people, not inherited.",
  },
  {
    question: "Which article talks about Right to Education?",
    options: ["Article 19", "Article 21A", "Article 25", "Article 32"],
    correct: 1,
    explanation: "Article 21A guarantees free and compulsory education for children aged 6-14.",
  },
  {
    question: "Who is known as the Father of the Constitution?",
    options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
    correct: 1,
    explanation: "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution.",
  },
]

export default function CarRaceGame() {
  const [cars, setCars] = useState<Car[]>([
    { id: 1, name: "You", position: 0, color: "bg-blue-500", emoji: "🏎️", speed: 0 },
    { id: 2, name: "Bot", position: 0, color: "bg-red-500", emoji: "🚗", speed: 0 },
  ])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [winner, setWinner] = useState("")
  const [showQuestion, setShowQuestion] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameStarted, setGameStarted] = useState(false)
  const [raceInProgress, setRaceInProgress] = useState(false)
  const [currentTurn, setCurrentTurn] = useState<"player" | "bot">("player")
  const [botThinking, setBotThinking] = useState(false)

  // Bot auto-answer effect
  useEffect(() => {
    if (showQuestion && currentTurn === "bot" && gameStarted && !gameWon) {
      setBotThinking(true)
      const botTimer = setTimeout(
        () => {
          handleBotAnswer()
          setBotThinking(false)
        },
        Math.random() * 2000 + 2000,
      )

      return () => clearTimeout(botTimer)
    }
  }, [showQuestion, currentTurn, gameStarted, gameWon])

  // Timer effect for player
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && showQuestion && currentTurn === "player" && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && showQuestion && currentTurn === "player") {
      // Time up, player gets no boost
      handleAnswer(-1)
    }
  }, [timeLeft, showQuestion, gameStarted, gameWon, currentTurn])

  // Race animation effect
  useEffect(() => {
    if (raceInProgress) {
      const raceTimer = setInterval(() => {
        setCars((prevCars) => {
          const newCars = prevCars.map((car) => ({
            ...car,
            position: Math.min(car.position + car.speed, 100),
          }))

          // Check if any car finished
          const finishedCars = newCars.filter((car) => car.position >= 100)
          if (finishedCars.length > 0) {
            const winner = finishedCars.reduce((prev, current) => (prev.position > current.position ? prev : current))
            setGameWon(true)
            setWinner(winner.name)
            setRaceInProgress(false)
          }

          return newCars
        })
      }, 100)

      return () => clearInterval(raceTimer)
    }
  }, [raceInProgress])

  const startGame = () => {
    setGameStarted(true)
    setShowQuestion(true)
    setTimeLeft(15)
    setCurrentQuestion(0)
    setCurrentTurn("player")
  }

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === questions[currentQuestion].correct

    if (currentTurn === "player") {
      if (isCorrect) {
        setCars((prev) => prev.map((car) => (car.id === 1 ? { ...car, speed: car.speed + 15 } : car)))
        setScore(score + 10)
      }
    }

    setShowQuestion(false)
    setRaceInProgress(true)

    // Stop race after 3 seconds and switch turns
    setTimeout(() => {
      setRaceInProgress(false)
      setCars((prev) => prev.map((car) => ({ ...car, speed: 0 })))

      // Switch turns
      if (currentTurn === "player") {
        setCurrentTurn("bot")
      } else {
        setCurrentTurn("player")
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          // End game based on positions
          const playerCar = cars.find((car) => car.id === 1)
          const botCar = cars.find((car) => car.id === 2)
          if (playerCar && botCar) {
            if (playerCar.position > botCar.position) {
              setWinner("You")
            } else if (botCar.position > playerCar.position) {
              setWinner("Bot")
            } else {
              setWinner("Tie")
            }
            setGameWon(true)
          }
          return
        }
      }

      setTimeLeft(15)
      setShowQuestion(true)
    }, 3000)
  }

  const handleBotAnswer = () => {
    // Bot has 65% chance to answer correctly
    const botAnswerCorrectly = Math.random() < 0.65
    const botAnswer = botAnswerCorrectly
      ? questions[currentQuestion].correct
      : Math.floor(Math.random() * questions[currentQuestion].options.length)

    if (botAnswer === questions[currentQuestion].correct) {
      setCars((prev) => prev.map((car) => (car.id === 2 ? { ...car, speed: car.speed + 12 } : car)))
    }

    handleAnswer(botAnswer)
  }

  const resetGame = () => {
    setCars([
      { id: 1, name: "You", position: 0, color: "bg-blue-500", emoji: "🏎️", speed: 0 },
      { id: 2, name: "Bot", position: 0, color: "bg-red-500", emoji: "🚗", speed: 0 },
    ])
    setCurrentQuestion(0)
    setGameWon(false)
    setWinner("")
    setShowQuestion(false)
    setScore(0)
    setTimeLeft(15)
    setGameStarted(false)
    setRaceInProgress(false)
    setCurrentTurn("player")
    setBotThinking(false)
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {winner === "You" ? "🎉 You Win!" : winner === "Bot" ? "🤖 Bot Wins!" : "🤝 It's a Tie!"}
            </h2>
            <p className="text-lg text-gray-600 mb-4">Final Score: {score} points</p>
            <p className="text-md text-gray-600 mb-6">Great racing and learning about rights and duties!</p>
            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
                🏁 Race Again
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/games">🏠 Back to Games</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/games">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Games
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">🏁 Constitutional Car Race</h1>
            <div className="text-lg font-semibold text-gray-700">
              Score: {score} | {currentTurn === "player" ? "Your Turn" : "Bot's Turn"}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🏎️</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Race?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Take turns with the bot answering Constitution questions to boost your car's speed! First to reach the
                  finish line wins!
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-blue-800 mb-2">How to Race:</h3>
                  <ul className="text-left text-blue-700 space-y-1">
                    <li>• Take turns answering questions with the bot</li>
                    <li>• Answer correctly to boost your speed</li>
                    <li>• You have 15 seconds per question</li>
                    <li>• First car to reach 100% wins the race!</li>
                    <li>• Bot will answer after you each round</li>
                  </ul>
                </div>
                <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                  🚀 Start Race!
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Race Track */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center">
                  <Flag className="w-6 h-6 mr-2" />
                  Race Track - {currentTurn === "player" ? "Your Turn" : "Bot's Turn"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cars.map((car) => (
                    <div key={car.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold flex items-center">
                          <span className="text-2xl mr-2">{car.emoji}</span>
                          {car.name}
                          {currentTurn === "bot" && car.id === 2 && botThinking && (
                            <span className="ml-2 text-sm text-blue-600 animate-pulse">🤔 Thinking...</span>
                          )}
                        </span>
                        <span className="text-sm text-gray-600">{Math.round(car.position)}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={car.position} className="h-8" />
                        <div
                          className="absolute top-0 h-8 flex items-center transition-all duration-500"
                          style={{ left: `${Math.min(car.position, 95)}%` }}
                        >
                          <div className={`text-2xl ${raceInProgress ? "animate-bounce" : ""}`}>{car.emoji}</div>
                        </div>
                        {car.position >= 100 && (
                          <div className="absolute right-0 top-0 h-8 flex items-center">
                            <Flag className="w-6 h-6 text-green-600" />
                          </div>
                        )}
                      </div>
                      {car.speed > 0 && <div className="text-xs text-gray-600 mt-1">Speed Boost: +{car.speed}</div>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            {showQuestion && (
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Question {currentQuestion + 1}/{questions.length} -{" "}
                      {currentTurn === "player" ? "Your Turn" : "Bot's Turn"}
                    </CardTitle>
                    {currentTurn === "player" && (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <span className={`text-lg font-bold ${timeLeft <= 5 ? "text-red-600" : "text-gray-700"}`}>
                          {timeLeft}s
                        </span>
                      </div>
                    )}
                    {currentTurn === "bot" && botThinking && (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin text-blue-500">🤖</div>
                        <span className="text-sm text-blue-600">Bot is thinking...</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-4 h-auto text-left justify-start hover:bg-blue-50 bg-transparent"
                        onClick={() => currentTurn === "player" && handleAnswer(index)}
                        disabled={currentTurn === "bot" || botThinking}
                      >
                        <span className="mr-3 font-bold text-blue-600">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-800">
                      ⚡ <strong>Racing Tip:</strong>{" "}
                      {currentTurn === "player"
                        ? "Answer fast and correctly to boost your speed!"
                        : "Bot is selecting an answer..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {raceInProgress && (
              <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🏁</div>
                  <h3 className="text-2xl font-bold mb-2">Racing in Progress!</h3>
                  <p className="text-lg">Cars are speeding down the track...</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
