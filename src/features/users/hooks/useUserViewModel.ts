// ViewModel - MVVM pattern for state management and business logic
'use client'

import { useState, useEffect } from 'react'
import { User } from '@/lib/types/user'
import { UserService } from '@/lib/services/userService'

export const useUserViewModel = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const userService = new UserService()

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedUsers = await userService.getUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: { name: string; email: string; password: string }) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = await userService.createUser(userData)
      setUsers(prev => [...prev, newUser])
      return newUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (id: string, userData: { name?: string; email?: string }) => {
    setLoading(true)
    setError(null)
    try {
      const updatedUser = await userService.updateUser(id, userData)
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user))
      return updatedUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await userService.deleteUser(id)
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    // State
    users,
    loading,
    error,
    
    // Actions
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    
    // Computed
    userCount: users.length,
    hasUsers: users.length > 0,
  }
}
