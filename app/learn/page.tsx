"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Video, FileText, Users } from "lucide-react"

const learningModules = [
  {
    title: "The Preamble",
    description: "Learn about the beautiful introduction to our Constitution",
    icon: "📜",
    content: "We, the people of India...",
    difficulty: "Easy",
    duration: "5 min",
    color: "bg-gradient-to-br from-blue-400 to-purple-500",
  },
  {
    title: "Fundamental Rights",
    description: "Discover the 6 important rights every Indian citizen has",
    icon: "⚖️",
    content: "Right to Equality, Freedom...",
    difficulty: "Medium",
    duration: "10 min",
    color: "bg-gradient-to-br from-green-400 to-blue-500",
  },
  {
    title: "Fundamental Duties",
    description: "Learn about our responsibilities as citizens",
    icon: "🤝",
    content: "11 duties for every citizen...",
    difficulty: "Medium",
    duration: "8 min",
    color: "bg-gradient-to-br from-orange-400 to-red-500",
  },
  {
    title: "Democracy in India",
    description: "Understand how our government works",
    icon: "🗳️",
    content: "By the people, for the people...",
    difficulty: "Easy",
    duration: "7 min",
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
  },
  {
    title: "Important Amendments",
    description: "Changes made to improve our Constitution",
    icon: "📝",
    content: "42nd Amendment, Right to Education...",
    difficulty: "Hard",
    duration: "12 min",
    color: "bg-gradient-to-br from-teal-400 to-green-500",
  },
  {
    title: "Constitution Story",
    description: "The amazing journey of how our Constitution was made",
    icon: "📚",
    content: "Dr. Ambedkar and the Constituent Assembly...",
    difficulty: "Medium",
    duration: "15 min",
    color: "bg-gradient-to-br from-indigo-400 to-purple-500",
  },
]

const videos = [
  {
    title: "Constitution for Kids",
    duration: "8:30",
    views: "125K",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Rights and Duties Explained",
    duration: "6:45",
    views: "89K",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Democracy Made Simple",
    duration: "10:15",
    views: "156K",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

const glossary = [
  { term: "Democracy", meaning: "A system where people choose their leaders by voting" },
  { term: "Republic", meaning: "A country where the head of state is elected, not a king or queen" },
  { term: "Secular", meaning: "Treating all religions equally" },
  { term: "Socialist", meaning: "Working for the welfare of all people" },
  { term: "Sovereign", meaning: "Independent and free to make its own decisions" },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400">
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
            <h1 className="text-2xl font-bold text-gray-800">📚 Learning Center</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Discover the Constitution! 📖</h2>
        <p className="text-xl text-white/90 drop-shadow mb-8">
          Read, watch, and learn about India's Constitution in simple and fun ways!
        </p>
      </section>

      {/* Learning Modules */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">📚 Learning Modules</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningModules.map((module, index) => (
            <Link key={index} href={`/learn/${module.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <Card
                className={`${module.color} border-0 hover:scale-105 transition-transform duration-300 cursor-pointer text-white`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="text-right text-sm">
                      <div className="bg-white/20 px-2 py-1 rounded-full mb-1">{module.difficulty}</div>
                      <div className="bg-white/20 px-2 py-1 rounded-full">{module.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-3">{module.description}</p>
                  <p className="text-sm text-white/80 mb-4">{module.content}</p>
                  <div className="flex items-center justify-center w-full bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-md py-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Learning
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">🎥 Educational Videos</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.open(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`, "_blank")}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors">
                      <Video className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{video.title}</h4>
                  <p className="text-sm text-gray-600">{video.views} views</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Glossary Section */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">📖 Constitution Dictionary</h3>
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <FileText className="w-6 h-6" />
              <span>Important Terms to Know</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {glossary.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-blue-700">{item.term}</h4>
                  <p className="text-gray-700 text-sm">{item.meaning}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Live Sessions */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Join Live Learning Sessions! 🎓</h3>
            <p className="text-lg mb-6">Every Saturday at 4 PM - Interactive Constitution workshops with experts!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
                onClick={() =>
                  alert(
                    "🎉 Registration successful! You will receive a confirmation email with the meeting link. Next session: This Saturday at 4 PM!",
                  )
                }
              >
                📅 Register for Next Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                onClick={() =>
                  window.open("https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6VFKjVvK_YiTiSXB2ylX8", "_blank")
                }
              >
                📺 Watch Previous Sessions
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Progress Tracking */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-6">📊 Your Learning Progress</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center text-white">
              <div
                className="cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-colors"
                onClick={() =>
                  alert(
                    "🎯 Modules Progress:\n✅ The Preamble - Completed\n✅ Fundamental Rights - Completed\n⏳ Fundamental Duties - In Progress\n📚 Democracy in India - Not Started\n📝 Important Amendments - Not Started\n📚 Constitution Story - Not Started",
                  )
                }
              >
                <div className="text-3xl font-bold mb-2">3/6</div>
                <div className="text-sm">Modules Completed</div>
              </div>
              <div
                className="cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-colors"
                onClick={() =>
                  alert(
                    "⭐ XP Breakdown:\n🧠 Quiz Completion: 150 XP\n📚 Module Reading: 80 XP\n🎮 Games Played: 20 XP\n\nKeep learning to earn more XP!",
                  )
                }
              >
                <div className="text-3xl font-bold mb-2">250</div>
                <div className="text-sm">XP Points Earned</div>
              </div>
              <div
                className="cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-colors"
                onClick={() =>
                  alert(
                    "🏆 Your Badges:\n🥇 First Quiz - Completed your first quiz\n📚 Bookworm - Read 3 learning modules\n🎯 Quiz Master - Scored 80%+ in 3 quizzes\n⚖️ Rights Hero - Completed Rights module\n🤝 Duty Champion - Completed Duties module",
                  )
                }
              >
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-sm">Badges Unlocked</div>
              </div>
              <div
                className="cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-colors"
                onClick={() =>
                  alert(
                    "🔥 Learning Streak:\n📅 Current Streak: 12 days\n🎯 Best Streak: 15 days\n📚 Total Learning Days: 28\n\nKeep it up! Visit daily to maintain your streak!",
                  )
                }
              >
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-sm">Days Learning Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
