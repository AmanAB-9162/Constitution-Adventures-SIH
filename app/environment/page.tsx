import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Leaf } from "lucide-react"

const goodPractices = [
  {
    title: "Plant Trees & Gardens",
    description: "Trees give us oxygen and make our air clean!",
    icon: "🌳",
    actions: [
      "Plant a tree on your birthday",
      "Start a small garden",
      "Water plants regularly",
      "Join tree plantation drives",
    ],
  },
  {
    title: "Save Water",
    description: "Water is precious - every drop counts!",
    icon: "💧",
    actions: ["Turn off taps when not needed", "Take shorter showers", "Collect rainwater", "Fix leaky taps"],
  },
  {
    title: "Reduce, Reuse, Recycle",
    description: "Give things a second life instead of throwing them away!",
    icon: "♻️",
    actions: [
      "Use both sides of paper",
      "Donate old toys and clothes",
      "Make crafts from waste",
      "Separate garbage properly",
    ],
  },
  {
    title: "Use Clean Energy",
    description: "Solar and wind energy are good for our planet!",
    icon: "☀️",
    actions: [
      "Use solar calculators",
      "Dry clothes in sunlight",
      "Walk or cycle short distances",
      "Turn off lights when leaving",
    ],
  },
]

const badPractices = [
  {
    title: "Littering",
    description: "Throwing garbage on streets makes our environment dirty",
    icon: "🗑️",
    impact: "Pollutes water, harms animals, spreads diseases",
  },
  {
    title: "Wasting Water",
    description: "Leaving taps open or overusing water",
    icon: "🚰",
    impact: "Less water for everyone, dry rivers and lakes",
  },
  {
    title: "Cutting Trees",
    description: "Destroying forests and green spaces",
    icon: "🪓",
    impact: "Less oxygen, more pollution, animals lose homes",
  },
  {
    title: "Using Too Much Plastic",
    description: "Single-use plastic bags and bottles",
    icon: "🛍️",
    impact: "Plastic doesn't decompose, harms sea animals",
  },
]

const scenarios = [
  {
    question: "You see someone throwing a plastic bottle on the street. What do you do?",
    options: [
      "Ignore it - it's not my problem",
      "Pick it up and put it in a dustbin",
      "Tell them politely not to litter",
      "Both B and C",
    ],
    correct: 3,
    explanation: "We should both clean up and educate others about keeping our environment clean!",
  },
  {
    question: "Your friend wants to pluck flowers from a public garden. What do you say?",
    options: [
      "Go ahead, there are many flowers",
      "Let's take just one flower",
      "We should leave flowers for everyone to enjoy",
      "Take a photo instead of plucking",
    ],
    correct: 2,
    explanation:
      "Flowers in public spaces are for everyone to enjoy. Taking photos is a better way to remember their beauty!",
  },
]

export default function EnvironmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-teal-600">
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
            <h1 className="text-2xl font-bold text-gray-800">🌍 Environment Heroes</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Be an Environment Hero! 🌍</h2>
        <p className="text-xl text-white/90 drop-shadow mb-8">
          Learn how to protect our beautiful planet and be a responsible citizen!
        </p>
        <div className="text-6xl mb-4">🌱</div>
      </section>

      {/* Good Practices */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
          ✅ Good Practices for Our Planet
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {goodPractices.map((practice, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl text-gray-800">
                  <span className="text-4xl">{practice.icon}</span>
                  <div>
                    <div>{practice.title}</div>
                    <p className="text-sm font-normal text-gray-600 mt-1">{practice.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-green-700 mb-3">How you can help:</h4>
                <ul className="space-y-2">
                  {practice.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bad Practices */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
          ❌ Things That Harm Our Environment
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badPractices.map((practice, index) => (
            <Card key={index} className="bg-red-50 border-red-200 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{practice.icon}</div>
                <CardTitle className="text-lg text-red-800">{practice.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-700 mb-3">{practice.description}</p>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="text-xs text-red-700 font-medium">Impact:</p>
                  <p className="text-xs text-red-600">{practice.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Scenarios */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">🤔 What Would You Do?</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {scenarios.map((scenario, index) => (
            <Card key={index} className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">{scenario.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {scenario.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg border ${
                        optionIndex === scenario.correct
                          ? "bg-green-100 border-green-300"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                      {option}
                      {optionIndex === scenario.correct && <span className="ml-2 text-green-600">✓ Best Answer!</span>}
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Why:</strong> {scenario.explanation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pledge Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <Leaf className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Environment Hero Pledge 🌟</h3>
            <div className="text-lg space-y-2 mb-6">
              <p>"I promise to protect our beautiful Earth by:"</p>
              <p>🌳 Planting trees and caring for plants</p>
              <p>💧 Saving water and using it wisely</p>
              <p>♻️ Reducing waste and recycling</p>
              <p>🚶‍♀️ Walking or cycling when possible</p>
              <p>📚 Learning more about nature</p>
              <p>🤝 Teaching others to care for the environment</p>
            </div>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/quiz/environment">🧠 Take Environment Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Fun Facts */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">🌟 Amazing Environment Facts</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">🌳</div>
              <h4 className="font-bold mb-2">One Tree</h4>
              <p className="text-sm">Can produce oxygen for 2 people for a whole year!</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">♻️</div>
              <h4 className="font-bold mb-2">Recycling</h4>
              <p className="text-sm">
                One recycled plastic bottle can save enough energy to power a light bulb for 3 hours!
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">🐝</div>
              <h4 className="font-bold mb-2">Bees</h4>
              <p className="text-sm">Help pollinate 1/3 of all the food we eat!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
