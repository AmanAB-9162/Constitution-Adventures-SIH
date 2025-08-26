"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Target } from "lucide-react"

interface Bird {
  id: number
  type: string
  emoji: string
  color: string
  power: string
  used: boolean
}

interface Pig {
  id: number
  position: { x: number; y: number }
  health: number
  maxHealth: number
  color: string
  emoji: string
  question: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }
  destroyed: boolean
}

const birds: Bird[] = [
  { id: 1, type: "Red", emoji: "🔴", color: "red", power: "Basic Attack", used: false },
  { id: 2, type: "Blue", emoji: "🔵", color: "blue", power: "Triple Shot", used: false },
  { id: 3, type: "Yellow", emoji: "🟡", color: "yellow", power: "Speed Boost", used: false },
  { id: 4, type: "Green", emoji: "🟢", color: "green", power: "Boomerang", used: false },
]

const pigQuestions = [
  {
    question: "What is the first word of the Preamble?",
    options: ["We", "India", "Constitution", "People"],
    correct: 0,
    explanation: "The Preamble starts with 'WE, the people of India...'",
  },
  {
    question: "How many fundamental rights are there?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    explanation: "There are 6 fundamental rights in the Indian Constitution.",
  },
  {
    question: "Who is the Father of the Constitution?",
    options: ["Gandhi", "Nehru", "Dr. Ambedkar", "Patel"],
    correct: 2,
    explanation: "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution.",
  },
  {
    question: "What does 'Secular' mean?",
    options: ["Religious state", "No religion", "All religions equal", "Hindu state"],
    correct: 2,
    explanation: "Secular means treating all religions equally.",
  },
]

