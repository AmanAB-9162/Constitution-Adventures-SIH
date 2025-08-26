"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Trophy, Star } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Player {
  id: string
  name: string
  position: number
  color: string
  score: number
}

interface GameState {
  currentPlayer: number
  players: Player[]
  diceValue: number
  gameStatus: "waiting" | "playing" | "finished"
  showQuestion: boolean
  currentQuestion: Question | null
  gameHistory: string[]
  winner: string | null
}

const questions: Question[] = [
  {
    id: 1,
    question: "How many fundamental rights are there in the Indian Constitution?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    explanation:
      "There are 6 fundamental rights in the Indian Constitution: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
  },
  {
    id: 2,
    question: "Who is known as the 'Father of the Indian Constitution'?",
    options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
    correct: 1,
    explanation:
      "Dr. B.R. Ambedkar is known as the 'Father of the Indian Constitution' for his pivotal role as the Chairman of the Drafting Committee.",
  },
  {
    id: 3,
    question: "In which year was the Indian Constitution adopted?",
    options: ["1947", "1949", "1950", "1951"],
    correct: 1,
    explanation: "The Indian Constitution was adopted on November 26, 1949, and came into effect on January 26, 1950.",
  },
  {
    id: 4,
    question: "How many fundamental duties are mentioned in the Constitution?",
    options: ["10", "11", "12", "13"],
    correct: 1,
    explanation: "There are 11 fundamental duties mentioned in Article 51A of the Indian Constitution.",
  },
  {
    id: 5,
    question: "Which article is known as the 'Heart and Soul' of the Constitution?",
    options: ["Article 14", "Article 19", "Article 21", "Article 32"],
    correct: 3,
    explanation:
      "Article 32 (Right to Constitutional Remedies) is known as the 'Heart and Soul' of the Constitution as it provides the right to approach the Supreme Court for enforcement of fundamental rights.",
  },
]

const snakes = [
  { start: 99, end: 54 },
  { start: 95, end: 67 },
  { start: 88, end: 24 },
  { start: 62, end: 18 },
  { start: 48, end: 26 },
  { start: 36, end: 6 },
  { start: 32, end: 10 },
]

const ladders = [
  { start: 4, end: 56 },
  { start: 12, end: 50 },
  { start: 14, end: 55 },
  { start: 22, end: 58 },
  { start: 41, end: 79 },
  { start: 54, end: 88 },
  { start: 63, end: 81 },
  { start: 70, end: 90 },
]

const getDiceIcon = (value: number) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
  const Icon = icons[value - 1]
  return <Icon className="w-8 h-8" />
}

