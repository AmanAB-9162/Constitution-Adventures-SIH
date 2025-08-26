import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function FundamentalRightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
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
            <h1 className="text-2xl font-bold text-gray-800">⚖️ Fundamental Rights</h1>
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
                <span className="text-4xl mr-3">⚖️</span>
                What are Fundamental Rights?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-4">
              <p>
                Fundamental Rights are like <strong>special promises</strong> that the Constitution makes to every
                citizen of India! These rights cannot be taken away from you.
              </p>
              <p>
                Think of them as your <strong>superpowers</strong> as an Indian citizen - they protect you and help you
                live with dignity and freedom!
              </p>
            </CardContent>
          </Card>

          {/* The 6 Fundamental Rights */}
          <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🇮🇳 The 6 Fundamental Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">1️⃣ Right to Equality (Articles 14-18)</h3>
                  <p className="mb-3">Everyone is equal before the law!</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>No discrimination based on religion, race, caste, gender, or birthplace</li>
                    <li>Equal opportunity in government jobs</li>
                    <li>Abolition of untouchability</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">2️⃣ Right to Freedom (Articles 19-22)</h3>
                  <p className="mb-3">Freedom to express yourself and live freely!</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Freedom of speech and expression</li>
                    <li>Freedom to assemble peacefully</li>
                    <li>Freedom to form associations</li>
                    <li>Freedom to move throughout India</li>
                    <li>Freedom to live anywhere in India</li>
                    <li>Freedom to choose any profession</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">3️⃣ Right against Exploitation (Articles 23-24)</h3>
                  <p className="mb-3">No one can force you to work or harm you!</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Prohibition of human trafficking and forced labor</li>
                    <li>Prohibition of child labor in factories and hazardous places</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">4️⃣ Right to Freedom of Religion (Articles 25-28)</h3>
                  <p className="mb-3">Freedom to follow any religion!</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Freedom to practice and spread any religion</li>
                    <li>Freedom to manage religious affairs</li>
                    <li>No religious instruction in government schools</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">5️⃣ Cultural & Educational Rights (Articles 29-30)</h3>
                  <p className="mb-3">Right to preserve your culture and education!</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Protection of language, script, and culture of minorities</li>
                    <li>Right of minorities to establish educational institutions</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">6️⃣ Right to Constitutional Remedies (Article 32)</h3>
                  <p className="mb-3">Right to seek justice if your rights are violated!</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Right to approach the Supreme Court if fundamental rights are violated</li>
                    <li>Dr. Ambedkar called this the "Heart and Soul" of the Constitution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🌟 Fun Facts about Fundamental Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">📝 Originally 7 Rights</h3>
                  <p className="text-gray-700">
                    There were originally 7 fundamental rights, but the "Right to Property" was removed in 1978!
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold text-lg text-green-700 mb-2">⚖️ Inspired by USA</h3>
                  <p className="text-gray-700">
                    Our fundamental rights were inspired by the Bill of Rights in the United States Constitution!
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">🧑‍⚖️ Supreme Court</h3>
                  <p className="text-gray-700">The Supreme Court is the guardian of our fundamental rights!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-Life Examples */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🎬 Rights in Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🏫 Right to Education</h3>
                  <p>
                    Thanks to the Right to Education Act (based on Article 21A), every child between 6-14 years has the
                    right to free education!
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🗣️ Freedom of Speech</h3>
                  <p>
                    You can express your opinions freely in school debates, write articles, or make videos about issues
                    you care about!
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🙏 Freedom of Religion</h3>
                  <p>
                    Students from different religions can celebrate their festivals and follow their religious
                    practices!
                  </p>
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
                Now that you've learned about Fundamental Rights, let's see how much you remember!
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/quiz/fundamental-rights">Take Rights Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-white/20 text-white border-white">
              <Link href="/learn/the-preamble">← Preamble</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/learn/fundamental-duties">Next: Fundamental Duties →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