export default function AngryBirdsGame() {
  const [birds, setBirds] = useState<Bird[]>([
    { id: 1, type: "Red", emoji: "🔴", color: "red", power: "Basic Attack", used: false },
    { id: 2, type: "Blue", emoji: "🔵", color: "blue", power: "Triple Shot", used: false },
    { id: 3, type: "Yellow", emoji: "🟡", color: "yellow", power: "Speed Boost", used: false },
    { id: 4, type: "Green", emoji: "🟢", color: "green", power: "Boomerang", used: false },
  ])

  const [pigs, setPigs] = useState<Pig[]>([
    {
      id: 1,
      position: { x: 70, y: 60 },
      health: 100,
      maxHealth: 100,
      color: "red",
      emoji: "🔴",
      question: pigQuestions[0],
      destroyed: false,
    },
    {
      id: 2,
      position: { x: 85, y: 40 },
      health: 100,
      maxHealth: 100,
      color: "blue",
      emoji: "🔵",
      question: pigQuestions[1],
      destroyed: false,
    },
    {
      id: 3,
      position: { x: 75, y: 80 },
      health: 100,
      maxHealth: 100,
      color: "yellow",
      emoji: "🟡",
      question: pigQuestions[2],
      destroyed: false,
    },
    {
      id: 4,
      position: { x: 90, y: 70 },
      health: 100,
      maxHealth: 100,
      color: "green",
      emoji: "🟢",
      question: pigQuestions[3],
      destroyed: false,
    },
  ])

  const [currentBird, setCurrentBird] = useState(0)
  const [targetPig, setTargetPig] = useState<Pig | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [shooting, setShooting] = useState(false)

  const startGame = () => {
    setGameStarted(true)
  }

  const shootBird = (pigId: number) => {
    const pig = pigs.find((p) => p.id === pigId && !p.destroyed)
    const currentBirdData = birds[currentBird]

    if (!pig || !currentBirdData || currentBirdData.used || shooting) return

    // Check if bird color matches pig color for bonus
    const colorMatch = currentBirdData.color === pig.color

    setShooting(true)
    setTargetPig(pig)
    setShowQuestion(true)
  }

  const answerQuestion = (answerIndex: number) => {
    if (!targetPig) return

    const isCorrect = answerIndex === targetPig.question.correct
    const currentBirdData = birds[currentBird]
    const colorMatch = currentBirdData && currentBirdData.color === targetPig.color

    setShowQuestion(false)

    // Mark bird as used
    setBirds((prev) => prev.map((bird, index) => (index === currentBird ? { ...bird, used: true } : bird)))

    if (isCorrect) {
      // Destroy the pig
      setPigs((prev) => prev.map((pig) => (pig.id === targetPig.id ? { ...pig, destroyed: true, health: 0 } : pig)))

      // Bonus points for color matching
      const basePoints = 100
      const bonusPoints = colorMatch ? 50 : 0
      setScore((prev) => prev + basePoints + bonusPoints)

      // Check if all pigs are destroyed
      const remainingPigs = pigs.filter((pig) => !pig.destroyed && pig.id !== targetPig.id)
      if (remainingPigs.length === 0) {
        setTimeout(() => setGameWon(true), 1000)
      }
    } else {
      // Damage the pig but don't destroy it
      const damage = colorMatch ? 50 : 30
      setPigs((prev) =>
        prev.map((pig) => (pig.id === targetPig.id ? { ...pig, health: Math.max(pig.health - damage, 0) } : pig)),
      )
      setScore((prev) => prev + 20)
    }

    // Move to next bird
    const nextBird = currentBird + 1
    if (nextBird >= birds.length) {
      // Check if any pigs are still alive
      const alivePigs = pigs.filter((pig) => !pig.destroyed && pig.health > 0)
      if (alivePigs.length > 0) {
        setTimeout(() => setGameOver(true), 1000)
      }
    } else {
      setCurrentBird(nextBird)
    }

    setShooting(false)
    setTargetPig(null)
  }

  const resetGame = () => {
    setBirds([
      { id: 1, type: "Red", emoji: "🔴", color: "red", power: "Basic Attack", used: false },
      { id: 2, type: "Blue", emoji: "🔵", color: "blue", power: "Triple Shot", used: false },
      { id: 3, type: "Yellow", emoji: "🟡", color: "yellow", power: "Speed Boost", used: false },
      { id: 4, type: "Green", emoji: "🟢", color: "green", power: "Boomerang", used: false },
    ])
    setPigs([
      {
        id: 1,
        position: { x: 70, y: 60 },
        health: 100,
        maxHealth: 100,
        color: "red",
        emoji: "🔴",
        question: pigQuestions[0],
        destroyed: false,
      },
      {
        id: 2,
        position: { x: 85, y: 40 },
        health: 100,
        maxHealth: 100,
        color: "blue",
        emoji: "🔵",
        question: pigQuestions[1],
        destroyed: false,
      },
      {
        id: 3,
        position: { x: 75, y: 80 },
        health: 100,
        maxHealth: 100,
        color: "yellow",
        emoji: "🟡",
        question: pigQuestions[2],
        destroyed: false,
      },
      {
        id: 4,
        position: { x: 90, y: 70 },
        health: 100,
        maxHealth: 100,
        color: "green",
        emoji: "🟢",
        question: pigQuestions[3],
        destroyed: false,
      },
    ])
    setCurrentBird(0)
    setTargetPig(null)
    setShowQuestion(false)
    setGameWon(false)
    setGameOver(false)
    setScore(0)
    setGameStarted(false)
    setShooting(false)
  }

  if (gameWon || gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">{gameWon ? "🎉" : "😢"}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{gameWon ? "Victory!" : "Game Over!"}</h2>
            <p className="text-lg text-gray-600 mb-4">Final Score: {score} points</p>
            <p className="text-md text-gray-600 mb-6">
              {gameWon
                ? "You destroyed all the Constitution-stealing pigs!"
                : "The pigs escaped with the Constitution! Try again!"}
            </p>
            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
                🎮 Play Again
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
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
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
            <h1 className="text-2xl font-bold text-gray-800">🐦 Constitutional Birds</h1>
            <div className="text-lg font-semibold text-gray-700">Score: {score}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🐦</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Constitutional Birds</h2>
                <p className="text-lg text-gray-600 mb-6">
                  The evil pigs have stolen parts of the Constitution! Use your knowledge birds to answer questions
                  correctly and destroy the pigs to save our Constitution!
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-blue-800 mb-2">How to Play:</h3>
                  <ul className="text-left text-blue-700 space-y-1">
                    <li>🎯 Click on pigs to target them with your birds</li>
                    <li>❓ Answer Constitution questions correctly to destroy pigs</li>
                    <li>🌈 Match bird colors with pig colors for bonus points!</li>
                    <li>🏆 Destroy all pigs to win and save the Constitution!</li>
                  </ul>
                </div>
                <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                  🚀 Start Mission!
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Game Area */}
            <Card className="bg-white/95 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-center">🏛️ Save the Constitution!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg overflow-hidden">
                  {/* Slingshot */}
                  <div className="absolute left-4 bottom-4">
                    <div className="text-6xl">🏹</div>
                    <div className="text-sm text-center font-bold">Slingshot</div>
                  </div>

                  {/* Current Bird */}
                  <div className="absolute left-16 bottom-8">
                    <div className="text-4xl animate-bounce">
                      {birds[currentBird] && !birds[currentBird].used ? birds[currentBird].emoji : ""}
                    </div>
                  </div>

                  {/* Pigs with different colors */}
                  {pigs.map((pig) => (
                    <div
                      key={pig.id}
                      className={`absolute cursor-pointer transition-all duration-300 ${
                        pig.destroyed ? "opacity-0" : "opacity-100"
                      }`}
                      style={{ left: `${pig.position.x}%`, top: `${pig.position.y}%` }}
                      onClick={() => !pig.destroyed && shootBird(pig.id)}
                    >
                      <div className="relative">
                        <div className={`text-4xl ${shooting && targetPig?.id === pig.id ? "animate-pulse" : ""}`}>
                          {pig.destroyed ? "💥" : pig.emoji}
                        </div>
                        {!pig.destroyed && pig.health < pig.maxHealth && (
                          <div className="absolute -top-2 left-0 w-12 h-1 bg-gray-300 rounded">
                            <div
                              className="h-full bg-red-500 rounded"
                              style={{ width: `${(pig.health / pig.maxHealth) * 100}%` }}
                            ></div>
                          </div>
                        )}
                        {/* Color indicator */}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className={`w-2 h-2 rounded-full bg-${pig.color}-500`}></div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Structures */}
                  <div className="absolute right-8 bottom-4 text-6xl">🏛️</div>
                  <div className="absolute right-20 bottom-12 text-4xl">📜</div>
                </div>
              </CardContent>
            </Card>

            {/* Birds Panel */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Your Constitutional Birds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {birds.map((bird, index) => (
                    <div
                      key={bird.id}
                      className={`p-4 rounded-lg border-2 text-center ${
                        index === currentBird
                          ? "border-blue-500 bg-blue-50"
                          : bird.used
                            ? "border-gray-300 bg-gray-100 opacity-50"
                            : "border-gray-300"
                      }`}
                    >
                      <div className="text-4xl mb-2">{bird.emoji}</div>
                      <div className="font-bold text-sm">{bird.type} Bird</div>
                      <div className="text-xs text-gray-600">{bird.power}</div>
                      <div className="text-xs text-gray-500 mt-1">Matches: {bird.color} pigs</div>
                      {bird.used && <div className="text-xs text-red-600 mt-1">Used</div>}
                      {index === currentBird && !bird.used && (
                        <div className="text-xs text-blue-600 mt-1 font-bold">Ready!</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Strategy Tip:</strong> Match bird colors with pig colors for bonus damage and points!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Question Modal */}
      {showQuestion && targetPig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                🎯 Constitutional Challenge!
                {birds[currentBird] && birds[currentBird].color === targetPig.color && (
                  <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    🌟 Color Match Bonus!
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{targetPig.question.question}</p>
              <div className="space-y-3">
                {targetPig.question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto hover:bg-blue-50 bg-transparent"
                    onClick={() => answerQuestion(index)}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🎯 <strong>Aim carefully:</strong> Answer correctly to destroy the pig completely! Color matching
                  gives bonus damage!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
