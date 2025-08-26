import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function DemocracyInIndiaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500">
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
            <h1 className="text-2xl font-bold text-gray-800">🗳️ Democracy in India</h1>
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
                <span className="text-4xl mr-3">🗳️</span>
                What is Democracy?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-4">
              <p>
                Democracy means <strong>"rule by the people"</strong>! In a democracy, the power belongs to the citizens
                who choose their leaders through voting.
              </p>
              <p>
                India is the <strong>world's largest democracy</strong> with over 900 million eligible voters! That's
                more than the population of Europe and North America combined!
              </p>
            </CardContent>
          </Card>

          {/* Features of Indian Democracy */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🇮🇳 Features of Indian Democracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">🗳️ Universal Adult Franchise</h3>
                  <p>
                    Every Indian citizen who is 18 years or older has the right to vote, regardless of their religion,
                    caste, gender, or education!
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">⚖️ Independent Judiciary</h3>
                  <p>Our courts are free from government control and ensure that everyone follows the Constitution!</p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">📰 Free Press</h3>
                  <p>Newspapers, TV channels, and websites can report news freely and criticize the government!</p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">🏛️ Federal System</h3>
                  <p>Power is divided between the central government and state governments!</p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">👥 Multi-Party System</h3>
                  <p>Many political parties can contest elections, giving voters different choices!</p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">📜 Written Constitution</h3>
                  <p>
                    Our Constitution is the longest written constitution in the world and defines how our democracy
                    works!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How Indian Democracy Works */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🏛️ How Indian Democracy Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">🗳️ Elections</h3>
                  <p className="text-gray-700">
                    Elections are held every 5 years to choose our representatives. The Election Commission of India
                    conducts these elections, which are the largest democratic exercise in the world!
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">🏛️ Parliament</h3>
                  <p className="text-gray-700">
                    Our Parliament has two houses: Lok Sabha (House of the People) and Rajya Sabha (Council of States).
                    They make laws for the entire country!
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-green-700 mb-2">👑 President</h3>
                  <p className="text-gray-700">
                    The President is the head of state, but most executive powers are exercised by the Prime Minister
                    and the Council of Ministers.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-red-700 mb-2">👨‍⚖️ Judiciary</h3>
                  <p className="text-gray-700">
                    The Supreme Court is the highest court and protects our Constitution and fundamental rights.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-orange-700 mb-2">🏙️ State Governments</h3>
                  <p className="text-gray-700">
                    Each state has its own government with a Chief Minister and state legislature to handle state
                    matters.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🌟 Fun Facts about Indian Democracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">🗳️</div>
                  <h3 className="font-bold mb-2">Largest Elections</h3>
                  <p className="text-sm">Indian elections are so big that they take several weeks to complete!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">🐘</div>
                  <h3 className="font-bold mb-2">Election Symbols</h3>
                  <p className="text-sm">
                    Political parties use symbols like lotus, hand, elephant, etc. to help voters identify them!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">👩‍⚖️</div>
                  <h3 className="font-bold mb-2">First Democracy</h3>
                  <p className="text-sm">
                    India was the first major country to give voting rights to all adults right from its independence!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Role in Democracy */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">👤 Your Role in Democracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">Now</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Learn about democracy and how it works</li>
                    <li>Participate in school elections</li>
                    <li>Stay informed about current events</li>
                    <li>Respect different opinions</li>
                    <li>Follow democratic values like equality and respect</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">When You Turn 18</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Register as a voter</li>
                    <li>Vote in all elections</li>
                    <li>Research candidates before voting</li>
                    <li>Participate in public discussions</li>
                    <li>Hold elected representatives accountable</li>
                  </ul>
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
                Now that you've learned about Democracy in India, let's see how much you remember!
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/quiz/democracy">Take Democracy Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-white/20 text-white border-white">
              <Link href="/learn/fundamental-duties">← Fundamental Duties</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/learn/important-amendments">Next: Important Amendments →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
