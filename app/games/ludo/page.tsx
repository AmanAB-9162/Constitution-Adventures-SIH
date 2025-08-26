// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowLeft, Trophy, Users, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"

// interface Player {
//   id: number
//   name: string
//   color: string
//   pieces: { id: number; position: number; isHome: boolean; isActive: boolean }[]
//   homePositions: number[]
//   startPosition: number
//   emoji: string
// }

// interface Question {
//   question: string
//   options: string[]
//   correct: number
//   explanation: string
// }

// const questions: Question[] = [
//   {
//     question: "Who is the head of the Indian government?",
//     options: ["President", "Prime Minister", "Chief Justice", "Governor"],
//     correct: 1,
//     explanation: "The Prime Minister is the head of the government and leads the country.",
//   },
//   {
//     question: "How many states are there in India?",
//     options: ["28", "29", "30", "27"],
//     correct: 0,
//     explanation: "India has 28 states and 8 union territories.",
//   },
//   {
//     question: "What is the Parliament of India called?",
//     options: ["Congress", "Assembly", "Lok Sabha & Rajya Sabha", "Senate"],
//     correct: 2,
//     explanation: "The Indian Parliament has two houses: Lok Sabha and Rajya Sabha.",
//   },
//   {
//     question: "At what age can you become Prime Minister?",
//     options: ["21 years", "25 years", "30 years", "35 years"],
//     correct: 1,
//     explanation: "You must be at least 25 years old to become a member of Lok Sabha and eligible for PM.",
//   },
//   {
//     question: "How many fundamental duties are there?",
//     options: ["10", "11", "12", "13"],
//     correct: 1,
//     explanation: "There are 11 fundamental duties for Indian citizens.",
//   },
// ]

// export default function LudoGame() {
//   const [players, setPlayers] = useState<Player[]>([
//     {
//       id: 1,
//       name: "You",
//       color: "bg-red-500",
//       pieces: [
//         { id: 1, position: 0, isHome: false, isActive: false },
//         { id: 2, position: 0, isHome: false, isActive: false },
//         { id: 3, position: 0, isHome: false, isActive: false },
//         { id: 4, position: 0, isHome: false, isActive: false },
//       ],
//       homePositions: [1, 2, 7, 8],
//       startPosition: 1,
//       emoji: "🔴",
//     },
//     {
//       id: 2,
//       name: "Bot",
//       color: "bg-blue-500",
//       pieces: [
//         { id: 1, position: 0, isHome: false, isActive: false },
//         { id: 2, position: 0, isHome: false, isActive: false },
//         { id: 3, position: 0, isHome: false, isActive: false },
//         { id: 4, position: 0, isHome: false, isActive: false },
//       ],
//       homePositions: [9, 10, 15, 16],
//       startPosition: 14,
//       emoji: "🔵",
//     },
//   ])
//   const [currentPlayer, setCurrentPlayer] = useState(0)
//   const [diceValue, setDiceValue] = useState(1)
//   const [isRolling, setIsRolling] = useState(false)
//   const [gameWon, setGameWon] = useState(false)
//   const [winner, setWinner] = useState("")
//   const [showQuestion, setShowQuestion] = useState(false)
//   const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
//   const [gameStarted, setGameStarted] = useState(false)
//   const [gameHistory, setGameHistory] = useState<string[]>([])
//   const [botThinking, setBotThinking] = useState(false)

//   // Bot auto-play effect
//   useEffect(() => {
//     if (currentPlayer === 1 && gameStarted && !gameWon && !isRolling && !showQuestion) {
//       const timer = setTimeout(() => {
//         rollDice()
//       }, 1500)
//       return () => clearTimeout(timer)
//     }
//   }, [currentPlayer, gameStarted, gameWon, isRolling, showQuestion])

//   // Bot auto-answer effect
//   useEffect(() => {
//     if (showQuestion && currentPlayer === 1 && currentQuestion) {
//       setBotThinking(true)
//       const timer = setTimeout(() => {
//         handleBotAnswer()
//         setBotThinking(false)
//       }, 2500)
//       return () => clearTimeout(timer)
//     }
//   }, [showQuestion, currentPlayer, currentQuestion])

//   const rollDice = () => {
//     if (isRolling || showQuestion || !gameStarted) return

