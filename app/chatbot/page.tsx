"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// Comprehensive knowledge base for ConstituBot
const knowledgeBase = {
  // Basic greetings and help
  greetings: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "namaste"],
  help: ["help", "what can you do", "commands", "options"],

  // Constitution basics
  constitution: ["constitution", "basic law", "supreme law", "constitutional", "founding document"],

  // Preamble related
  preamble: ["preamble", "we the people", "introduction", "beginning", "opening"],

  // Rights related
  rights: [
    "rights",
    "fundamental rights",
    "basic rights",
    "citizen rights",
    "human rights",
    "right to equality",
    "right to freedom",
    "right against exploitation",
    "right to freedom of religion",
    "cultural rights",
    "educational rights",
    "right to constitutional remedies",
  ],

  // Duties related
  duties: ["duties", "fundamental duties", "citizen duties", "responsibilities", "obligations", "civic duties"],

  // Government structure
  government: [
    "government",
    "parliament",
    "lok sabha",
    "rajya sabha",
    "president",
    "prime minister",
    "chief justice",
    "supreme court",
    "high court",
    "state government",
    "central government",
    "federal",
    "union",
  ],

  // Democracy related
  democracy: ["democracy", "democratic", "elections", "voting", "ballot", "representative", "people's rule"],

  // Amendments
  amendments: [
    "amendment",
    "changes",
    "modifications",
    "constitutional changes",
    "42nd amendment",
    "44th amendment",
    "constitutional amendment",
  ],

  // Important personalities
  personalities: [
    "ambedkar",
    "dr ambedkar",
    "father of constitution",
    "gandhi",
    "nehru",
    "patel",
    "constitutional assembly",
    "drafting committee",
  ],

  // States and territories
  geography: [
    "states",
    "union territories",
    "28 states",
    "8 union territories",
    "delhi",
    "mumbai",
    "kolkata",
    "chennai",
  ],

  // Age related queries
  age: ["voting age", "18 years", "age to vote", "minimum age", "eligibility age"],
}

