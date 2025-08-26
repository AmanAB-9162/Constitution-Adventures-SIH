"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, Clock, Target, Star, Zap } from "lucide-react"

const quizzes = [
  {
    id: "preamble",
    title: "The Preamble",
    description: "Test your knowledge about the opening statement of our Constitution",
    icon: "📜",
    questions: 15,
    difficulty: "Easy",
    time: "10 min",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: "fundamental-rights",
    title: "Fundamental Rights",
    description: "Learn about the basic rights guaranteed to every Indian citizen",
    icon: "⚖️",
    questions: 20,
    difficulty: "Medium",
    time: "15 min",
    color: "from-green-400 to-blue-500",
  },
  {
    id: "fundamental-duties",
    title: "Fundamental Duties",
    description: "Understand the duties every citizen should follow",
    icon: "🤝",
    questions: 18,
    difficulty: "Medium",
    time: "12 min",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "democracy",
    title: "Democracy in India",
    description: "Explore how democracy works in our country",
    icon: "🗳️",
    questions: 25,
    difficulty: "Hard",
    time: "20 min",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: "amendments",
    title: "Important Amendments",
    description: "Key changes made to the Constitution over time",
    icon: "📝",
    questions: 22,
    difficulty: "Hard",
    time: "18 min",
    color: "from-teal-400 to-blue-500",
  },
  {
    id: "constitution-story",
    title: "Constitution Story",
    description: "The fascinating journey of how our Constitution was created",
    icon: "📚",
    questions: 20,
    difficulty: "Medium",
    time: "15 min",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "government-structure",
    title: "Government Structure",
    description: "Learn about the three branches of government and their roles",
    icon: "🏛️",
    questions: 25,
    difficulty: "Hard",
    time: "20 min",
    color: "from-indigo-400 to-purple-500",
  },
  {
    id: "citizenship",
    title: "Citizenship & Rights",
    description: "Understanding what it means to be an Indian citizen",
    icon: "🇮🇳",
    questions: 18,
    difficulty: "Medium",
    time: "12 min",
    color: "from-green-400 to-teal-500",
  },
  {
    id: "judicial-system",
    title: "Judicial System",
    description: "How courts and justice work in India",
    icon: "⚖️",
    questions: 22,
    difficulty: "Hard",
    time: "18 min",
    color: "from-red-400 to-pink-500",
  },
  {
    id: "federal-structure",
    title: "Federal Structure",
    description: "Center-State relations and distribution of powers",
    icon: "🏢",
    questions: 20,
    difficulty: "Hard",
    time: "16 min",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "emergency-provisions",
    title: "Emergency Provisions",
    description: "Special powers during national emergencies",
    icon: "🚨",
    questions: 15,
    difficulty: "Hard",
    time: "12 min",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "constitutional-bodies",
    title: "Constitutional Bodies",
    description: "Important institutions created by the Constitution",
    icon: "🏛️",
    questions: 18,
    difficulty: "Medium",
    time: "14 min",
    color: "from-purple-400 to-blue-500",
  },
]

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700 hover:bg-gray-100">
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                <Brain className="w-8 h-8 mr-3 text-purple-600" />
                Quiz Championship
              </h1>
              <p className="text-gray-600 mt-1">Test your Constitutional knowledge!</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Quiz Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🧠 Challenge Your Knowledge!</h2>
          <p className="text-white/90 text-lg">
            Choose from {quizzes.length} comprehensive quizzes covering all aspects of the Indian Constitution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${quiz.color} flex items-center justify-center text-4xl mb-4 group-hover:animate-pulse`}
                >
                  {quiz.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">{quiz.description}</p>

                {/* Quiz Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Target className="w-4 h-4 mr-1" />
                      {quiz.questions} Questions
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {quiz.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 mr-1" />
                      Difficulty
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        quiz.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : quiz.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>

                {/* Start Quiz Button */}
                <Button
                  asChild
                  className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white font-semibold py-3 transition-all duration-300 group-hover:shadow-lg`}
                >
                  <Link href={`/quiz/${quiz.id}`}>
                    <Zap className="w-4 h-4 mr-2" />
                    Start Quiz!
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Features */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-gray-800">🏆 Quiz Championship Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Detailed Analytics</h3>
                  <p className="text-gray-600">Get comprehensive feedback on your performance and areas to improve</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Adaptive Difficulty</h3>
                  <p className="text-gray-600">Questions adapt to your skill level for optimal learning experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🏅</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Achievement System</h3>
                  <p className="text-gray-600">Earn badges and certificates as you master different topics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Tips */}
        <div className="mt-8 max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-xl text-gray-800">💡 Study Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📖</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Read First</h4>
                    <p className="text-sm text-gray-600">Visit the Learn section before taking quizzes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Take Your Time</h4>
                    <p className="text-sm text-gray-600">No rush - focus on understanding concepts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Practice Regularly</h4>
                    <p className="text-sm text-gray-600">Retake quizzes to reinforce learning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📝</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Learn from Mistakes</h4>
                    <p className="text-sm text-gray-600">Review explanations for wrong answers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
