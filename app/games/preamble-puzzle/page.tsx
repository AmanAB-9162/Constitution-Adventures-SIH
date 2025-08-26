"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, RotateCcw, CheckCircle } from "lucide-react"

const preambleWords = [
  "WE,",
  "THE",
  "PEOPLE",
  "OF",
  "INDIA,",
  "having",
  "solemnly",
  "resolved",
  "to",
  "constitute",
  "India",
  "into",
  "a",
  "SOVEREIGN",
  "SOCIALIST",
  "SECULAR",
  "DEMOCRATIC",
  "REPUBLIC",
  "and",
  "to",
  "secure",
  "to",
  "all",
  "its",
  "citizens:",
  "JUSTICE,",
  "social,",
  "economic",
  "and",
  "political;",
  "LIBERTY",
  "of",
  "thought,",
  "expression,",
  "belief,",
  "faith",
  "and",
  "worship;",
  "EQUALITY",
  "of",
  "status",
  "and",
  "of",
  "opportunity;",
  "and",
  "to",
  "promote",
  "among",
  "them",
  "all",
  "FRATERNITY",
  "assuring",
  "the",
  "dignity",
  "of",
  "the",
  "individual",
  "and",
  "the",
  "unity",
  "and",
  "integrity",
  "of",
  "the",
  "Nation;",
]

const correctOrder = [...preambleWords]

export default function PreamblePuzzleGame() {
  const [shuffledWords, setShuffledWords] = useState<string[]>([])
  const [userOrder, setUserOrder] = useState<string[]>([])
  const [gameWon, setGameWon] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hints, setHints] = useState(3)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (userOrder.length === correctOrder.length) {
      checkWin()
    }
  }, [userOrder])

  const initializeGame = () => {
    // Shuffle the words
    const shuffled = [...preambleWords].sort(() => Math.random() - 0.5)
    setShuffledWords(shuffled)
    setUserOrder([])
    setCurrentIndex(0)
    setGameWon(false)
    setHints(3)
    setShowHint(false)
  }

  const checkWin = () => {
    const isCorrect = userOrder.every((word, index) => word === correctOrder[index])
    if (isCorrect) {
      setGameWon(true)
    }
  }

  const handleWordClick = (word: string, index: number) => {
    if (gameWon) return

    // Check if this is the correct next word
    if (word === correctOrder[currentIndex]) {
      setUserOrder([...userOrder, word])
      setCurrentIndex(currentIndex + 1)
      setShuffledWords(shuffledWords.filter((_, i) => i !== index))
    } else {
      // Wrong word - show feedback
      const wrongElement = document.getElementById(`word-${index}`)
      if (wrongElement) {
        wrongElement.classList.add("animate-pulse", "bg-red-200")
        setTimeout(() => {
          wrongElement.classList.remove("animate-pulse", "bg-red-200")
        }, 1000)
      }
    }
  }

  const useHint = () => {
    if (hints > 0 && currentIndex < correctOrder.length) {
      setHints(hints - 1)
      setShowHint(true)
      setTimeout(() => setShowHint(false), 3000)
    }
  }

  const resetGame = () => {
    initializeGame()
  }

  const removeLastWord = () => {
    if (userOrder.length > 0) {
      const lastWord = userOrder[userOrder.length - 1]
      setUserOrder(userOrder.slice(0, -1))
      setShuffledWords([...shuffledWords, lastWord])
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Preamble Master!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Congratulations! You've successfully arranged the entire Preamble of the Indian Constitution!
            </p>

            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-2">🇮🇳 You've learned about:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>🏛️ Sovereign India</div>
                <div>🤝 Socialist Values</div>
                <div>🕊️ Secular Nation</div>
                <div>🗳️ Democratic System</div>
                <div>⚖️ Justice for All</div>
                <div>🕊️ Liberty & Freedom</div>
                <div>⚖️ Equality</div>
                <div>🤝 Fraternity</div>
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
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-green-500">
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
            <h1 className="text-2xl font-bold text-gray-800">🧩 Preamble Puzzle</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hints: {hints}</span>
              <span className="text-gray-700">
                Progress: {currentIndex}/{correctOrder.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Instructions */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">🎯 Arrange the Preamble in Correct Order</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-4">
                Click on the words below to arrange them in the correct order of the Indian Constitution's Preamble!
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={useHint} disabled={hints === 0} variant="outline">
                  💡 Use Hint ({hints} left)
                </Button>
                <Button onClick={removeLastWord} disabled={userOrder.length === 0} variant="outline">
                  ↩️ Undo Last
                </Button>
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hint Display */}
          {showHint && (
            <Card className="bg-yellow-100 border-yellow-400">
              <CardContent className="p-4 text-center">
                <p className="text-yellow-800">
                  💡 <strong>Next word:</strong> "{correctOrder[currentIndex]}"
                </p>
              </CardContent>
            </Card>
          )}

          {/* User's Arrangement */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                Your Preamble ({userOrder.length} words)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-32 bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                {userOrder.length === 0 ? (
                  <p className="text-gray-500 text-center">Start clicking words to build the Preamble...</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {userOrder.map((word, index) => (
                      <span key={index} className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Available Words */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">📝 Available Words ({shuffledWords.length} remaining)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {shuffledWords.map((word, index) => (
                  <button
                    key={index}
                    id={`word-${index}`}
                    onClick={() => handleWordClick(word, index)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
