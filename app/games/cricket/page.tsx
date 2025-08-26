"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Player {
  name: string
  runs: number
  balls: number
  isOut: boolean
}

interface Team {
  name: string
  players: Player[]
  totalRuns: number
  wickets: number
  overs: number
  balls: number
}

const questions: Question[] = [
  {
    question: "What is the supreme law of India?",
    options: ["Parliament Act", "Constitution", "Supreme Court", "President's Rule"],
    correct: 1,
    explanation: "The Constitution is the supreme law that governs India.",
  },
  {
    question: "How many fundamental rights are there?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    explanation: "There are 6 fundamental rights in the Indian Constitution.",
  },
  {
    question: "Who is the head of the Indian judiciary?",
    options: ["President", "Prime Minister", "Chief Justice", "Attorney General"],
    correct: 2,
    explanation: "The Chief Justice of India is the head of the Indian judiciary.",
  },
  {
    question: "What does 'Democratic' mean in our Constitution?",
    options: ["Rule by king", "Rule by people", "Rule by army", "Rule by rich"],
    correct: 1,
    explanation: "Democratic means the government is chosen by the people through elections.",
  },
  {
    question: "At what age can you vote in India?",
    options: ["16", "17", "18", "21"],
    correct: 2,
    explanation: "Citizens can vote from the age of 18 years in India.",
  },
  {
    question: "How many states are there in India?",
    options: ["27", "28", "29", "30"],
    correct: 1,
    explanation: "India has 28 states and 8 union territories.",
  },
]

