"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Clock, Star } from "lucide-react"

interface MemoryCard {
  id: number
  content: string
  type: "article" | "description"
  matched: boolean
  flipped: boolean
  pair: number
}

const cardPairs = [
  { article: "Article 14", description: "Right to Equality" },
  { article: "Article 19", description: "Freedom of Speech" },
  { article: "Article 21", description: "Right to Life" },
  { article: "Article 25", description: "Freedom of Religion" },
  { article: "Article 32", description: "Right to Constitutional Remedies" },
  { article: "Article 21A", description: "Right to Education" },
  { article: "Article 15", description: "Prohibition of Discrimination" },
  { article: "Article 17", description: "Abolition of Untouchability" },
]

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (gameStarted && !gameWon) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameWon])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((card) => card.id === first)
      const secondCard = cards.find((card) => card.id === second)

      if (firstCard && secondCard && firstCard.pair === secondCard.pair) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, matched: true } : card)),
          )
          setMatchedPairs((prev) => prev + 1)
          setFlippedCards([])
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, flipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (matchedPairs === cardPairs.length) {
      setGameWon(true)
    }
  }, [matchedPairs])

  const initializeGame = () => {
    const gameCards: MemoryCard[] = []

    cardPairs.forEach((pair, index) => {
      gameCards.push({
        id: index * 2,
        content: pair.article,
        type: "article",
        matched: false,
        flipped: false,
        pair: index,
      })
      gameCards.push({
        id: index * 2 + 1,
        content: pair.description,
        type: "description",
        matched: false,
        flipped: false,
        pair: index,
      })
    })

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) setGameStarted(true)

    if (flippedCards.length === 2) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.flipped || card.matched) return

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c)))
    setFlippedCards((prev) => [...prev, cardId])
  }

  const resetGame = () => {
    setMatchedPairs(0)
    setMoves(0)
    setTimeElapsed(0)
    setGameWon(false)
    setGameStarted(false)
    setFlippedCards([])
    initializeGame()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStarRating = () => {
    if (moves <= 20) return 3
    if (moves <= 30) return 2
    return 1
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Excellent Memory!</h2>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{moves}</div>
                  <div className="text-sm">Moves</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
                  <div className="text-sm">Time</div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < getStarRating() ? "text-yellow-300 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
                🔄 Play Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/games">🏠 Back to Games</Link>
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
              <Link href="/games">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Games
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">🧠 Memory Match</h1>
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeElapsed)}
              </div>
              <div>Moves: {moves}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Stats */}
          <Card className="bg-white/95 backdrop-blur-sm mb-8">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{matchedPairs}</div>
                  <div className="text-sm text-gray-600">Pairs Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{cardPairs.length - matchedPairs}</div>
                  <div className="text-sm text-gray-600">Pairs Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((matchedPairs / cardPairs.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Instructions */}
          {!gameStarted && (
            <Card className="bg-white/95 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-center">🎯 How to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg mb-4">Match Constitutional Articles with their descriptions!</p>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">📜 Articles</h4>
                    <p className="text-sm text-blue-700">Constitutional article numbers like "Article 14"</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">📝 Descriptions</h4>
                    <p className="text-sm text-green-700">What each article means like "Right to Equality"</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">Click on cards to flip them and find matching pairs!</p>
              </CardContent>
            </Card>
          )}

          {/* Game Board */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Constitutional Memory Game</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`aspect-square cursor-pointer transition-all duration-300 ${
                      card.flipped || card.matched ? "transform-none" : "transform"
                    }`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div
                      className={`w-full h-full rounded-lg border-2 flex items-center justify-center text-center p-2 transition-all duration-300 ${
                        card.flipped || card.matched
                          ? card.type === "article"
                            ? "bg-blue-500 text-white border-blue-600"
                            : "bg-green-500 text-white border-green-600"
                          : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                      } ${card.matched ? "opacity-75 ring-2 ring-yellow-400" : ""}`}
                    >
                      {card.flipped || card.matched ? (
                        <div className="text-sm font-semibold">{card.content}</div>
                      ) : (
                        <div className="text-4xl">🧠</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <div className="text-center mt-8">
            <Button onClick={resetGame} variant="outline" className="bg-white/20 text-white border-white">
              🔄 Reset Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
