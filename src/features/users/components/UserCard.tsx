'use client'

import { User } from '@/lib/types/user'

interface UserCardProps {
  user: User
  onClick?: (user: User) => void
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  const handleClick = () => {
    onClick?.(user)
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement
              if (fallback) {
                fallback.style.display = 'flex'
              }
            }}
          />
        ) : null}
        <div 
          className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 ${
            user.avatar ? 'hidden' : ''
          }`}
        >
          {user.name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
            {user.name}
          </h3>
          {user.username && (
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              @{user.username}
            </p>
          )}
          <p className="text-sm sm:text-base text-gray-600 truncate">
            {user.headline}
          </p>
        </div>
      </div>

      {/* Location */}
      {user.location && user.location !== 'Unknown location' && (
        <div className="mb-3 sm:mb-4 overflow-hidden">
          <div className="flex items-center text-gray-500">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs sm:text-sm truncate">{user.location}</span>
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="flex justify-end overflow-hidden">
        <div className="flex gap-1 sm:gap-2 max-w-full">
          {user.skills.slice(0, 2).map((skill, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap flex-shrink-0"
              title={skill} // Show full skill name on hover
            >
              {skill.length > 15 ? `${skill.slice(0, 15)}...` : skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