//     setIsRolling(true)
//     const newValue = Math.floor(Math.random() * 6) + 1

//     // Animate dice rolling
//     let rollCount = 0
//     const rollInterval = setInterval(() => {
//       setDiceValue(Math.floor(Math.random() * 6) + 1)
//       rollCount++
//       if (rollCount > 10) {
//         clearInterval(rollInterval)
//         setDiceValue(newValue)
//         setIsRolling(false)

//         setGameHistory((prev) => [...prev, `${players[currentPlayer].name} rolled ${newValue}`])

//         // Show question
//         const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
//         setCurrentQuestion(randomQuestion)
//         setShowQuestion(true)
//       }
//     }, 100)
//   }

//   const handleBotAnswer = () => {
//     if (!currentQuestion || currentPlayer !== 1) return

//     const botAnswerCorrectly = Math.random() < 0.75
//     const botAnswer = botAnswerCorrectly
//       ? currentQuestion.correct
//       : Math.floor(Math.random() * currentQuestion.options.length)

//     answerQuestion(botAnswer)
//   }

//   const answerQuestion = (answerIndex: number) => {
//     if (!currentQuestion) return

//     const isCorrect = answerIndex === currentQuestion.correct
//     setShowQuestion(false)

//     if (isCorrect) {
//       movePiece(diceValue)
//       setGameHistory((prev) => [
//         ...prev,
//         `${players[currentPlayer].name} answered correctly! Can move ${diceValue} steps.`,
//       ])
//     } else {
//       const halfSteps = Math.ceil(diceValue / 2)
//       movePiece(halfSteps)
//       setGameHistory((prev) => [
//         ...prev,
//         `${players[currentPlayer].name} answered incorrectly. Can move only ${halfSteps} steps.`,
//       ])
//     }

//     setCurrentQuestion(null)
//   }

//   const movePiece = (steps: number) => {
//     setPlayers((prevPlayers) => {
//       const newPlayers = [...prevPlayers]
//       const player = newPlayers[currentPlayer]

//       // Find movable pieces
//       const movablePieces = player.pieces.filter((piece) => {
//         if (!piece.isActive && steps === 6) return true
//         if (piece.isActive && !piece.isHome && piece.position + steps <= 57) return true
//         return false
//       })

//       if (movablePieces.length > 0) {
//         const pieceToMove = movablePieces[0]
//         if (!pieceToMove.isActive && steps === 6) {
//           pieceToMove.isActive = true
//           pieceToMove.position = player.startPosition
//           setGameHistory((prev) => [...prev, `${player.name} started a new piece!`])
//         } else if (pieceToMove.isActive) {
//           pieceToMove.position += steps
//           if (pieceToMove.position >= 57) {
//             pieceToMove.isHome = true
//             pieceToMove.position = 57
//             setGameHistory((prev) => [...prev, `${player.name} got a piece home!`])
//           } else {
//             setGameHistory((prev) => [...prev, `${player.name} moved a piece to position ${pieceToMove.position}`])
//           }
//         }
//       }

//       // Check win condition
//       const homePieces = player.pieces.filter((piece) => piece.isHome).length
//       if (homePieces === 4) {
//         setTimeout(() => {
//           setGameWon(true)
//           setWinner(player.name)
//         }, 1000)
//         return newPlayers
//       }

//       return newPlayers
//     })

//     // Switch turns after a delay
//     setTimeout(() => {
//       setCurrentPlayer((prev) => (prev + 1) % players.length)
//     }, 1500)
//   }

//   const resetGame = () => {
//     setPlayers([
//       {
//         id: 1,
//         name: "You",
//         color: "bg-red-500",
//         pieces: [
//           { id: 1, position: 0, isHome: false, isActive: false },
//           { id: 2, position: 0, isHome: false, isActive: false },
//           { id: 3, position: 0, isHome: false, isActive: false },
//           { id: 4, position: 0, isHome: false, isActive: false },
//         ],
//         homePositions: [1, 2, 7, 8],
//         startPosition: 1,
//         emoji: "🔴",
//       },
//       {
//         id: 2,
//         name: "Bot",
//         color: "bg-blue-500",
//         pieces: [
//           { id: 1, position: 0, isHome: false, isActive: false },
//           { id: 2, position: 0, isHome: false, isActive: false },
//           { id: 3, position: 0, isHome: false, isActive: false },
//           { id: 4, position: 0, isHome: false, isActive: false },
//         ],
//         homePositions: [9, 10, 15, 16],
//         startPosition: 14,
//         emoji: "🔵",
//       },
//     ])
//     setCurrentPlayer(0)
//     setDiceValue(1)
//     setGameWon(false)
//     setWinner("")
//     setShowQuestion(false)
//     setCurrentQuestion(null)
//     setGameStarted(false)
//     setGameHistory([])
//     setBotThinking(false)
//   }

