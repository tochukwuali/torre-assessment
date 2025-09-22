// Model/Entity - TypeScript interfaces for data structure
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
}
