// View - React component using MVVM pattern
'use client'

import { useUserViewModel } from '../hooks/useUserViewModel'
import { CreateUserRequest } from '@/lib/types/user'
// import { UserCard } from './UserCard'
// import { CreateUserForm } from './CreateUserForm'

export const UserList = () => {
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    userCount,
    hasUsers
  } = useUserViewModel()

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUser(userData)
    } catch (error) {
      // Error is handled by the ViewModel
      console.error('Failed to create user:', error)
    }
  }

  const handleUpdateUser = async (id: string, userData: { name?: string; email?: string }) => {
    try {
      await updateUser(id, userData)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id)
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  if (loading && !hasUsers) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Users ({userCount})
        </h1>
        {/* <CreateUserForm onSubmit={handleCreateUser} loading={loading} /> */}
      </div>

      {hasUsers ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
              loading={loading}
            />
          ))} */}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found</p>
          <p className="text-gray-400">Create your first user to get started</p>
        </div>
      )}
    </div>
  )
}
