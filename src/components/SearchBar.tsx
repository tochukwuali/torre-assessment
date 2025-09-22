'use client'

import { useState, useEffect, useRef } from 'react'

interface SearchBarProps {
  onSearch: (query: string, type: 'people' | 'organizations') => void
  loading?: boolean
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'people' | 'organizations'>('people')
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const onSearchRef = useRef(onSearch)

  // Keep the ref updated with the latest onSearch function
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  // Handle query changes with debouncing
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Only search if query is not empty
    if (query.trim()) {
      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        onSearchRef.current(query.trim(), searchType)
      }, 500) // Increased debounce time to 500ms
    }

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query]) // Removed searchType from dependencies

  // Handle search type changes - only search if there's already a query
  useEffect(() => {
    if (query.trim()) {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      
      // Immediate search when changing type (if query exists)
      onSearchRef.current(query.trim(), searchType)
    }
  }, [searchType]) // Only trigger when searchType changes

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Clear any pending debounced search
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    // Immediate search on submit
    if (query.trim()) {
      onSearch(query.trim(), searchType)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Search Type Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1 w-full max-w-xs sm:max-w-none">
            <button
              type="button"
              onClick={() => setSearchType('people')}
              disabled={loading}
              className={`w-1/2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                searchType === 'people'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              People
            </button>
            <button
              type="button"
              onClick={() => setSearchType('organizations')}
              disabled={loading}
              className={`w-1/2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                searchType === 'organizations'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Organizations
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={`Search for ${searchType}...`}
              className="block w-full pl-10 pr-16 sm:pr-20 py-3 sm:py-4 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-3 sm:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">{loading ? 'Searching...' : 'Search'}</span>
              <span className="sm:hidden">{loading ? '...' : 'Go'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
