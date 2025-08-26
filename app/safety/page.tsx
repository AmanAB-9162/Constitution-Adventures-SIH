"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Phone, AlertTriangle, Heart } from "lucide-react"

const emergencyNumbers = [
  { service: "Police", number: "112", icon: "🚓", description: "For any emergency or crime" },
  { service: "Ambulance", number: "102 / 108", icon: "🚑", description: "Medical emergencies" },
  { service: "Fire Department", number: "101", icon: "🚒", description: "Fire emergencies" },
  { service: "Child Helpline", number: "1098", icon: "👶", description: "Help for children in need" },
  { service: "Women Helpline", number: "1091", icon: "👩", description: "Help for women in distress" },
  { service: "Disaster Response", number: "1938", icon: "🌊", description: "Natural disasters" },
  { service: "Cyber Crime", number: "1930", icon: "💻", description: "Online safety issues" },
  { service: "Mental Health", number: "9152987821", icon: "🧠", description: "Mental health support" },
]

const safetyTips = [
  {
    title: "How to Call for Help",
    tips: [
      "Stay calm and speak clearly",
      "Give your exact location",
      "Explain what happened",
      "Follow the operator's instructions",
      "Don't hang up until told to do so",
    ],
    icon: "📞",
  },
  {
    title: "Online Safety",
    tips: [
      "Never share personal information online",
      "Tell a trusted adult about cyberbullying",
      "Don't meet strangers from the internet",
      "Use strong passwords",
      "Report suspicious activities",
    ],
    icon: "🔒",
  },
  {
    title: "At Home Safety",
    tips: [
      "Know your home address and phone number",
      "Don't open doors to strangers",
      "Know where emergency exits are",
      "Keep emergency numbers handy",
      "Tell parents where you're going",
    ],
    icon: "🏠",
  },
  {
    title: "Road Safety",
    tips: [
      "Always wear seatbelts in cars",
      "Look both ways before crossing",
      "Use pedestrian crossings",
      "Wear bright colors when walking",
      "Never play on roads",
    ],
    icon: "🚦",
  },
]

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-purple-600">
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
            <h1 className="text-2xl font-bold text-gray-800">🛡️ Safety First</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Stay Safe, Stay Smart! 🛡️</h2>
        <p className="text-xl text-white/90 drop-shadow mb-8">
          Learn important emergency numbers and safety tips to protect yourself and others.
        </p>
      </section>

      {/* Emergency Numbers */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
          📞 Emergency Numbers to Remember
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyNumbers.map((emergency, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{emergency.icon}</div>
                <CardTitle className="text-lg text-gray-800">{emergency.service}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{emergency.number}</div>
                <p className="text-sm text-gray-600">{emergency.description}</p>
                <Button
                  className="mt-3 w-full bg-red-600 hover:bg-red-700"
                  onClick={() => window.open(`tel:${emergency.number.replace(" / ", "")}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Safety Tips */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">💡 Safety Tips for Smart Kids</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {safetyTips.map((category, index) => (
            <Card key={index} className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl text-gray-800">
                  <span className="text-3xl">{category.icon}</span>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Test Your Safety Knowledge!</h3>
            <p className="text-lg mb-6">
              Take our safety quiz to see how well you know emergency procedures and safety tips.
            </p>
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/quiz/safety">🧠 Take Safety Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Remember Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center text-white">
            <Heart className="w-12 h-12 mx-auto mb-4 text-red-300" />
            <h3 className="text-2xl font-bold mb-4">Remember: You Are Important! ❤️</h3>
            <div className="grid md:grid-cols-3 gap-6 text-lg">
              <div>
                <div className="text-3xl mb-2">🗣️</div>
                <p>Always tell a trusted adult if you feel unsafe</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <p>Help others when they need it, but stay safe</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <p>Keep emergency numbers saved in your phone</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
