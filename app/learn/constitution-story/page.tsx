import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ConstitutionStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
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
            <h1 className="text-2xl font-bold text-gray-800">📚 Constitution Story</h1>
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
                <span className="text-4xl mr-3">📚</span>
                The Story of Our Constitution
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-4">
              <p>
                The story of the Indian Constitution is like an exciting adventure! It's the tale of how a newly
                independent nation created the longest written constitution in the world.
              </p>
              <p>
                Let's travel back in time to discover how our Constitution was born and the amazing people who created
                it!
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">📅 The Constitutional Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">🇬🇧 Before Independence (1920s-1940s)</h3>
                  <p>
                    Indians had been demanding self-rule for many years. Several committees were formed to draft a
                    constitution for India, including the Nehru Report (1928) and the Sapru Committee (1945). These
                    early efforts laid the groundwork for our Constitution.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">📝 9 December 1946</h3>
                  <p>
                    The Constituent Assembly met for the first time in Delhi. This special group of 299 members was
                    elected to write India's Constitution. Dr. Rajendra Prasad was elected as the President of the
                    Constituent Assembly.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">🔨 13 December 1946</h3>
                  <p>
                    Jawaharlal Nehru moved the historic "Objectives Resolution" that outlined the philosophy and
                    fundamental values of the Constitution. It became the Preamble later.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">🇮🇳 15 August 1947</h3>
                  <p>
                    India gained independence from British rule. The Constituent Assembly now had the dual role of
                    writing the Constitution and acting as the first Parliament of independent India.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">👨‍⚖️ 29 August 1947</h3>
                  <p>
                    The Drafting Committee was formed with Dr. B.R. Ambedkar as its Chairman. This committee was
                    responsible for preparing the draft of the Constitution.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">📄 4 November 1947</h3>
                  <p>
                    The Drafting Committee started its work. They studied constitutions from around the world, including
                    those of the USA, UK, France, and Ireland, to create the best constitution for India.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">📋 26 November 1949</h3>
                  <p>
                    After intense debates and discussions, the Constitution was finally adopted by the Constituent
                    Assembly. This day is now celebrated as Constitution Day in India.
                  </p>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">🎉 26 January 1950</h3>
                  <p>
                    The Constitution of India came into effect, and India became a Republic. This date was chosen
                    because it was on this day in 1930 that the Indian National Congress had declared "Purna Swaraj"
                    (complete independence) from British rule.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Figures */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">👥 Heroes of Our Constitution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-indigo-700 mb-2">Dr. B.R. Ambedkar</h3>
                  <p className="text-gray-700">
                    Known as the "Father of the Indian Constitution," he was the Chairman of the Drafting Committee.
                    Despite facing discrimination as a Dalit, he became one of India's greatest legal minds and fought
                    for equality and justice.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">Dr. Rajendra Prasad</h3>
                  <p className="text-gray-700">
                    As the President of the Constituent Assembly, he guided the discussions and later became the first
                    President of independent India.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">Jawaharlal Nehru</h3>
                  <p className="text-gray-700">
                    He moved the crucial "Objectives Resolution" that later became the Preamble. As India's first Prime
                    Minister, he was instrumental in shaping the vision of the Constitution.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-4 py-2">
                  <h3 className="font-bold text-lg text-pink-700 mb-2">Sarojini Naidu</h3>
                  <p className="text-gray-700">
                    Known as the "Nightingale of India," she was one of the 15 women in the Constituent Assembly and
                    fought for women's rights and equality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interesting Facts */}
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🌟 Amazing Constitution Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">📏</div>
                  <h3 className="font-bold mb-2">Longest Written Constitution</h3>
                  <p className="text-sm">
                    With 395 articles, 12 schedules, and numerous amendments, it's the longest written constitution in
                    the world!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">⏱️</div>
                  <h3 className="font-bold mb-2">2 Years, 11 Months, 18 Days</h3>
                  <p className="text-sm">
                    That's how long it took to create our Constitution - from the first meeting to its adoption!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">🖋️</div>
                  <h3 className="font-bold mb-2">Beautiful Calligraphy</h3>
                  <p className="text-sm">
                    The original Constitution was handwritten by Prem Behari Narain Raizada in beautiful calligraphy!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="font-bold mb-2">Artistic Illustrations</h3>
                  <p className="text-sm">
                    The original Constitution was decorated with beautiful artwork by Nandalal Bose and his team!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bold mb-2">Cost of Creation</h3>
                  <p className="text-sm">
                    Creating the Constitution cost approximately ₹6.4 million (in today's value, that's several crores)!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-bold mb-2">Borrowed Ideas</h3>
                  <p className="text-sm">
                    Our Constitution borrowed ideas from many countries - Fundamental Rights from the USA, Parliamentary
                    system from the UK, and more!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Making Process */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🔨 How Was the Constitution Made?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-indigo-700 mb-2">Step 1: Committees Formation</h3>
                  <p className="text-gray-700">
                    The Constituent Assembly formed various committees to work on different parts of the Constitution.
                    For example, the Fundamental Rights Committee, the Union Powers Committee, and many more.
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">Step 2: Research and Drafting</h3>
                  <p className="text-gray-700">
                    The committees studied constitutions from around the world and Indian needs. They prepared reports
                    and recommendations that were submitted to the Drafting Committee.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">Step 3: Debates and Discussions</h3>
                  <p className="text-gray-700">
                    The Constituent Assembly held intense debates on each article. Members from different backgrounds
                    shared their views to ensure the Constitution represented all Indians.
                  </p>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-pink-700 mb-2">Step 4: Revisions and Final Draft</h3>
                  <p className="text-gray-700">
                    Based on the debates, the draft was revised multiple times. The final draft was prepared and
                    presented to the Assembly for approval.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-700 mb-2">Step 5: Adoption and Signing</h3>
                  <p className="text-gray-700">
                    On 26 November 1949, the Constitution was adopted. Members of the Constituent Assembly signed the
                    Constitution on 24 January 1950, and it came into effect on 26 January 1950.
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
                Now that you've learned about the Constitution's story, let's see how much you remember!
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/quiz/constitution-story">Take Constitution Story Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-white/20 text-white border-white">
              <Link href="/learn/important-amendments">← Important Amendments</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/learn">Back to Learning Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
