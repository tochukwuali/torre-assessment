'use client'

import { useState, useCallback } from 'react'
import { UserProfile } from '@/lib/types/profile'
import { fetchUserProfile } from '@/lib/services/profileService'

export const useProfileViewModel = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = useCallback(async (username: string) => {
    if (!username.trim()) {
      setError('Username is required')
      return
    }

    setLoading(true)
    setError(null)
    setProfile(null)

    try {
      const response = await fetchUserProfile(username)
      
      if (response.success && response.data) {
        setProfile(response.data)
      } else {
        setError(response.error || 'Failed to load profile')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile'
      setError(errorMessage)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearProfile = useCallback(() => {
    setProfile(null)
    setError(null)
  }, [])

  return {
    // State
    profile,
    loading,
    error,

    // Actions
    loadProfile,
    clearProfile,

    // Computed
    hasProfile: !!profile,
    hasError: !!error,
  }
}