const responses = {
  greetings: [
    "Hello there! 👋 I'm ConstituBot, your friendly Constitution helper! How can I help you learn about our amazing Constitution today?",
    "Hi! 🌟 Welcome to your Constitution learning journey! I'm here to make learning fun and easy. What would you like to explore?",
    "Namaste! 🙏 I'm ConstituBot, ready to help you discover the wonders of the Indian Constitution! Ask me anything!",
    "Hey there, young learner! 😊 I'm excited to help you understand our Constitution. What's on your curious mind today?",
  ],

  help: `I'm your Constitution expert! Here's what I can help you with:

📚 **Constitution Basics**: Learn about our supreme law
🏛️ **Preamble**: "We, the people of India..." and its meaning
⚖️ **Fundamental Rights**: Your 6 basic rights as a citizen
🤝 **Fundamental Duties**: Your 11 responsibilities as a citizen
🏛️ **Government Structure**: Parliament, President, Prime Minister, Courts
🗳️ **Democracy**: How our democratic system works
📝 **Amendments**: Changes made to the Constitution
👨‍⚖️ **Important People**: Dr. Ambedkar and other Constitution makers
🗺️ **States & Territories**: India's 28 states and 8 union territories
🎂 **Age Requirements**: Voting age, eligibility for offices

Just ask me about any of these topics! You can say things like:
• "Tell me about fundamental rights"
• "What is the preamble?"
• "How does democracy work?"
• "Who made the Constitution?"
• "What are my duties as a citizen?"

I'm here to make learning fun and easy! 🎉`,

  constitution: [
    "The Constitution of India is our country's most important book of rules! 📚 It was written by very smart people led by Dr. B.R. Ambedkar between 1946-1950. It tells us about our rights, duties, and how our government should work. It's like a guidebook for running our entire country! What specific part would you like to know about?",
    "Think of the Constitution as India's biggest rulebook! 📖 It has 395 articles (rules) and tells everyone - from the President to regular citizens like you - what they can and cannot do. It protects your rights and explains your duties. It's been guiding India since January 26, 1950! What aspect interests you most?",
    "Our Constitution is super special! 🌟 It's the longest written constitution in the world and took 2 years, 11 months, and 18 days to write! It ensures justice, liberty, equality, and fraternity for all Indians. It's like a protective shield for our democracy! Want to know about any specific part?",
  ],

  preamble: [
    "The Preamble is like the Constitution's introduction! 🎭 It starts with the famous words 'WE, THE PEOPLE OF INDIA...' and tells us that India is SOVEREIGN (independent), SOCIALIST (caring for all), SECULAR (respects all religions), DEMOCRATIC (people choose leaders), and a REPUBLIC (elected head of state). It's like India's promise to its citizens! 🇮🇳",
    "The Preamble is our Constitution's beautiful opening! ✨ It says we Indians have decided to make our country just, free, equal, and united. The key words are: JUSTICE (fairness), LIBERTY (freedom), EQUALITY (same treatment), and FRATERNITY (brotherhood). It's like our national promise! What part would you like to understand better?",
    "Think of the Preamble as India's mission statement! 🎯 It was adopted on November 26, 1949, and tells the world what kind of country we want to be. The words 'SOCIALIST', 'SECULAR', and 'INTEGRITY' were added later in 1976. It's our guiding light! Want to know more about any specific word?",
  ],

  rights: [
    "You have 6 amazing Fundamental Rights! ⚖️\n\n1. **Right to Equality** - Everyone is treated equally\n2. **Right to Freedom** - Freedom of speech, movement, profession\n3. **Right against Exploitation** - No child labor, no forced work\n4. **Right to Freedom of Religion** - Practice any religion freely\n5. **Cultural and Educational Rights** - Protect your culture and get education\n6. **Right to Constitutional Remedies** - Go to court if rights are violated\n\nThese rights make you a free and equal citizen! Which one interests you most? 🤔",
    "Your Fundamental Rights are like superpowers! 💪 They protect you from unfair treatment and give you freedoms. For example, you can speak your mind (freedom of speech), choose your job (freedom of profession), and practice your religion freely! If anyone violates these rights, you can go to court. Dr. Ambedkar called Article 32 (Right to Constitutional Remedies) the 'heart and soul' of the Constitution! Want details about any specific right?",
    "Fundamental Rights are your basic protections as an Indian citizen! 🛡️ They ensure you're treated fairly regardless of your religion, caste, gender, or background. These rights can only be changed by constitutional amendments, making them very strong! They balance individual freedom with social responsibility. Which right would you like to explore deeper?",
  ],

  duties: [
    "You have 11 Fundamental Duties as an Indian citizen! 🤝\n\n1. Respect the Constitution and national symbols\n2. Follow the noble ideals of our freedom struggle\n3. Protect India's unity and integrity\n4. Defend the country when needed\n5. Promote harmony among all Indians\n6. Value our rich heritage and culture\n7. Protect the environment and wildlife\n8. Develop scientific thinking and humanism\n9. Safeguard public property\n10. Strive for excellence in all activities\n11. Provide education opportunities to children (added in 2002)\n\nThese duties make you a responsible citizen! Which one resonates with you most? 🌟",
    "Fundamental Duties were added to our Constitution in 1976 through the 42nd Amendment! 📝 They remind us that rights come with responsibilities. While rights protect you, duties help build a better society. For example, while you have the right to free speech, you also have the duty to promote harmony! It's all about balance. Want to know more about how to practice any specific duty?",
    "Your Fundamental Duties are like a citizen's code of conduct! 👨‍🎓 They were inspired by the Constitution of the former Soviet Union and help create responsible citizens. Unlike rights, duties are not legally enforceable, but they're morally binding. They help build national character and unity! Which duty do you think is most important for young people like you?",
  ],

  government: [
    "India has a fascinating government structure! 🏛️\n\n**Central Government:**\n• President (Head of State) - like a ceremonial leader\n• Prime Minister (Head of Government) - the real decision maker\n• Parliament (Lok Sabha + Rajya Sabha) - makes laws\n• Supreme Court - highest court, protects Constitution\n\n**State Governments:**\n• Governor (appointed by President)\n• Chief Minister (elected leader)\n• State Assembly - makes state laws\n• High Courts - state's highest court\n\nIt's like a big team working together! What part interests you most? 🤔",
    "Our government works on three levels - Central, State, and Local! 🏢 The Central government handles big issues like defense and foreign policy. State governments manage education, health, and police. Local governments (Panchayats and Municipalities) handle local issues like water supply and roads. This division of power is called federalism! Which level would you like to understand better?",
    "The Indian government has three branches - like three friends working together! 👥\n\n1. **Legislative** (Parliament) - Makes laws\n2. **Executive** (President, PM, Ministers) - Implements laws\n3. **Judiciary** (Courts) - Interprets laws\n\nThis separation ensures no one becomes too powerful! It's called 'checks and balances.' Want to know more about any specific branch?",
  ],

  democracy: [
    "Democracy means 'rule by the people!' 🗳️ In India, we choose our leaders through elections every 5 years. Every citizen aged 18 and above can vote! We have the world's largest democracy with over 900 million voters! Your vote is your voice in deciding who governs the country. Democracy ensures everyone's opinion matters, not just the rich or powerful! When you turn 18, you'll get this amazing power too! 🌟",
    "Indian democracy is like a huge festival of choice! 🎉 We have multi-party system where different political parties compete for your vote. The party that wins majority forms the government. We also have free press, independent judiciary, and regular elections. This ensures power doesn't stay with one person or group forever! Democracy gives you the right to criticize the government and demand better! Pretty cool, right? 😊",
    "Democracy in India has some special features! ✨ We have universal adult suffrage (everyone 18+ can vote), secret ballot (your vote is private), and regular elections. We also have reservation system to ensure representation for all communities. Our democracy is not just about voting - it's about participation, debate, and holding leaders accountable! What aspect of democracy excites you most?",
  ],

  amendments: [
    "Constitutional Amendments are like updates to our Constitution! 📝 So far, we've made 105 amendments (changes) since 1950! Some famous ones:\n\n• **1st Amendment (1951)** - Added restrictions on free speech\n• **42nd Amendment (1976)** - Added 'Socialist' and 'Secular' to Preamble, added Fundamental Duties\n• **44th Amendment (1978)** - Made right to property a legal right, not fundamental right\n• **86th Amendment (2002)** - Made education a fundamental right\n\nAmendments help the Constitution stay relevant with changing times! Which amendment interests you most? 🤔",
    "Making constitutional amendments is not easy - and that's good! 🛡️ It requires special majority in Parliament (more than 50% of total members + 2/3rd of present members). Some amendments also need approval from half the state legislatures. This ensures our Constitution isn't changed casually! The process protects our basic rights while allowing necessary changes. Want to know about the amendment process in detail?",
    "Constitutional amendments show how our Constitution is a 'living document!' 🌱 It grows and adapts with time. For example, the 73rd and 74th amendments strengthened local governments, while the 86th amendment made education a fundamental right. Each amendment reflects India's evolving needs and values! Which area do you think needs constitutional changes today?",
  ],

  personalities: [
    "Dr. B.R. Ambedkar is called the 'Father of the Indian Constitution!' 👨‍⚖️ He was the Chairman of the Drafting Committee and spent years crafting our Constitution. Despite facing discrimination due to his caste, he became one of India's greatest legal minds! He ensured our Constitution protects everyone equally. Other important members included Jawaharlal Nehru, Sardar Patel, Maulana Azad, and Sarojini Naidu. The Constituent Assembly had 299 members who worked tirelessly! Want to know more about any specific personality? 🌟",
    "The Constitution makers were incredible people! ✨ Dr. Ambedkar studied constitutions of 60+ countries before drafting ours! Jawaharlal Nehru gave the famous 'Tryst with Destiny' speech. Sardar Patel united 562 princely states into India. These visionaries came from different backgrounds but shared one dream - a free, fair, and united India! Their debates and discussions shaped our nation's future! Which personality inspires you most?",
    "Our Constitution makers were true heroes! 🦸‍♂️ They included freedom fighters, lawyers, social reformers, and scholars. Women like Sarojini Naidu, Hansa Mehta, and Dakshayani Velayudhan played crucial roles. They represented different regions, religions, and communities, ensuring our Constitution reflects India's diversity! The Constituent Assembly met for 2 years, 11 months, and 18 days. Their dedication gave us this amazing Constitution! Want to learn about their specific contributions?",
  ],

  geography: [
    "India has 28 states and 8 union territories! 🗺️\n\n**Some major states:** Uttar Pradesh (most populous), Rajasthan (largest), Goa (smallest), Maharashtra (richest), Kerala (most literate)\n\n**Union Territories:** Delhi (capital), Chandigarh, Puducherry, Andaman & Nicobar Islands, Lakshadweep, Dadra & Nagar Haveli and Daman & Diu, Ladakh, Jammu & Kashmir\n\nEach state has its own government, language, and culture! Union territories are directly governed by the Central government. India's diversity is its strength! Which state or territory would you like to know more about? 🤔",
    "India's federal structure is amazing! 🌟 States have their own governments and can make laws on subjects like education, health, and agriculture. The Central government handles defense, foreign policy, and currency. Some subjects like criminal law are handled by both! This division helps manage our huge, diverse country effectively. The newest state is Telangana (2014) and newest union territories are Ladakh and Jammu & Kashmir (2019)! Want to know about the state formation process?",
    "Our states and union territories showcase India's incredible diversity! 🎨 Each has unique languages, festivals, food, and traditions. For example, Punjab is famous for agriculture, Karnataka for IT, Goa for tourism, and Jharkhand for minerals! This diversity makes India special - we're like 'unity in diversity!' The Constitution ensures each state's culture is protected while maintaining national unity. Which state's culture fascinates you most?",
  ],

  age: [
    "Age requirements in Indian democracy are interesting! 🎂\n\n• **18 years** - Voting, marriage for girls\n• **21 years** - Marriage for boys, MLA candidate\n• **25 years** - Lok Sabha MP candidate\n• **30 years** - Rajya Sabha MP, State Legislative Council\n• **35 years** - President, Governor\n\nThese age limits ensure maturity and experience for important positions! When you turn 18, you'll get the power to choose India's leaders through your vote! Are you excited about voting when you turn 18? 🗳️",
    "The voting age in India is 18 years! 🗳️ This was reduced from 21 years in 1989 through the 61st Constitutional Amendment. The idea was that 18-year-olds are mature enough to make informed decisions about the country's future! In many countries, the voting age is still 21. India recognized that young people have fresh ideas and should have a say in governance! What do you think about the voting age being 18?",
    "Age requirements ensure people have enough experience for important roles! 🎯 For example, to become President, you need to be 35+ because it's a very responsible position. But for voting, 18 is perfect because young people understand current issues and will live with the consequences of elections the longest! It's about balancing maturity with representation. What position would you like to hold when you grow up?",
  ],

  default: [
    "That's a great question! 🤔 I'm still learning about that topic. Could you try asking me about:\n• Fundamental Rights and Duties\n• The Preamble and its meaning\n• How democracy works in India\n• Government structure (Parliament, President, PM)\n• Constitutional amendments\n• Dr. Ambedkar and Constitution makers\n• States and Union Territories\n\nOr just type 'help' to see everything I can help with! I'm here to make learning fun! 😊",
    "Hmm, I might need to study that topic more! 📚 But I'm really good at explaining:\n• The Constitution and its importance\n• Your rights and responsibilities as a citizen\n• How elections and democracy work\n• The story of how our Constitution was made\n• Different parts of government\n\nTry asking me something like 'What are fundamental rights?' or 'Tell me about Dr. Ambedkar!' I love sharing knowledge! 🌟",
    "I'm not sure about that specific topic, but I'm full of knowledge about the Constitution! 🏛️ Ask me about:\n• Why the Constitution is important\n• What rights you have as a citizen\n• How the government works\n• The people who made our Constitution\n• How democracy helps everyone\n\nI'm here to make learning about our Constitution fun and easy! What would you like to explore? 🚀",
  ],
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm ConstituBot! 🤖 I'm here to help you learn about the Indian Constitution in a fun and interactive way! I know all about your rights, duties, democracy, government structure, and much more! Ask me anything about the Constitution, or just say 'help' to see what I can do! 😊",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const findBestMatch = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check each category in knowledge base
    for (const [category, keywords] of Object.entries(knowledgeBase)) {
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword)) {
          if (category === "greetings") {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)]
          } else if (responses[category as keyof typeof responses]) {
            const response = responses[category as keyof typeof responses]
            if (Array.isArray(response)) {
              return response[Math.floor(Math.random() * response.length)]
            } else {
              return response
            }
          }
        }
      }
    }

    // If no match found, return a random default response
    return responses.default[Math.floor(Math.random() * responses.default.length)]
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    const botResponse: Message = {
      id: messages.length + 2,
      text: findBestMatch(inputText),
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage, botResponse])
    setInputText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What are fundamental rights?",
    "Tell me about democracy",
    "What is the preamble?",
    "What are our duties?",
    "Who made the Constitution?",
    "How does government work?",
    "What is voting age?",
    "Help",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
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
            <h1 className="text-2xl font-bold text-gray-800">🤖 ConstituBot AI</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="h-[600px] bg-white/95 backdrop-blur-sm shadow-xl flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span>ConstituBot AI - Your Smart Constitution Helper</span>
              <div className="ml-auto flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online & Learning</span>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && <Bot className="w-5 h-5 mt-0.5 text-blue-600" />}
                    {message.sender === "user" && <User className="w-5 h-5 mt-0.5 text-white" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Quick Questions */}
          <div className="px-4 py-2 border-t">
            <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about the Constitution..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
