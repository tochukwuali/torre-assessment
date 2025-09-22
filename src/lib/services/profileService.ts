import { UserProfile, ProfileResponse } from '@/lib/types/profile'

const BASE_URL = 'https://torre.ai/api/genome/bios'

// Custom error classes for better error handling
class ProfileError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message)
    this.name = 'ProfileError'
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

const transformProfileData = (data: any): UserProfile => {
  if (!data) {
    throw new ProfileError('No profile data received', 404, 'NO_DATA')
  }

  return {
    id: data.ggId || data.ardaId?.toString() || Math.random().toString(),
    name: data.name || 'Unknown',
    username: data.username || data.publicId || '',
    headline: data.professionalHeadline || data.headline || 'No headline',
    location: data.locationName || data.location || 'Unknown location',
    skills: extractSkills(data),
    avatar: data.imageUrl || data.avatar,
    completion: data.completion,
    verified: data.verified || false,
    connections: data.connections || [],
    summary: data.summary,
    experience: transformExperience(data.experience || []),
    education: transformEducation(data.education || []),
    achievements: transformAchievements(data.achievements || []),
    interests: data.interests || [],
    languages: transformLanguages(data.languages || []),
    contact: transformContact(data.contact || {}),
  }
}

const extractSkills = (data: any): string[] => {
  const skills: string[] = []
  
  // Check for explicit skills
  if (data.skills && Array.isArray(data.skills)) {
    skills.push(...data.skills.map((skill: any) => 
      typeof skill === 'string' ? skill : skill.name || skill.title || 'Unknown skill'
    ))
  }
  
  // Extract from professional headline if no explicit skills
  if (skills.length === 0 && data.professionalHeadline) {
    const headline = data.professionalHeadline
    const headlineSkills = headline
      .split(/[|,•\-\/]/)
      .map((skill: string) => skill.trim())
      .filter((skill: string) => skill.length > 0)
    
    skills.push(...headlineSkills.slice(0, 10)) // More skills for profile page
  }
  
  return skills
}

const transformExperience = (experience: any[]): any[] => {
  if (!Array.isArray(experience)) return []
  
  return experience.map((exp: any) => ({
    id: exp.id || Math.random().toString(),
    title: exp.title || exp.position || 'Unknown Position',
    company: exp.company || exp.organization || 'Unknown Company',
    location: exp.location || exp.city || 'Unknown Location',
    startDate: exp.startDate || exp.from || '',
    endDate: exp.endDate || exp.to || undefined,
    description: exp.description || exp.summary,
    current: exp.current || exp.isCurrent || false,
  }))
}

const transformEducation = (education: any[]): any[] => {
  if (!Array.isArray(education)) return []
  
  return education.map((edu: any) => ({
    id: edu.id || Math.random().toString(),
    institution: edu.institution || edu.school || 'Unknown Institution',
    degree: edu.degree || edu.field || 'Unknown Degree',
    field: edu.field || edu.major || edu.specialization || 'Unknown Field',
    startDate: edu.startDate || edu.from || '',
    endDate: edu.endDate || edu.to || undefined,
    description: edu.description || edu.summary,
  }))
}

const transformAchievements = (achievements: any[]): any[] => {
  if (!Array.isArray(achievements)) return []
  
  return achievements.map((achievement: any) => ({
    id: achievement.id || Math.random().toString(),
    title: achievement.title || achievement.name || 'Unknown Achievement',
    issuer: achievement.issuer || achievement.organization || 'Unknown Issuer',
    date: achievement.date || achievement.issuedDate || '',
    description: achievement.description || achievement.summary,
    url: achievement.url || achievement.certificateUrl,
  }))
}

const transformLanguages = (languages: any[]): any[] => {
  if (!Array.isArray(languages)) return []
  
  return languages.map((lang: any) => ({
    language: lang.language || lang.name || 'Unknown Language',
    proficiency: lang.proficiency || lang.level || 'Unknown',
  }))
}

const transformContact = (contact: any): any => {
  return {
    email: contact.email,
    phone: contact.phone,
    website: contact.website || contact.personalWebsite,
    linkedin: contact.linkedin || contact.linkedIn,
    github: contact.github,
    twitter: contact.twitter,
  }
}

export const fetchUserProfile = async (username: string): Promise<ProfileResponse> => {
  // Validate username
  if (!username || username.trim().length === 0) {
    throw new ProfileError('Username is required', 400, 'INVALID_USERNAME')
  }

  try {
    const response = await fetch(`${BASE_URL}/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Handle different HTTP status codes
    if (!response.ok) {
      if (response.status === 404) {
        throw new ProfileError('User profile not found', 404, 'USER_NOT_FOUND')
      } else if (response.status === 400) {
        throw new ProfileError('Invalid username format', 400, 'INVALID_USERNAME')
      } else if (response.status === 429) {
        throw new ProfileError('Too many requests. Please try again later.', 429, 'RATE_LIMITED')
      } else if (response.status >= 500) {
        throw new ProfileError('Server error. Please try again later.', response.status, 'SERVER_ERROR')
      } else {
        throw new ProfileError(`Request failed with status ${response.status}`, response.status, 'REQUEST_FAILED')
      }
    }

    const data = await response.json()
    const transformedProfile = transformProfileData(data)

    return {
      success: true,
      data: transformedProfile,
    }
  } catch (error) {
    // Re-throw our custom errors
    if (error instanceof ProfileError || error instanceof NetworkError) {
      throw error
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network error. Please check your connection.')
    }
    
    // Handle other unexpected errors
    throw new ProfileError('An unexpected error occurred. Please try again.', 500, 'UNKNOWN_ERROR')
  }
}