//   const startGame = () => {
//     setGameStarted(true)
//     setGameHistory(["🎮 Constitutional Ludo Started! Roll to begin!"])
//   }

//   const getDiceIcon = (value: number) => {
//     const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
//     const DiceIcon = icons[value - 1]
//     return <DiceIcon className="w-8 h-8" />
//   }

//   const renderLudoBoard = () => {
//     return (
//       <div className="relative w-80 h-80 bg-white border-4 border-gray-800 mx-auto">
//         {/* Center Home Area */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-300 border-2 border-gray-600 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-2xl">🏠</div>
//             <div className="text-xs font-bold">HOME</div>
//           </div>
//         </div>

//         {/* Red Player Area (Top-Left) */}
//         <div className="absolute top-2 left-2 w-32 h-32 bg-red-200 border-2 border-red-500 rounded-lg">
//           <div className="p-2">
//             <div className="text-center text-red-700 font-bold mb-2">Red (You)</div>
//             <div className="grid grid-cols-2 gap-1">
//               {players[0].pieces.map((piece, i) => (
//                 <div
//                   key={i}
//                   className={`w-6 h-6 ${players[0].color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${
//                     piece.isActive ? "animate-pulse" : ""
//                   }`}
//                 >
//                   {piece.isHome ? "🏠" : piece.isActive ? piece.position : ""}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Blue Player Area (Top-Right) */}
//         <div className="absolute top-2 right-2 w-32 h-32 bg-blue-200 border-2 border-blue-500 rounded-lg">
//           <div className="p-2">
//             <div className="text-center text-blue-700 font-bold mb-2">Blue (Bot)</div>
//             <div className="grid grid-cols-2 gap-1">
//               {players[1].pieces.map((piece, i) => (
//                 <div
//                   key={i}
//                   className={`w-6 h-6 ${players[1].color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${
//                     piece.isActive ? "animate-pulse" : ""
//                   }`}
//                 >
//                   {piece.isHome ? "🏠" : piece.isActive ? piece.position : ""}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Game Track (Simplified) */}
//         <div className="absolute bottom-4 left-4 right-4 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center">
//           <div className="text-xs text-gray-600">Ludo Track (Simplified View)</div>
//         </div>
//       </div>
//     )
//   }

