// User interface for profile display
export interface User {
  id: string
  name: string
  headline: string
  location: string
  skills: string[]
  avatar?: string
  username?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  name: string
  headline: string
  location: string
  skills: string[]
  email: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  headline?: string
  location?: string
  skills?: string[]
  avatar?: string
}