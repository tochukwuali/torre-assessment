// Service Layer - Handles data fetching and API calls
import { User, CreateUserRequest, UpdateUserRequest } from '@/lib/types/user'

export class UserService {
  private baseUrl = '/api/users'

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.baseUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return response.json()
  }

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return response.json()
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Failed to update user')
    }
    return response.json()
  }

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
  }
}
