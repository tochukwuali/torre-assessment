import { SearchRequest, SearchResponse } from '@/lib/types/search'

const BASE_URL = 'https://torre.ai/api/entities/_searchStream'

// Custom error classes for better error handling
class SearchError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message)
    this.name = 'SearchError'
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

const extractSkills = (item: any): string[] => {
  const skills: string[] = []
  
  // Check for explicit skills in the response
  if (item.skills && Array.isArray(item.skills)) {
    skills.push(...item.skills.map((skill: any) => 
      typeof skill === 'string' ? skill : skill.name || skill.title || 'Unknown skill'
    ))
  }
  
  // Extract from professional headline if no explicit skills
  if (skills.length === 0 && item.professionalHeadline) {
    const headline = item.professionalHeadline
    const headlineSkills = headline
      .split(/[|,•\-\/]/)
      .map((skill: string) => skill.trim())
      .filter((skill: string) => skill.length > 0)
    
    skills.push(...headlineSkills.slice(0, 5))
  }
  
  return skills
}

const transformResults = (results: any[]): any[] => {
  if (!Array.isArray(results)) {
    return []
  }

  return results
    .filter((item: any) => item && (item.ggId || item.ardaId)) // Only process valid user objects
    .map((item: any) => {
      // Debug: Log the username field to see what's available
      if (item.username) {
        console.log('Username found:', item.username, 'for user:', item.name)
      } else {
        console.log('No username found for user:', item.name, 'Available fields:', Object.keys(item))
      }
      
      return {
        id: item.ggId || item.ardaId?.toString() || Math.random().toString(),
        name: item.name || 'Unknown',
        headline: item.professionalHeadline || 'No headline',
        location: item.locationName || 'Unknown location',
        skills: extractSkills(item),
        avatar: item.imageUrl,
        type: 'person' as const,
        username: item.username,
        completion: item.completion,
        verified: item.verified,
        connections: item.connections || [],
      }
    })
}

const parseStreamData = async (reader: ReadableStreamDefaultReader<Uint8Array>): Promise<any[]> => {
  const decoder = new TextDecoder()
  const results: any[] = []
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      
      // Process complete JSON objects in the buffer
      const lines = buffer.split('\n')
      buffer = lines.pop() || '' // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.trim()) {
          try {
            const data = JSON.parse(line)
            
            // Only collect valid user objects
            if (data && (data.ggId || data.ardaId)) {
              results.push(data)
            }
          } catch (parseError) {
            // Skip invalid JSON lines silently
            continue
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }

  return results
}

export const searchUsers = async (request: SearchRequest): Promise<SearchResponse> => {
  // Validate request
  if (!request.query || request.query.trim().length === 0) {
    throw new SearchError('Search query is required', 400, 'INVALID_QUERY')
  }

  if (request.query.trim().length < 2) {
    throw new SearchError('Search query must be at least 2 characters', 400, 'QUERY_TOO_SHORT')
  }

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: request.query.trim(),
        torreGgId: request.torreGgId || '',
        identityType: request.identityType,
        limit: Math.min(request.limit || 20, 100), // Cap at 100 results
        meta: request.meta || true,
        excluding: request.excluding || [],
        excludedPeople: request.excludedPeople || [],
        excludeContacts: request.excludeContacts || true,
      }),
    })

    // Handle different HTTP status codes
    if (!response.ok) {
      if (response.status === 400) {
        throw new SearchError('Invalid search request', 400, 'BAD_REQUEST')
      } else if (response.status === 401) {
        throw new SearchError('Authentication required', 401, 'UNAUTHORIZED')
      } else if (response.status === 429) {
        throw new SearchError('Too many requests. Please try again later.', 429, 'RATE_LIMITED')
      } else if (response.status >= 500) {
        throw new SearchError('Server error. Please try again later.', response.status, 'SERVER_ERROR')
      } else {
        throw new SearchError(`Request failed with status ${response.status}`, response.status, 'REQUEST_FAILED')
      }
    }

    // Handle streaming response
    const reader = response.body?.getReader()
    if (!reader) {
      throw new SearchError('Unable to read response stream', 500, 'STREAM_ERROR')
    }

    const results = await parseStreamData(reader)
    const transformedResults = transformResults(results)
    
    return {
      results: transformedResults,
      meta: { 
        total: transformedResults.length, 
        page: 1, 
        limit: Math.min(request.limit || 20, 100)
      },
    }
  } catch (error) {
    // Re-throw our custom errors
    if (error instanceof SearchError || error instanceof NetworkError) {
      throw error
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network error. Please check your connection.')
    }
    
    // Handle other unexpected errors
    throw new SearchError('An unexpected error occurred. Please try again.', 500, 'UNKNOWN_ERROR')
  }
}
