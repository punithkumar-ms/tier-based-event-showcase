
import { SignInButton, SignUpButton, } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server' 

import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser()

  if (user) {
    redirect('/events')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tier Event Showcase
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover exclusive events tailored to your membership tier. 
            Join our community and unlock premium experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <SignUpButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                Get Started
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                Sign In
              </button>
            </SignInButton>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-600 font-bold">F</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Tier</h3>
              <p className="text-gray-600">Access to basic community events</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-700 font-bold">S</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Silver Tier</h3>
              <p className="text-gray-600">Workshops and training sessions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-700 font-bold">G</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gold Tier</h3>
              <p className="text-gray-600">VIP events and masterclasses</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-700 font-bold">P</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Platinum Tier</h3>
              <p className="text-gray-600">Exclusive summits and retreats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}