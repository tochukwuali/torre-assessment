// Atomic Component - Individual user card
'use client'

import { useState } from 'react'
import { User } from '@/lib/types/user'

interface UserCardProps {
  user: User
  onUpdate: (id: string, data: { name?: string; email?: string }) => Promise<void>
  onDelete: (id: string) => Promise<void>
  loading: boolean
}

export const UserCard = ({ user, onUpdate, onDelete, loading }: UserCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email
  })

  const handleSave = async () => {
    try {
      await onUpdate(user.id, editData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleCancel = () => {
    setEditData({ name: user.name, email: user.email })
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                disabled={loading}
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                disabled={loading}
              />
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        Created: {new Date(user.createdAt).toLocaleDateString()}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(user.id)}
              disabled={loading}
              className="flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
