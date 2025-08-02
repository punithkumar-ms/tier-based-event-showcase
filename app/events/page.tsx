'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { supabase, Event, Tier, TIER_HIERARCHY, TIER_COLORS } from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function EventsPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userTier, setUserTier] = useState<Tier>('free')

  useEffect(() => {
    if (!isLoaded) return
    
    if (!user) {
      router.push('/')
      return
    }

    // Start with free tier for new users
    fetchEvents('free')
  }, [user, isLoaded, router])

  const fetchEvents = async (tier: Tier) => {
    try {
      setLoading(true)
      
      // Fetch all events
      const { data: allEventsData, error: allEventsError } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (allEventsError) {
        throw allEventsError
      }

      setAllEvents(allEventsData || [])

      // Filter events based on user tier
      const userTierLevel = TIER_HIERARCHY[tier]
      const accessibleEvents = allEventsData?.filter(event => {
        const eventTier = event.tier as Tier
        return TIER_HIERARCHY[eventTier] <= userTierLevel
      }) || []

      setEvents(accessibleEvents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const updateTier = (newTier: Tier) => {
    console.log('Updating tier to:', newTier)
    setUserTier(newTier)
    fetchEvents(newTier)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInaccessibleEvents = () => {
    const userTierLevel = TIER_HIERARCHY[userTier]
    return allEvents.filter(event => {
      const eventTier = event.tier as Tier
      return TIER_HIERARCHY[eventTier] > userTierLevel
    })
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const inaccessibleEvents = getInaccessibleEvents()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Showcase</h1>
            <p className="text-sm text-gray-600">
              Current tier: <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${TIER_COLORS[userTier]}`}>
                {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Tier upgrade buttons */}
            <div className="flex gap-2">
              {(['free', 'silver', 'gold', 'platinum'] as Tier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => updateTier(tier)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors border-2 ${
                    userTier === tier
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-indigo-300'
                  }`}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </button>
              ))}
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Success message */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            ✅ Showing {events.length} events for <strong>{userTier}</strong> tier. 
            {inaccessibleEvents.length > 0 && ` ${inaccessibleEvents.length} events require upgrade.`}
          </p>
        </div>

        {/* Accessible Events */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-600">No events available for your tier.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={event.image_url || '/api/placeholder/400/300'}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${TIER_COLORS[event.tier as Tier]}`}>
                        {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(event.event_date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Inaccessible Events */}
        {inaccessibleEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Upgrade to Access</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inaccessibleEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden opacity-75 relative">
                  <div className="relative h-48">
                    <Image
                      src={event.image_url || '/api/placeholder/400/300'}
                      alt={event.title}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${TIER_COLORS[event.tier as Tier]}`}>
                        {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="font-semibold mb-2">🔒 Locked</p>
                        <p className="text-sm">
                          Upgrade to {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} to access
                        </p>
                        <button 
                          onClick={() => updateTier(event.tier as Tier)}
                          className="mt-2 px-3 py-1 bg-white text-gray-900 rounded text-xs font-medium hover:bg-gray-100"
                        >
                          Upgrade Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(event.event_date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}