//   if (gameWon) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
//         <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm">
//           <CardContent className="p-8 text-center">
//             <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 {winner} Wins!</h2>
//             <p className="text-lg text-gray-600 mb-6">Great job learning about governance while playing!</p>
//             <div className="space-y-4">
//               <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
//                 🎮 Play Again
//               </Button>
//               <Button asChild variant="outline" className="w-full bg-transparent">
//                 <Link href="/games">🏠 Back to Games</Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
//       {/* Header */}
//       <header className="bg-white/90 backdrop-blur-sm shadow-lg">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Button asChild variant="ghost" className="text-gray-700">
//               <Link href="/games">
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Back to Games
//               </Link>
//             </Button>
//             <h1 className="text-2xl font-bold text-gray-800">🎲 Constitutional Ludo</h1>
//             <div className="text-lg font-semibold text-gray-700">
//               {gameStarted ? `${players[currentPlayer].name}'s Turn` : "Ready to Play?"}
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {!gameStarted ? (
//           <div className="max-w-2xl mx-auto text-center">
//             <Card className="bg-white/95 backdrop-blur-sm">
//               <CardContent className="p-8">
//                 <div className="text-6xl mb-4">🎲</div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Constitutional Ludo</h2>
//                 <p className="text-lg text-gray-600 mb-6">
//                   Answer Constitution questions to move your pieces around the board! Get all 4 pieces home to win!
//                 </p>
//                 <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                   <h3 className="font-bold text-blue-800 mb-2">How to Play:</h3>
//                   <ul className="text-left text-blue-700 space-y-1">
//                     <li>🎯 Get all 4 pieces to the center home area</li>
//                     <li>🎲 Roll 6 to start a piece</li>
//                     <li>❓ Answer questions to move your pieces</li>
//                     <li>🏠 Reach the center to win</li>
//                     <li>📚 Learn about governance with each question!</li>
//                   </ul>
//                 </div>
//                 <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
//                   🚀 Start Game!
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Game Board */}
//             <div className="flex-1">
//               <Card className="bg-white/95 backdrop-blur-sm">
//                 <CardHeader>
//                   <CardTitle className="text-center">Constitutional Ludo Board</CardTitle>
//                 </CardHeader>
//                 <CardContent>{renderLudoBoard()}</CardContent>
//               </Card>
//             </div>

//             {/* Game Controls */}
//             <div className="lg:w-80">
//               <Card className="bg-white/95 backdrop-blur-sm mb-4">
//                 <CardHeader>
//                   <CardTitle>Game Controls</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="text-center">
//                     <div className={`text-2xl font-bold mb-2 text-${players[currentPlayer].color.split("-")[1]}-600`}>
//                       {players[currentPlayer].name}'s Turn
//                       {currentPlayer === 1 && !showQuestion && !isRolling && (
//                         <div className="text-sm text-blue-600 animate-pulse">🤖 Bot is playing...</div>
//                       )}
//                     </div>
//                     <div
//                       className={`w-16 h-16 mx-auto mb-4 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold ${
//                         isRolling ? "animate-spin" : ""
//                       }`}
//                     >
//                       {isRolling ? "🎲" : getDiceIcon(diceValue)}
//                     </div>
//                     <Button
//                       onClick={rollDice}
//                       disabled={isRolling || showQuestion || currentPlayer !== 0}
//                       className="w-full bg-blue-600 hover:bg-blue-700"
//                     >
//                       {isRolling ? "Rolling..." : currentPlayer === 0 ? "Roll Dice" : "Bot's Turn"}
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Player Status */}
//               <Card className="bg-white/95 backdrop-blur-sm mb-4">
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Users className="w-5 h-5 mr-2" />
//                     Player Status
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {players.map((player, index) => (
//                     <div key={player.id} className="mb-3 last:mb-0">
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="font-semibold flex items-center">
//                           <span className="text-2xl mr-2">{player.emoji}</span>
//                           {player.name}
//                           {index === currentPlayer && (
//                             <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>
//                           )}
//                         </span>
//                         <div className={`w-4 h-4 ${player.color} rounded-full`}></div>
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         Active pieces: {player.pieces.filter((p) => p.isActive && !p.isHome).length}/4
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         Home pieces: {player.pieces.filter((p) => p.isHome).length}/4
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               {/* Game History */}
//               <Card className="bg-white/95 backdrop-blur-sm">
//                 <CardHeader>
//                   <CardTitle>Game History</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="max-h-40 overflow-y-auto space-y-1">
//                     {gameHistory.slice(-6).map((event, index) => (
//                       <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
//                         {event}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Question Modal */}
//       {showQuestion && currentQuestion && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl bg-white">
//             <CardHeader>
//               <CardTitle className="text-xl">
//                 {currentPlayer === 0 ? "Governance Question 🏛️" : "Bot is thinking... 🤖"}
//                 {botThinking && (
//                   <div className="text-sm text-blue-600 mt-2 animate-pulse">Bot is analyzing the question...</div>
//                 )}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-lg mb-6">{currentQuestion.question}</p>
//               <div className="space-y-3">
//                 {currentQuestion.options.map((option, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="w-full text-left justify-start p-4 h-auto bg-transparent"
//                     onClick={() => currentPlayer === 0 && answerQuestion(index)}
//                     disabled={currentPlayer === 1 || botThinking}
//                   >
//                     <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
//                     {option}
//                   </Button>
//                 ))}
//               </div>
//               <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                 <p className="text-sm text-blue-800">
//                   💡 <strong>Tip:</strong>{" "}
//                   {currentPlayer === 0
//                     ? "Answer correctly to move the full dice value!"
//                     : "Bot is selecting an answer..."}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Users, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"

interface Player {
  id: number
  name: string
  color: string
  pieces: { id: number; position: number; isHome: boolean; isActive: boolean }[]
  homePositions: number[]
  startPosition: number
  emoji: string
}

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    question: "Who is the head of the Indian government?",
    options: ["President", "Prime Minister", "Chief Justice", "Governor"],
    correct: 1,
    explanation: "The Prime Minister is the head of the government and leads the country.",
  },
  {
    question: "How many states are there in India?",
    options: ["28", "29", "30", "27"],
    correct: 0,
    explanation: "India has 28 states and 8 union territories.",
  },
  {
    question: "What is the Parliament of India called?",
    options: ["Congress", "Assembly", "Lok Sabha & Rajya Sabha", "Senate"],
    correct: 2,
    explanation: "The Indian Parliament has two houses: Lok Sabha and Rajya Sabha.",
  },
  {
    question: "At what age can you become Prime Minister?",
    options: ["21 years", "25 years", "30 years", "35 years"],
    correct: 1,
    explanation: "You must be at least 25 years old to become a member of Lok Sabha and eligible for PM.",
  },
  {
    question: "How many fundamental duties are there?",
    options: ["10", "11", "12", "13"],
    correct: 1,
    explanation: "There are 11 fundamental duties for Indian citizens.",
  },
]

export default function LudoGame() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "You",
      color: "bg-red-500",
      pieces: [
        { id: 1, position: 0, isHome: false, isActive: false },
        { id: 2, position: 0, isHome: false, isActive: false },
        { id: 3, position: 0, isHome: false, isActive: false },
        { id: 4, position: 0, isHome: false, isActive: false },
      ],
      homePositions: [1, 2, 7, 8],
      startPosition: 1,
      emoji: "🔴",
    },
    {
      id: 2,
      name: "Bot",
      color: "bg-blue-500",
      pieces: [
        { id: 1, position: 0, isHome: false, isActive: false },
        { id: 2, position: 0, isHome: false, isActive: false },
        { id: 3, position: 0, isHome: false, isActive: false },
        { id: 4, position: 0, isHome: false, isActive: false },
      ],
      homePositions: [9, 10, 15, 16],
      startPosition: 14,
      emoji: "🔵",
    },
  ])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [winner, setWinner] = useState("")
  const [showQuestion, setShowQuestion] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [botThinking, setBotThinking] = useState(false)

  // Bot auto-play effect
  useEffect(() => {
    if (currentPlayer === 1 && gameStarted && !gameWon && !isRolling && !showQuestion) {
      const timer = setTimeout(() => {
        rollDice()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, gameStarted, gameWon, isRolling, showQuestion])

  // Bot auto-answer effect
  useEffect(() => {
    if (showQuestion && currentPlayer === 1 && currentQuestion) {
      setBotThinking(true)
      const timer = setTimeout(() => {
        handleBotAnswer()
        setBotThinking(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [showQuestion, currentPlayer, currentQuestion])

  const rollDice = () => {
    if (isRolling || showQuestion || !gameStarted) return

    setIsRolling(true)
    const newValue = Math.floor(Math.random() * 6) + 1

    // Animate dice rolling
    let rollCount = 0
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
      rollCount++
      if (rollCount > 10) {
        clearInterval(rollInterval)
        setDiceValue(newValue)
        setIsRolling(false)

        setGameHistory((prev) => [...prev, `${players[currentPlayer].name} rolled ${newValue}`])

        // Show question
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
        setCurrentQuestion(randomQuestion)
        setShowQuestion(true)
      }
    }, 100)
  }

  const handleBotAnswer = () => {
    if (!currentQuestion || currentPlayer !== 1) return;
 console.log("Bot is answering the question...");
    const botAnswerCorrectly = Math.random() < 0.75;
    const botAnswer = botAnswerCorrectly
      ? currentQuestion.correct
      : Math.floor(Math.random() * currentQuestion.options.length)
     console.log(`Bot selected answer: ${botAnswer}`);
    answerQuestion(botAnswer)
  }

  const answerQuestion = (answerIndex: number) => {
    if (!currentQuestion) return

    const isCorrect = answerIndex === currentQuestion.correct
    setShowQuestion(false)

    if (isCorrect) {
      movePiece(diceValue)
      setGameHistory((prev) => [
        ...prev,
        `${players[currentPlayer].name} answered correctly! Can move ${diceValue} steps.`,
      ])
    } else {
      const halfSteps = Math.ceil(diceValue / 2)
      movePiece(halfSteps)
      setGameHistory((prev) => [
        ...prev,
        `${players[currentPlayer].name} answered incorrectly. Can move only ${halfSteps} steps.`,
      ])
    }

    setCurrentQuestion(null)
  }

  const movePiece = (steps: number) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers]
      const player = newPlayers[currentPlayer]

      // Find movable pieces
      const movablePieces = player.pieces.filter((piece) => {
        if (!piece.isActive && steps === 6) return true
        if (piece.isActive && !piece.isHome && piece.position + steps <= 57) return true
        return false
      })

      if (movablePieces.length > 0) {
        const pieceToMove = movablePieces[0]
        if (!pieceToMove.isActive && steps === 6) {
          pieceToMove.isActive = true
          pieceToMove.position = player.startPosition
          setGameHistory((prev) => [...prev, `${player.name} started a new piece!`])
        } else if (pieceToMove.isActive) {
          pieceToMove.position += steps
          if (pieceToMove.position >= 57) {
            pieceToMove.isHome = true
            pieceToMove.position = 57
            setGameHistory((prev) => [...prev, `${player.name} got a piece home!`])
          } else {
            setGameHistory((prev) => [...prev, `${player.name} moved a piece to position ${pieceToMove.position}`])
          }
        }
      }

      // Check win condition
      const homePieces = player.pieces.filter((piece) => piece.isHome).length
      if (homePieces === 4) {
        setTimeout(() => {
          setGameWon(true)
          setWinner(player.name)
        }, 1000)
        return newPlayers
      }

      return newPlayers
    })

    // Switch turns after a delay
    setTimeout(() => {
      setCurrentPlayer((prev) => (prev + 1) % players.length)
    }, 1500)
  }

  const resetGame = () => {
    setPlayers([
      {
        id: 1,
        name: "You",
        color: "bg-red-500",
        pieces: [
          { id: 1, position: 0, isHome: false, isActive: false },
          { id: 2, position: 0, isHome: false, isActive: false },
          { id: 3, position: 0, isHome: false, isActive: false },
          { id: 4, position: 0, isHome: false, isActive: false },
        ],
        homePositions: [1, 2, 7, 8],
        startPosition: 1,
        emoji: "🔴",
      },
      {
        id: 2,
        name: "Bot",
        color: "bg-blue-500",
        pieces: [
          { id: 1, position: 0, isHome: false, isActive: false },
          { id: 2, position: 0, isHome: false, isActive: false },
          { id: 3, position: 0, isHome: false, isActive: false },
          { id: 4, position: 0, isHome: false, isActive: false },
        ],
        homePositions: [9, 10, 15, 16],
        startPosition: 14,
        emoji: "🔵",
      },
    ])
    setCurrentPlayer(0)
    setDiceValue(1)
    setGameWon(false)
    setWinner("")
    setShowQuestion(false)
    setCurrentQuestion(null)
    setGameStarted(false)
    setGameHistory([])
    setBotThinking(false)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameHistory(["🎮 Constitutional Ludo Started! Roll to begin!"])
  }

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
    const DiceIcon = icons[value - 1]
    return <DiceIcon className="w-8 h-8" />
  }

  const renderLudoBoard = () => {
    return (
      <div className="relative w-80 h-80 bg-white border-4 border-gray-800 mx-auto">
        {/* Center Home Area */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-300 border-2 border-gray-600 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl">🏠</div>
            <div className="text-xs font-bold">HOME</div>
          </div>
        </div>

        {/* Red Player Area (Top-Left) */}
        <div className="absolute top-2 left-2 w-32 h-32 bg-red-200 border-2 border-red-500 rounded-lg">
          <div className="p-2">
            <div className="text-center text-red-700 font-bold mb-2">Red (You)</div>
            <div className="grid grid-cols-2 gap-1">
              {players[0].pieces.map((piece, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 ${players[0].color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${
                    piece.isActive ? "animate-pulse" : ""
                  }`}
                >
                  {piece.isHome ? "🏠" : piece.isActive ? piece.position : ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blue Player Area (Top-Right) */}
        <div className="absolute top-2 right-2 w-32 h-32 bg-blue-200 border-2 border-blue-500 rounded-lg">
          <div className="p-2">
            <div className="text-center text-blue-700 font-bold mb-2">Blue (Bot)</div>
            <div className="grid grid-cols-2 gap-1">
              {players[1].pieces.map((piece, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 ${players[1].color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${
                    piece.isActive ? "animate-pulse" : ""
                  }`}
                >
                  {piece.isHome ? "🏠" : piece.isActive ? piece.position : ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Track (Simplified) */}
        <div className="absolute bottom-4 left-4 right-4 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center">
          <div className="text-xs text-gray-600">Ludo Track (Simplified View)</div>
        </div>
      </div>
    )
  }

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 {winner} Wins!</h2>
            <p className="text-lg text-gray-600 mb-6">Great job learning about governance while playing!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
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
            <h1 className="text-2xl font-bold text-gray-800">🎲 Constitutional Ludo</h1>
            <div className="text-lg font-semibold text-gray-700">
              {gameStarted ? `${players[currentPlayer].name}'s Turn` : "Ready to Play?"}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🎲</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Constitutional Ludo</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Answer Constitution questions to move your pieces around the board! Get all 4 pieces home to win!
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-blue-800 mb-2">How to Play:</h3>
                  <ul className="text-left text-blue-700 space-y-1">
                    <li>🎯 Get all 4 pieces to the center home area</li>
                    <li>🎲 Roll 6 to start a piece</li>
                    <li>❓ Answer questions to move your pieces</li>
                    <li>🏠 Reach the center to win</li>
                    <li>📚 Learn about governance with each question!</li>
                  </ul>
                </div>
                <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                  🚀 Start Game!
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Game Board */}
            <div className="flex-1">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center">Constitutional Ludo Board</CardTitle>
                </CardHeader>
                <CardContent>{renderLudoBoard()}</CardContent>
              </Card>
            </div>

            {/* Game Controls */}
            <div className="lg:w-80">
              <Card className="bg-white/95 backdrop-blur-sm mb-4">
                <CardHeader>
                  <CardTitle>Game Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-2 text-${players[currentPlayer].color.split("-")[1]}-600`}>
                      {players[currentPlayer].name}'s Turn
                      {currentPlayer === 1 && !showQuestion && !isRolling && (
                        <div className="text-sm text-blue-600 animate-pulse">🤖 Bot is playing...</div>
                      )}
                    </div>
                    <div
                      className={`w-16 h-16 mx-auto mb-4 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold ${
                        isRolling ? "animate-spin" : ""
                      }`}
                    >
                      {isRolling ? "🎲" : getDiceIcon(diceValue)}
                    </div>
                    <Button
                      onClick={rollDice}
                      disabled={isRolling || showQuestion || currentPlayer !== 0}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isRolling ? "Rolling..." : currentPlayer === 0 ? "Roll Dice" : "Bot's Turn"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Player Status */}
              <Card className="bg-white/95 backdrop-blur-sm mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Player Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {players.map((player, index) => (
                    <div key={player.id} className="mb-3 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold flex items-center">
                          <span className="text-2xl mr-2">{player.emoji}</span>
                          {player.name}
                          {index === currentPlayer && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>
                          )}
                        </span>
                        <div className={`w-4 h-4 ${player.color} rounded-full`}></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Active pieces: {player.pieces.filter((p) => p.isActive && !p.isHome).length}/4
                      </div>
                      <div className="text-sm text-gray-600">
                        Home pieces: {player.pieces.filter((p) => p.isHome).length}/4
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Game History */}
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Game History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {gameHistory.slice(-6).map((event, index) => (
                      <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                        {event}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Question Modal */}
      {showQuestion && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentPlayer === 0 ? "Governance Question 🏛️" : "Bot is thinking... 🤖"}
                {botThinking && (
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
                    className="w-full text-left justify-start p-4 h-auto bg-transparent"
                    onClick={() => currentPlayer === 0 && answerQuestion(index)}
                    disabled={currentPlayer === 1 || botThinking}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong>{" "}
                  {currentPlayer === 0
                    ? "Answer correctly to move the full dice value!"
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
