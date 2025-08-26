import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function PreamblePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/learn">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Learning
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">📜 The Preamble</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800 flex items-center justify-center">
                <span className="text-4xl mr-3">📜</span>
                What is the Preamble?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-4">
              <p>
                The Preamble is like the <strong>introduction</strong> to our Constitution! It's the first thing you
                read, and it tells us what kind of country India wants to be.
              </p>
              <p>
                Think of it like the <strong>mission statement</strong> of our country - it explains our goals and
                dreams for India!
              </p>
            </CardContent>
          </Card>

          {/* The Preamble Text */}
          <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🇮🇳 The Preamble of India</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg leading-relaxed text-center bg-white/20 p-6 rounded-lg">
                <p className="font-semibold text-xl mb-4">
                  "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">🏛️ SOVEREIGN</h3>
                    <p className="text-sm">Independent and free</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">🤝 SOCIALIST</h3>
                    <p className="text-sm">Working for everyone's welfare</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">🕊️ SECULAR</h3>
                    <p className="text-sm">All religions are equal</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">🗳️ DEMOCRATIC</h3>
                    <p className="text-sm">People choose their leaders</p>
                  </div>
                </div>
                <p className="font-semibold text-xl">
                  REPUBLIC and to secure to all its citizens JUSTICE, LIBERTY, EQUALITY and FRATERNITY..."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Words Explained */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">🔑 Key Words Explained</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">⚖️ JUSTICE</h3>
                  <p className="text-gray-700">Everyone gets fair treatment, no matter who they are!</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-lg text-green-700 mb-2">🕊️ LIBERTY</h3>
                  <p className="text-gray-700">Freedom to think, speak, and live as you want (within rules)!</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">⚖️ EQUALITY</h3>
                  <p className="text-gray-700">All people are treated the same, no discrimination!</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-lg text-red-700 mb-2">🤝 FRATERNITY</h3>
                  <p className="text-gray-700">Brotherhood - we are all one big Indian family!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🌟 Fun Facts about the Preamble</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="font-bold mb-2">Written by</h3>
                  <p>Dr. B.R. Ambedkar and the Constituent Assembly</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="font-bold mb-2">Adopted on</h3>
                  <p>November 26, 1949</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Purpose</h3>
                  <p>Shows India's goals and values</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-yellow-400 text-gray-800">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Test Your Knowledge! 🧠</h3>
              <p className="text-lg mb-6">
                Now that you've learned about the Preamble, let's see how much you remember!
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/quiz/preamble">Take Preamble Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-white/20 text-white border-white">
              <Link href="/learn">← Back to Learning</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/learn/fundamental-rights">Next: Fundamental Rights →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
