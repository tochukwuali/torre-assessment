'use client'

import { useRouter } from 'next/navigation'
import { SearchResult } from '@/lib/types/search'
import { UserCard } from '@/features/users/components/UserCard'

interface SearchResultsProps {
  results: SearchResult[]
  loading?: boolean
  query?: string
  searchType?: string
  onUserClick?: (user: SearchResult) => void
}

export const SearchResults = ({ 
  results, 
  loading, 
  query, 
  searchType, 
  onUserClick 
}: SearchResultsProps) => {
  const router = useRouter()

  const handleUserClick = (user: any) => {
    // Navigate to profile page using username
    if (!user.username) {
      console.error('No username available for user:', user)
      return
    }
    
    router.push(`/profile/${user.username}`)
    
    // Call the optional onUserClick callback
    onUserClick?.(user)
  }
  if (loading) {
    return (
      <div className="mt-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-600 mt-4 text-center">Searching...</p>
      </div>
    )
  }

  if (!query) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="mt-12 text-center">
        <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500">
          No {searchType} found for "{query}". Try different keywords.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
          Search Results ({results.length})
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {searchType} matching "{query}"
        </p>
      </div>
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
        {results.map((result) => (
          <UserCard
            key={result.id}
            user={{
              id: result.id,
              name: result.name,
              headline: result.headline,
              location: result.location,
              skills: result.skills,
              avatar: result.avatar,
              username: result.username,
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
            onClick={handleUserClick}
          />
        ))}
      </div>
    </div>
  )
}
