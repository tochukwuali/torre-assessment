'use client'

import { useState, useCallback } from 'react'
import { SearchRequest, SearchResult } from '@/lib/types/search'
import { searchUsers } from '@/lib/services/searchService'

export const useSearchViewModel = () => {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'person' | 'organization'>('person')

  const search = useCallback(async (searchQuery: string, type: 'person' | 'organization') => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)
    setQuery(searchQuery)
    setSearchType(type)

    try {
      const searchRequest: SearchRequest = {
        query: searchQuery,
        identityType: type,
        limit: 20,
        meta: true,
        excluding: [],
        excludedPeople: [],
        excludeContacts: true,
      }

      const response = await searchUsers(searchRequest)
      console.log('Search response:', response)
      setResults(response.results)
    } catch (err) {
      console.error('Search error in ViewModel:', err)
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setQuery('')
    setError(null)
  }, [])

  return {
    // State
    results,
    loading,
    error,
    query,
    searchType,
    
    // Actions
    search,
    clearResults,
    
    // Computed
    hasResults: results.length > 0,
    resultCount: results.length,
  }
}