export default function SnakeLadderGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    players: [
      { id: "human", name: "You", position: 0, color: "bg-blue-500", score: 0 },
      { id: "bot", name: "ConstituBot", position: 0, color: "bg-red-500", score: 0 },
    ],
    diceValue: 1,
    gameStatus: "waiting",
    showQuestion: false,
    currentQuestion: null,
    gameHistory: [],
    winner: null,
  })

  const [isRolling, setIsRolling] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [botThinking, setBotThinking] = useState(false)

  // Bot dice rolling logic
  useEffect(() => {
    if (gameState.gameStatus === "playing" && gameState.currentPlayer === 1 && !gameState.showQuestion && !isRolling) {
      const timer = setTimeout(() => {
        rollDice()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [gameState.currentPlayer, gameState.showQuestion, gameState.gameStatus, isRolling])

  // Bot question answering logic
  useEffect(() => {
    if (
      gameState.showQuestion &&
      gameState.currentPlayer === 1 &&
      gameState.currentQuestion &&
      !showAnswer &&
      !botThinking
    ) {
      setBotThinking(true)

      const timer = setTimeout(() => {
        handleBotAnswer()
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [gameState.showQuestion, gameState.currentPlayer, showAnswer, botThinking])

  const rollDice = () => {
    if (isRolling || gameState.gameStatus !== "playing") return

    setIsRolling(true)

    // Simulate dice rolling animation
    let rollCount = 0
    const rollInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1
      setGameState((prev) => ({ ...prev, diceValue: randomValue }))
      rollCount++

      if (rollCount >= 10) {
        clearInterval(rollInterval)
        const finalValue = Math.floor(Math.random() * 6) + 1

        setGameState((prev) => ({
          ...prev,
          diceValue: finalValue,
          gameHistory: [...prev.gameHistory, `${prev.players[prev.currentPlayer].name} rolled ${finalValue}`],
        }))

        setIsRolling(false)

        // Show question after dice roll
        setTimeout(() => {
          showRandomQuestion()
        }, 1000)
      }
    }, 100)
  }

  const showRandomQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    setGameState((prev) => ({
      ...prev,
      showQuestion: true,
      currentQuestion: randomQuestion,
    }))
    setSelectedAnswer(null)
    setShowAnswer(false)
    setBotThinking(false)
  }

  const handleBotAnswer = () => {
    if (!gameState.currentQuestion) return

    // Bot has 70% chance of getting the answer right
    const isCorrect = Math.random() < 0.7
    const botAnswer = isCorrect ? gameState.currentQuestion.correct : Math.floor(Math.random() * 4)

    setSelectedAnswer(botAnswer)
    setShowAnswer(true)
    setBotThinking(false)

    setTimeout(() => {
      handleAnswerSubmit(botAnswer)
    }, 2000)
  }

  const handleAnswerSubmit = (answerIndex: number) => {
    if (!gameState.currentQuestion) return

    const isCorrect = answerIndex === gameState.currentQuestion.correct
    const currentPlayer = gameState.players[gameState.currentPlayer]

    if (isCorrect) {
      movePlayer(gameState.diceValue)
      setGameState((prev) => ({
        ...prev,
        players: prev.players.map((p) => (p.id === currentPlayer.id ? { ...p, score: p.score + 10 } : p)),
        gameHistory: [...prev.gameHistory, `${currentPlayer.name} answered correctly! +10 points`],
      }))
    } else {
      setGameState((prev) => ({
        ...prev,
        gameHistory: [...prev.gameHistory, `${currentPlayer.name} answered incorrectly. No movement.`],
      }))
      switchTurn()
    }

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        showQuestion: false,
        currentQuestion: null,
      }))
      setShowAnswer(false)
      setSelectedAnswer(null)
      setBotThinking(false)
    }, 3000)
  }

  const movePlayer = (steps: number) => {
    const currentPlayer = gameState.players[gameState.currentPlayer]
    let newPosition = currentPlayer.position + steps

    // Check if player reaches or exceeds 100
    if (newPosition >= 100) {
      newPosition = 100
      setGameState((prev) => ({
        ...prev,
        players: prev.players.map((p) => (p.id === currentPlayer.id ? { ...p, position: newPosition } : p)),
        gameStatus: "finished",
        winner: currentPlayer.name,
        gameHistory: [...prev.gameHistory, `🎉 ${currentPlayer.name} wins the game!`],
      }))
      return
    }

    // Check for snakes
    const snake = snakes.find((s) => s.start === newPosition)
    if (snake) {
      newPosition = snake.end
      setGameState((prev) => ({
        ...prev,
        gameHistory: [
          ...prev.gameHistory,
          `🐍 ${currentPlayer.name} got bitten by a snake! Slid down to ${newPosition}`,
        ],
      }))
    }

    // Check for ladders
    const ladder = ladders.find((l) => l.start === newPosition)
    if (ladder) {
      newPosition = ladder.end
      setGameState((prev) => ({
        ...prev,
        gameHistory: [...prev.gameHistory, `🪜 ${currentPlayer.name} climbed a ladder! Moved up to ${newPosition}`],
      }))
    }

    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === currentPlayer.id ? { ...p, position: newPosition } : p)),
    }))

    setTimeout(() => {
      switchTurn()
    }, 1000)
  }

  const switchTurn = () => {
    setGameState((prev) => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 0 ? 1 : 0,
    }))
  }

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: "playing",
      gameHistory: ["🎮 Game Started! Roll the dice to begin your constitutional journey!"],
    }))
  }

  const resetGame = () => {
    setGameState({
      currentPlayer: 0,
      players: [
        { id: "human", name: "You", position: 0, color: "bg-blue-500", score: 0 },
        { id: "bot", name: "ConstituBot", position: 0, color: "bg-red-500", score: 0 },
      ],
      diceValue: 1,
      gameStatus: "waiting",
      showQuestion: false,
      currentQuestion: null,
      gameHistory: [],
      winner: null,
    })
    setShowAnswer(false)
    setSelectedAnswer(null)
    setBotThinking(false)
  }

  const renderBoard = () => {
    const cells = []
    for (let i = 100; i >= 1; i--) {
      const row = Math.floor((100 - i) / 10)
      const isEvenRow = row % 2 === 0
      const cellIndex = isEvenRow ? i : 100 - ((i - 1) % 10) * 2 - ((i - 1) % 10)

      const player1Here = gameState.players[0].position === i
      const player2Here = gameState.players[1].position === i

      const snake = snakes.find((s) => s.start === i)
      const ladder = ladders.find((l) => l.start === i)

      cells.push(
        <div
          key={i}
          className={`
            relative w-12 h-12 border border-gray-300 flex items-center justify-center text-xs font-bold
            ${snake ? "bg-red-100" : ladder ? "bg-green-100" : "bg-white"}
            ${i === 100 ? "bg-yellow-200" : ""}
          `}
        >
          <span className="absolute top-0 left-1 text-[10px] text-gray-600">{i}</span>

          {snake && <span className="text-red-600">🐍</span>}
          {ladder && <span className="text-green-600">🪜</span>}
          {i === 100 && <span className="text-yellow-600">👑</span>}

          <div className="absolute bottom-1 right-1 flex gap-1">
            {player1Here && (
              <div className={`w-3 h-3 rounded-full ${gameState.players[0].color} border border-white`} />
            )}
            {player2Here && (
              <div className={`w-3 h-3 rounded-full ${gameState.players[1].color} border border-white`} />
            )}
          </div>
        </div>,
      )
    }
    return cells
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Constitutional Snakes & Ladders</h1>
          </div>

          {gameState.gameStatus === "finished" && (
            <div className="flex items-center gap-2 text-green-600">
              <Trophy className="w-6 h-6" />
              <span className="font-bold">{gameState.winner} Wins!</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Game Board</span>
                  <Badge variant={gameState.gameStatus === "playing" ? "default" : "secondary"}>
                    {gameState.gameStatus === "waiting" && "Ready to Start"}
                    {gameState.gameStatus === "playing" && `${gameState.players[gameState.currentPlayer].name}'s Turn`}
                    {gameState.gameStatus === "finished" && "Game Over"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-10 gap-1 mb-4 max-w-2xl mx-auto">{renderBoard()}</div>

                {/* Game Controls */}
                <div className="flex flex-col items-center gap-4">
                  {gameState.gameStatus === "waiting" && (
                    <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                      Start Constitutional Journey
                    </Button>
                  )}

                  {gameState.gameStatus === "playing" && (
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Dice</div>
                        <div className={`p-4 rounded-lg border-2 ${isRolling ? "animate-bounce" : ""}`}>
                          {getDiceIcon(gameState.diceValue)}
                        </div>
                      </div>

                      {gameState.currentPlayer === 0 && !gameState.showQuestion && (
                        <Button onClick={rollDice} disabled={isRolling} className="bg-blue-600 hover:bg-blue-700">
                          {isRolling ? "Rolling..." : "Roll Dice"}
                        </Button>
                      )}

                      {gameState.currentPlayer === 1 && !gameState.showQuestion && (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Bot's Turn</div>
                          <div className="text-blue-600 font-medium">Rolling dice...</div>
                        </div>
                      )}
                    </div>
                  )}

                  {gameState.gameStatus === "finished" && (
                    <Button onClick={resetGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
                      Play Again
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Status */}
            <Card>
              <CardHeader>
                <CardTitle>Player Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameState.players.map((player, index) => (
                  <div key={player.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${player.color}`} />
                        <span className="font-medium">{player.name}</span>
                        {gameState.currentPlayer === index && gameState.gameStatus === "playing" && (
                          <Badge variant="outline" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Position: {player.position}/100</div>
                        <div className="text-sm text-blue-600">Score: {player.score}</div>
                      </div>
                    </div>
                    <Progress value={player.position} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Game History */}
            <Card>
              <CardHeader>
                <CardTitle>Game History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {gameState.gameHistory.map((event, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                      {event}
                    </div>
                  ))}
                  {gameState.gameHistory.length === 0 && (
                    <div className="text-sm text-gray-500 italic">
                      Roll the dice to start your constitutional journey!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Question Modal */}
        {gameState.showQuestion && gameState.currentQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {gameState.currentPlayer === 1 && botThinking ? (
                    <>Bot is thinking... 🤖</>
                  ) : (
                    <>
                      <Star className="w-5 h-5 text-yellow-500" />
                      Constitutional Question
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg font-medium">{gameState.currentQuestion.question}</div>

                <div className="grid grid-cols-1 gap-3">
                  {gameState.currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedAnswer === index
                          ? showAnswer
                            ? index === gameState.currentQuestion!.correct
                              ? "default"
                              : "destructive"
                            : "default"
                          : "outline"
                      }
                      className={`justify-start text-left h-auto p-4 ${
                        showAnswer && index === gameState.currentQuestion!.correct
                          ? "bg-green-100 border-green-500 text-green-700"
                          : ""
                      }`}
                      onClick={() => {
                        if (gameState.currentPlayer === 0 && !showAnswer) {
                          setSelectedAnswer(index)
                          setShowAnswer(true)
                          setTimeout(() => handleAnswerSubmit(index), 2000)
                        }
                      }}
                      disabled={gameState.currentPlayer === 1 || showAnswer}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                {showAnswer && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 mb-2">Explanation:</div>
                    <div className="text-blue-700">{gameState.currentQuestion.explanation}</div>
                  </div>
                )}

                {gameState.currentPlayer === 1 && botThinking && (
                  <div className="text-center text-blue-600">💡 Tip: Bot is selecting an answer...</div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
