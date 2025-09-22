export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Torre Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A minimal Next.js 15 project with TypeScript and Tailwind CSS
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🚀 Project Setup Complete
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Next.js 15</h3>
                <p className="text-green-600">Latest version with App Router</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">TypeScript</h3>
                <p className="text-blue-600">Full type safety</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Tailwind CSS</h3>
                <p className="text-purple-600">Utility-first styling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