export default function CricketGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentInning, setCurrentInning] = useState(1)
  const [batting, setBatting] = useState<"player" | "bot">("player")
  const [showQuestion, setShowQuestion] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [gameWon, setGameWon] = useState(false)
  const [winner, setWinner] = useState("")
  const [botThinking, setBotThinking] = useState(false)

  const [playerTeam, setPlayerTeam] = useState<Team>({
    name: "Your Team",
    players: [{ name: "You", runs: 0, balls: 0, isOut: false }],
    totalRuns: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  })

  const [botTeam, setBotTeam] = useState<Team>({
    name: "Bot Team",
    players: [{ name: "Bot", runs: 0, balls: 0, isOut: false }],
    totalRuns: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  })

  const maxOvers = 2
  const maxBalls = maxOvers * 6

  // Bot auto-play effect
  useEffect(() => {
    if (batting === "bot" && gameStarted && !gameWon && !showQuestion) {
      const timer = setTimeout(() => {
        playBall()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [batting, gameStarted, gameWon, showQuestion, botTeam.balls])

  // Bot auto-answer effect
  useEffect(() => {
    if (showQuestion && batting === "bot" && currentQuestion) {
      setBotThinking(true)
      const timer = setTimeout(() => {
        handleBotAnswer()
        setBotThinking(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showQuestion, batting, currentQuestion])

  const startGame = () => {
    setGameStarted(true)
    setBatting("player")
    setCurrentInning(1)
  }

  const playBall = () => {
    if (!gameStarted || gameWon) return

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    setCurrentQuestion(randomQuestion)
    setShowQuestion(true)
  }

  const handleBotAnswer = () => {
    if (!currentQuestion) return

    // Bot has 60% chance to answer correctly
    const botAnswerCorrectly = Math.random() < 0.6
    const botAnswer = botAnswerCorrectly
      ? currentQuestion.correct
      : Math.floor(Math.random() * currentQuestion.options.length)

    answerQuestion(botAnswer)
  }

  const answerQuestion = (answerIndex: number) => {
    if (!currentQuestion) return

    const isCorrect = answerIndex === currentQuestion.correct
    setShowQuestion(false)

    if (batting === "player") {
      updatePlayerScore(isCorrect)
    } else {
      updateBotScore(isCorrect)
    }

    setCurrentQuestion(null)
  }

  const updatePlayerScore = (isCorrect: boolean) => {
    setPlayerTeam((prev) => {
      const newTeam = { ...prev }
      newTeam.balls += 1
      newTeam.overs = Math.floor(newTeam.balls / 6)

      if (isCorrect) {
        const runs = Math.floor(Math.random() * 6) + 1 // 1-6 runs
        newTeam.totalRuns += runs
        newTeam.players[0].runs += runs
      } else {
        // Wrong answer might result in getting out (30% chance)
        if (Math.random() < 0.3) {
          newTeam.wickets += 1
          newTeam.players[0].isOut = true
        }
      }

      newTeam.players[0].balls += 1

      // Check if innings is over
      if (newTeam.balls >= maxBalls || newTeam.wickets >= 1) {
        if (currentInning === 1) {
          setCurrentInning(2)
          setBatting("bot")
        } else {
          endGame()
        }
      }

      return newTeam
    })
  }

  const updateBotScore = (isCorrect: boolean) => {
    setBotTeam((prev) => {
      const newTeam = { ...prev }
      newTeam.balls += 1
      newTeam.overs = Math.floor(newTeam.balls / 6)

      if (isCorrect) {
        const runs = Math.floor(Math.random() * 6) + 1 // 1-6 runs
        newTeam.totalRuns += runs
        newTeam.players[0].runs += runs

        // Check if bot wins by chasing the target
        if (currentInning === 2 && newTeam.totalRuns > playerTeam.totalRuns) {
          setWinner("Bot Team")
          setGameWon(true)
          return newTeam
        }
      } else {
        // Wrong answer might result in getting out (40% chance for bot)
        if (Math.random() < 0.4) {
          newTeam.wickets += 1
          newTeam.players[0].isOut = true
        }
      }

      newTeam.players[0].balls += 1

      // Check if innings is over
      if (newTeam.balls >= maxBalls || newTeam.wickets >= 1) {
        endGame()
      }

      return newTeam
    })
  }

  const endGame = () => {
    if (currentInning === 1) {
      // First innings over, start second innings
      setCurrentInning(2)
      setBatting("bot")
    } else {
      // Game over, determine winner
      if (playerTeam.totalRuns > botTeam.totalRuns) {
        setWinner("Your Team")
      } else if (botTeam.totalRuns > playerTeam.totalRuns) {
        setWinner("Bot Team")
      } else {
        setWinner("Tie")
      }
      setGameWon(true)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentInning(1)
    setBatting("player")
    setShowQuestion(false)
    setCurrentQuestion(null)
    setGameWon(false)
    setWinner("")
    setBotThinking(false)
    setPlayerTeam({
      name: "Your Team",
      players: [{ name: "You", runs: 0, balls: 0, isOut: false }],
      totalRuns: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
    })
    setBotTeam({
      name: "Bot Team",
      players: [{ name: "Bot", runs: 0, balls: 0, isOut: false }],
      totalRuns: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
    })
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {winner === "Your Team" ? "🎉 You Win!" : winner === "Bot Team" ? "🤖 Bot Wins!" : "🤝 It's a Tie!"}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Final Score:</h3>
              <p>
                Your Team: {playerTeam.totalRuns}/{playerTeam.wickets} ({playerTeam.overs}.{playerTeam.balls % 6} overs)
              </p>
              <p>
                Bot Team: {botTeam.totalRuns}/{botTeam.wickets} ({botTeam.overs}.{botTeam.balls % 6} overs)
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
                🏏 Play Again
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
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
            <h1 className="text-2xl font-bold text-gray-800">🏏 Constitutional Cricket</h1>
            <div className="text-lg font-semibold text-gray-700">Innings {currentInning}/2</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🏏</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Constitutional Cricket</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Play cricket by answering Constitution questions! Score runs with correct answers and try to beat the
                  bot team!
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-blue-800 mb-2">How to Play:</h3>
                  <ul className="text-left text-blue-700 space-y-1">
                    <li>🏏 2 overs per team (12 balls each)</li>
                    <li>❓ Answer questions correctly to score runs</li>
                    <li>❌ Wrong answers might get you out</li>
                    <li>🏆 Highest score wins the match!</li>
                    <li>🤖 Bot will play after your innings</li>
                  </ul>
                </div>
                <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                  🚀 Start Match!
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Scoreboard */}
            <Card className="bg-white/95 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-center">🏏 Scoreboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className={`p-4 rounded-lg ${batting === "player" ? "bg-blue-100 border-2 border-blue-500" : "bg-gray-50"}`}
                  >
                    <h3 className="font-bold text-lg mb-2">Your Team {batting === "player" && "(Batting)"}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {playerTeam.totalRuns}/{playerTeam.wickets}
                    </div>
                    <div className="text-sm text-gray-600">
                      Overs: {playerTeam.overs}.{playerTeam.balls % 6}/{maxOvers}
                    </div>
                    <div className="text-sm text-gray-600">
                      You: {playerTeam.players[0].runs} runs ({playerTeam.players[0].balls} balls)
                      {playerTeam.players[0].isOut && " - OUT"}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${batting === "bot" ? "bg-red-100 border-2 border-red-500" : "bg-gray-50"}`}
                  >
                    <h3 className="font-bold text-lg mb-2">
                      Bot Team {batting === "bot" && "(Batting)"}
                      {batting === "bot" && botThinking && (
                        <span className="ml-2 text-sm text-blue-600 animate-pulse">🤔 Thinking...</span>
                      )}
                    </h3>
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {botTeam.totalRuns}/{botTeam.wickets}
                    </div>
                    <div className="text-sm text-gray-600">
                      Overs: {botTeam.overs}.{botTeam.balls % 6}/{maxOvers}
                    </div>
                    <div className="text-sm text-gray-600">
                      Bot: {botTeam.players[0].runs} runs ({botTeam.players[0].balls} balls)
                      {botTeam.players[0].isOut && " - OUT"}
                    </div>
                  </div>
                </div>

                {currentInning === 2 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
                    <p className="text-yellow-800">
                      <strong>Target:</strong>{" "}
                      {batting === "bot"
                        ? `Bot needs ${playerTeam.totalRuns + 1} runs to win`
                        : `You need ${botTeam.totalRuns + 1} runs to win`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cricket Field */}
            <Card className="bg-white/95 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-center">🏏 Cricket Field</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gradient-to-b from-green-300 to-green-400 rounded-lg overflow-hidden">
                  {/* Cricket pitch */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-4 bg-yellow-200 rounded"></div>

                  {/* Wickets */}
                  <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 text-2xl">🏏</div>
                  <div className="absolute top-1/2 right-1/3 transform -translate-y-1/2 text-2xl">🏏</div>

                  {/* Players */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl">
                    {batting === "player" ? "🏃‍♂️" : "🤖"}
                  </div>

                  {/* Fielders */}
                  <div className="absolute top-4 left-4 text-2xl">👤</div>
                  <div className="absolute top-4 right-4 text-2xl">👤</div>
                  <div className="absolute bottom-4 left-4 text-2xl">👤</div>
                  <div className="absolute bottom-4 right-4 text-2xl">👤</div>
                </div>
              </CardContent>
            </Card>

            {/* Game Controls */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{batting === "player" ? "Your Turn to Bat" : "Bot is Batting"}</CardTitle>
              </CardHeader>
              <CardContent>
                {batting === "player" && !showQuestion && (
                  <div className="text-center">
                    <Button onClick={playBall} size="lg" className="bg-blue-600 hover:bg-blue-700">
                      🏏 Face the Ball
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Click to face the next ball and answer a Constitution question!
                    </p>
                  </div>
                )}

                {batting === "bot" && !showQuestion && (
                  <div className="text-center">
                    <div className="text-lg text-gray-600">🤖 Bot is preparing to face the ball...</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Question Modal */}
      {showQuestion && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl">
                🏏 Cricket Question!
                {batting === "bot" && botThinking && (
                  <div className="text-sm text-blue-600 mt-2 animate-pulse">Bot is analyzing the question...</div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{currentQuestion.question}</p>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto hover:bg-blue-50 bg-transparent"
                    onClick={() => batting === "player" && answerQuestion(index)}
                    disabled={batting === "bot" || botThinking}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🏏 <strong>Cricket Tip:</strong>{" "}
                  {batting === "player"
                    ? "Answer correctly to score runs! Wrong answers might get you out."
                    : "Bot is selecting an answer..."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
