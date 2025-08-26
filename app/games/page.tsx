"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Gamepad2, Trophy, Users, Zap } from "lucide-react"

const games = [
  // {
  //   id: "snake-ladder",
  //   title: "🐍 Constitutional Snakes & Ladders",
  //   description:
  //     "Climb ladders with correct answers, avoid snakes with wrong ones! Learn about rights and duties while racing to the top.",
  //   difficulty: "Easy",
  //   players: "1-2 Players",
  //   time: "10-15 mins",
  //   color: "from-green-400 to-blue-500",
  //   features: ["Smart Bot Opponent", "Constitution Questions", "Classic Board Game"],
  // },
  {
    id: "ludo",
    title: "🎲 Constitutional Ludo",
    description: "Answer governance questions to move your pieces around the board. Get all pieces home first to win!",
    difficulty: "Medium",
    players: "1-2 Players",
    time: "15-20 mins",
    color: "from-yellow-400 to-orange-500",
    features: ["Turn-based Strategy", "Government Questions", "Responsive Bot AI"],
  },
  {
    id: "car-race",
    title: "🏎️ Constitutional Car Race",
    description: "Race against the bot by answering questions about rights and duties. Speed up with correct answers!",
    difficulty: "Medium",
    players: "1-2 Players",
    time: "8-12 mins",
    color: "from-blue-400 to-purple-500",
    features: ["Real-time Racing", "Speed Boosts", "Turn-based Questions"],
  },
  {
    id: "angry-birds",
    title: "🐦 Constitutional Birds",
    description: "Launch birds at pigs to save the Constitution! Match bird colors with pig colors for bonus points.",
    difficulty: "Easy",
    players: "Single Player",
    time: "5-10 mins",
    color: "from-sky-400 to-indigo-500",
    features: ["Physics-based Gameplay", "Color Matching", "Constitution Rescue Mission"],
  },
  {
    id: "cricket",
    title: "🏏 Constitutional Cricket",
    description:
      "Play cricket by answering Constitution questions! Score runs with correct answers in this 2-over match.",
    difficulty: "Hard",
    players: "1-2 Players",
    time: "12-18 mins",
    color: "from-green-400 to-teal-500",
    features: ["Cricket Simulation", "2-over Format", "Smart Bot Opponent"],
  },
  {
    id: "memory-match",
    title: "🧠 Constitutional Memory Match",
    description: "Match pairs of Constitution-related cards. Test your memory while learning about Indian governance!",
    difficulty: "Easy",
    players: "Single Player",
    time: "5-8 mins",
    color: "from-pink-400 to-rose-500",
    features: ["Memory Training", "Constitution Facts", "Progressive Difficulty"],
  },
  {
    id: "preamble-puzzle",
    title: "🧩 Preamble Puzzle",
    description: "Arrange the words of the Preamble in correct order. Learn the opening lines of our Constitution!",
    difficulty: "Medium",
    players: "Single Player",
    time: "3-7 mins",
    color: "from-purple-400 to-pink-500",
    features: ["Word Arrangement", "Preamble Learning", "Timed Challenge"],
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">🎮 Constitutional Games</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Learn Through Play! 🎮</h2>
        <p className="text-xl text-white/90 drop-shadow mb-8">
          Master the Constitution through exciting games with smart AI opponents and interactive challenges!
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-white/90">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5" />
            <span>Fun Games</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Smart Bot Opponents</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Educational & Fun</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Real-time AI</span>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${game.color}`}></div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{game.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{game.difficulty}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{game.players}</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{game.time}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{game.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {game.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white border-0`}
                >
                  <Link href={`/games/${game.id}`}>🎮 Play Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-6">🤖 Smart AI Gaming Experience</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold mb-2">Intelligent Bots</h4>
                <p className="text-sm text-white/90">
                  Our AI opponents adapt to your skill level and provide realistic gameplay with strategic thinking
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold mb-2">Real-time Response</h4>
                <p className="text-sm text-white/90">
                  Bots respond instantly with human-like timing, making games feel natural and engaging
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-bold mb-2">Educational Content</h4>
                <p className="text-sm text-white/90">
                  Every game teaches Constitution concepts while keeping you entertained and motivated
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
