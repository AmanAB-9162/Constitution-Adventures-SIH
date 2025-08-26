import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ImportantAmendmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-green-500">
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
            <h1 className="text-2xl font-bold text-gray-800">📝 Important Amendments</h1>
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
                <span className="text-4xl mr-3">📝</span>
                What are Constitutional Amendments?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-4">
              <p>
                Constitutional Amendments are <strong>changes</strong> made to the Constitution to keep it updated with
                the changing needs of our country.
              </p>
              <p>
                Think of them as <strong>updates</strong> to the Constitution - just like how apps on your phone get
                updates to work better!
              </p>
              <p>
                Since 1950, the Indian Constitution has been amended over <strong>100 times</strong>! Let's learn about
                some of the most important amendments.
              </p>
            </CardContent>
          </Card>

          {/* Important Amendments */}
          <Card className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🇮🇳 Important Constitutional Amendments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">1st Amendment (1951)</h3>
                  <p className="mb-2">
                    Added the Ninth Schedule to protect land reform laws from being challenged in courts.
                  </p>
                  <div className="bg-white/20 p-2 rounded-lg text-sm">
                    <strong>Simple explanation:</strong> Helped farmers get land by making sure rich landlords couldn't
                    use courts to stop land reforms.
                  </div>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">42nd Amendment (1976)</h3>
                  <p className="mb-2">
                    Added the words "SOCIALIST", "SECULAR", and "INTEGRITY" to the Preamble. Also added Fundamental
                    Duties.
                  </p>
                  <div className="bg-white/20 p-2 rounded-lg text-sm">
                    <strong>Simple explanation:</strong> Made it clear that India treats all religions equally and works
                    for everyone's welfare. Also told citizens what duties they should follow.
                  </div>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">44th Amendment (1978)</h3>
                  <p className="mb-2">Removed the Right to Property from Fundamental Rights.</p>
                  <div className="bg-white/20 p-2 rounded-lg text-sm">
                    <strong>Simple explanation:</strong> Made it easier for the government to use land for public
                    purposes like building schools and hospitals.
                  </div>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">73rd and 74th Amendments (1992)</h3>
                  <p className="mb-2">
                    Created Panchayati Raj (village self-government) and Municipalities (city self-government).
                  </p>
                  <div className="bg-white/20 p-2 rounded-lg text-sm">
                    <strong>Simple explanation:</strong> Gave power to local people to make decisions about their
                    villages and cities.
                  </div>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">86th Amendment (2002)</h3>
                  <p className="mb-2">Made education a Fundamental Right for children aged 6-14 years.</p>
                  <div className="bg-white/20 p-2 rounded-lg text-sm">
                    <strong>Simple explanation:</strong> Guaranteed that every child has the right to go to school and
                    get free education.
                  </div>
                </div>

                <div className="bg-white/20 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">101st Amendment (2016)</h3>
                  <p className="mb-2">Introduced the Goods and Services Tax (GST).</p>
                  <div className="bg-white/20 p-2 rounded-lg text-sm">
                    <strong>Simple explanation:</strong> Created one tax system for the whole country instead of
                    different taxes in different states.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How Amendments are Made */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🔨 How Amendments are Made</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Changing the Constitution is not easy! It requires several steps to make sure that changes are made
                  carefully:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                    <h3 className="font-bold text-teal-700 mb-2">Step 1: Bill Introduction</h3>
                    <p className="text-gray-700 text-sm">
                      A bill to amend the Constitution is introduced in either house of Parliament (Lok Sabha or Rajya
                      Sabha).
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-bold text-green-700 mb-2">Step 2: Special Majority</h3>
                    <p className="text-gray-700 text-sm">
                      The bill must be passed by a special majority - at least 2/3rd of the members present and voting.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-700 mb-2">Step 3: President's Approval</h3>
                    <p className="text-gray-700 text-sm">
                      After passing both houses, the President gives assent to the bill, and it becomes an amendment.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
                  <h3 className="font-bold text-yellow-700 mb-2">Special Case: State Approval</h3>
                  <p className="text-gray-700">
                    For some important amendments that affect states' rights, at least half of the state legislatures
                    must also approve the amendment!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🌟 Fun Facts about Amendments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold mb-2">Most Amendments</h3>
                  <p className="text-sm">The Constitution was amended the most during the 1970s and 1980s!</p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">⚖️</div>
                  <h3 className="font-bold mb-2">Basic Structure</h3>
                  <p className="text-sm">
                    The Supreme Court ruled that Parliament cannot change the "basic structure" of the Constitution!
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="text-4xl mb-3">🔄</div>
                  <h3 className="font-bold mb-2">First Amendment</h3>
                  <p className="text-sm">
                    The first amendment was made just one year after the Constitution came into effect!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact on Your Life */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">👦👧 How Amendments Affect Your Life</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-teal-700 mb-2">📚 Right to Education</h3>
                  <p className="text-gray-700">
                    Thanks to the 86th Amendment, you have the right to free education! This is why government schools
                    don't charge fees for children aged 6-14 years.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-700 mb-2">🏫 Local Self-Government</h3>
                  <p className="text-gray-700">
                    The 73rd and 74th Amendments created local governments that solve problems in your village or city,
                    like fixing roads or providing clean water.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">🛒 GST</h3>
                  <p className="text-gray-700">
                    The 101st Amendment created GST, which made prices of goods more uniform across the country. Now, a
                    chocolate costs the same in Delhi and Mumbai!
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">🤝 Fundamental Duties</h3>
                  <p className="text-gray-700">
                    The 42nd Amendment added Fundamental Duties, which remind you to protect the environment, respect
                    the national flag, and promote harmony.
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
                Now that you've learned about Important Amendments, let's see how much you remember!
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/quiz/amendments">Take Amendments Quiz</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-white/20 text-white border-white">
              <Link href="/learn/democracy-in-india">← Democracy in India</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/learn/constitution-story">Next: Constitution Story →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
