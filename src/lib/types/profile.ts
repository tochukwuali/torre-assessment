export interface UserProfile {
  id: string
  name: string
  username: string
  headline: string
  location: string
  skills: string[]
  avatar?: string
  completion?: number
  verified?: boolean
  connections?: any[]
  // Additional profile fields from the API
  summary?: string
  experience?: Experience[]
  education?: Education[]
  achievements?: Achievement[]
  interests?: string[]
  languages?: Language[]
  contact?: ContactInfo
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description?: string
  current?: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  description?: string
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  date: string
  description?: string
  url?: string
}

export interface Language {
  language: string
  proficiency: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  website?: string
  linkedin?: string
  github?: string
  twitter?: string
}

export interface ProfileResponse {
  success: boolean
  data?: UserProfile
  error?: string
}
