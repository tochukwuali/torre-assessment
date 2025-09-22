// Search request and response types
export interface SearchRequest {
  query: string
  torreGgId?: string
  identityType: 'person' | 'organization'
  limit?: number
  meta?: boolean
  excluding?: string[]
  excludedPeople?: string[]
  excludeContacts?: boolean
}

export interface SearchResult {
  id: string
  name: string
  headline: string
  location: string
  skills: string[]
  avatar?: string
  type: 'person' | 'organization'
  username?: string
  completion?: number
  verified?: boolean
  connections?: any[]
}

export interface SearchResponse {
  results: SearchResult[]
  meta?: {
    total: number
    page: number
    limit: number
  }
}
