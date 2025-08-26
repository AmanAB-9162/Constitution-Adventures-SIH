import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function FundamentalDutiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500">
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
            <h1 className="text-2xl font-bold text-gray-800">🤝 Fundamental Duties</h1>
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
                <span className="text-4xl mr-3">🤝</span>
                What are Fundamental Duties?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-4">
              <p>
                Fundamental Duties are <strong>responsibilities</strong> that every citizen of India should follow. They
                remind us that with rights come duties!
              </p>
              <p>
                Think of them as <strong>guidelines</strong> for being a good citizen and helping make India a better
                place for everyone!
              </p>
            </CardContent>
          </Card>

          {/* The 11 Fundamental Duties */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🇮🇳 The 11 Fundamental Duties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">1️⃣ Respect the Constitution, National Flag, and National Anthem</h3>
                  <p className="text-sm mt-1">
                    Stand at attention during the National Anthem and treat the flag with respect!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">2️⃣ Follow the ideals of our national freedom struggle</h3>
                  <p className="text-sm mt-1">
                    Remember the values of freedom fighters like Mahatma Gandhi and Bhagat Singh!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">3️⃣ Protect the unity and integrity of India</h3>
                  <p className="text-sm mt-1">Promote harmony and brotherhood among all Indians!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">4️⃣ Defend the country when called upon</h3>
                  <p className="text-sm mt-1">Be ready to serve India and protect it from threats!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">5️⃣ Promote harmony and brotherhood</h3>
                  <p className="text-sm mt-1">Respect all religions, languages, and regional differences!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">6️⃣ Value and preserve our rich heritage and culture</h3>
                  <p className="text-sm mt-1">Respect India's diverse cultures, traditions, and monuments!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">7️⃣ Protect the natural environment</h3>
                  <p className="text-sm mt-1">
                    Take care of forests, lakes, rivers, wildlife, and have compassion for living creatures!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">8️⃣ Develop scientific temper and spirit of inquiry</h3>
                  <p className="text-sm mt-1">Ask questions, be curious, and think logically!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">9️⃣ Safeguard public property</h3>
                  <p className="text-sm mt-1">
                    Don't damage school property, public transport, or other government facilities!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">🔟 Strive for excellence</h3>
                  <p className="text-sm mt-1">Always try your best in studies, sports, and all activities!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">1️⃣1️⃣ Provide education to children (6-14 years)</h3>
                  <p className="text-sm mt-1">Parents should ensure their children go to school!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🌟 Fun Facts about Fundamental Duties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-bold text-lg text-orange-700 mb-2">📝 Added Later</h3>
                  <p className="text-gray-700">
                    Fundamental Duties were not in the original Constitution! They were added in 1976 by the 42nd
                    Amendment.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-bold text-lg text-red-700 mb-2">🌍 Inspired by USSR</h3>
                  <p className="text-gray-700">
                    Our duties were inspired by the Constitution of the former Soviet Union!
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-bold text-lg text-yellow-700 mb-2">➕ 11th Duty</h3>
                  <p className="text-gray-700">
                    The 11th duty about education was added in 2002, while the first 10 were added in 1976!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Fulfill Duties */}
          <Card className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🎯 How Can You Fulfill Your Duties?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🌱 At School</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Respect the National Flag during school assemblies</li>
                    <li>Participate in cultural events to preserve heritage</li>
                    <li>Keep your classroom and school clean</li>
                    <li>Plant trees in school gardens</li>
                    <li>Respect students from all backgrounds</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🏠 At Home</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Save water and electricity</li>
                    <li>Segregate waste for recycling</li>
                    <li>Respect elders and help family members</li>
                    <li>Learn about Indian culture and traditions</li>
                    <li>Read books to develop scientific thinking</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🏙️ In Your Community</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Participate in cleanliness drives</li>
                    <li>Respect public property like parks and buses</li>
                    <li>Celebrate festivals with harmony</li>
                    <li>Help neighbors in need</li>
                    <li>Spread awareness about important issues</li>
                  </ul>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🌍 For the Environment</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Use less plastic</li>
                    <li>Plant trees and take care of them</li>
                    <li>Be kind to animals</li>
                    <li>Don't waste food or water</li>
                    <li>Use public transport when possible</li>
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
                Now that you've learned about Fundamental Duties, let's see how much you remember!
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/quiz/fundamental-duties">Take Duties Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-white/20 text-white border-white">
              <Link href="/learn/fundamental-rights">← Fundamental Rights</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/learn/democracy-in-india">Next: Democracy in India →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
