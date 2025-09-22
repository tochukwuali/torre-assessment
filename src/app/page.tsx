'use client'

import { useCallback } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { useSearchViewModel } from '@/features/search/hooks/useSearchViewModel'
import { SearchResults } from '@/features/search/components/SearchResults'

export default function Home() {
  const {
    results,
    loading,
    error,
    query,
    searchType,
    search,
    clearResults,
    hasResults,
  } = useSearchViewModel()

  const handleSearch = useCallback(async (searchQuery: string, type: 'people' | 'organizations') => {
    const searchTypeMap = {
      people: 'person' as const,
      organizations: 'organization' as const,
    }
    
    await search(searchQuery, searchTypeMap[type])
  }, [search])


  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Find Your Next Opportunity
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 px-4 sm:px-0">
            Search for people and organizations to connect with your professional network
          </p>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          {/* Error Display */}
          {error && (
            <div className="mt-6 sm:mt-8 bg-red-50 border border-red-200 rounded-lg p-4 mx-4 sm:mx-0">
              <h3 className="text-red-800 font-semibold text-sm sm:text-base">Search Error</h3>
              <p className="text-red-600 text-sm sm:text-base">{error}</p>
              <button 
                onClick={clearResults}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
              >
                Clear
              </button>
            </div>
          )}
          
                  {/* Search Results */}
                  <SearchResults
                    results={results}
                    loading={loading}
                    query={query}
                    searchType={searchType === 'person' ? 'people' : 'organizations'}
                  />
        </div>
      </div>
    </main>
  )
}
