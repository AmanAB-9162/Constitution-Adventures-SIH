import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Gamepad2, MessageCircle, Trophy, Shield, Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Constitution Adventures</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/learn" className="text-gray-700 hover:text-blue-600 font-medium">
                Learn
              </Link>
              <Link href="/games" className="text-gray-700 hover:text-blue-600 font-medium">
                Games
              </Link>
              <Link href="/quiz" className="text-gray-700 hover:text-blue-600 font-medium">
                Quiz
              </Link>
              <Link href="/safety" className="text-gray-700 hover:text-blue-600 font-medium">
                Safety
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Learn the Constitution with Fun! 🎯
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
            Play games, take quizzes, and discover your rights and duties as a citizen of India!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-full"
            >
              <Link href="/games">🎮 Start Playing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30 text-lg px-8 py-4 rounded-full"
            >
              <Link href="/learn">📚 Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-white mb-12 drop-shadow-lg">What Can You Do Here? 🌟</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Gamepad2 className="w-8 h-8" />}
            title="Fun Games"
            description="Play Snake & Ladder, Ludo, and Car Race while learning about the Constitution!"
            color="bg-gradient-to-br from-green-400 to-blue-500"
            href="/games"
          />
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8" />}
            title="ConstituBot"
            description="Chat with our friendly AI assistant who helps you understand difficult concepts!"
            color="bg-gradient-to-br from-purple-400 to-pink-500"
            href="/chatbot"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Daily Quizzes"
            description="Test your knowledge and earn XP points and badges!"
            color="bg-gradient-to-br from-yellow-400 to-orange-500"
            href="/quiz"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Safety First"
            description="Learn important emergency numbers and safety tips!"
            color="bg-gradient-to-br from-red-400 to-pink-500"
            href="/safety"
          />
          <FeatureCard
            icon={<Leaf className="w-8 h-8" />}
            title="Environment"
            description="Discover how to protect our planet and be a responsible citizen!"
            color="bg-gradient-to-br from-green-400 to-teal-500"
            href="/environment"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Learn & Read"
            description="Read articles, watch videos, and explore the Constitution in simple language!"
            color="bg-gradient-to-br from-indigo-400 to-purple-500"
            href="/learn"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/80">Students Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Fun Games</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-white/80">Quiz Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80">Achievement Badges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">🇮🇳 Learn, Play, and Grow as a Responsible Citizen! 🇮🇳</p>
          <p className="text-gray-400">© 2025 Constitution Adventures. Made with ❤️ for young learners.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  href: string
}

function FeatureCard({ icon, title, description, color, href }: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className={`${color} border-0 hover:scale-105 transition-transform duration-300 cursor-pointer h-full`}>
        <CardContent className="p-6 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">{icon}</div>
          </div>
          <h4 className="text-xl font-bold mb-3">{title}</h4>
          <p className="text-white/90">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
