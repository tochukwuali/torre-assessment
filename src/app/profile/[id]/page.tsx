'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useProfileViewModel } from '@/features/profile/hooks/useProfileViewModel'

export default function UserProfilePage() {
  const params = useParams()
  const username = params.id as string
  const { profile, loading, error, loadProfile } = useProfileViewModel()

  useEffect(() => {
    if (username) {
      loadProfile(username)
    }
  }, [username, loadProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || (!loading && !profile)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'Profile could not be loaded'}</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back to Search</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Profile</h1>
            <div className="w-16 sm:w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto sm:mx-0"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mx-auto sm:mx-0">
                  {profile.name
                    .split(' ')
                    .map(word => word.charAt(0))
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{profile.name}</h2>
                  {profile.verified && (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                <p className="text-lg sm:text-xl text-gray-600 mb-3">{profile.headline}</p>
                
                {profile.location && profile.location !== 'Unknown location' && (
                  <div className="flex items-center justify-center sm:justify-start text-gray-500 mb-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{profile.location}</span>
                  </div>
                )}

                {profile.username && (
                  <div className="flex items-center justify-center sm:justify-start text-gray-500 mb-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>@{profile.username}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Section */}
            {profile.summary && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">About</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{profile.summary}</p>
              </div>
            )}

            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full"
                      title={skill}
                    >
                      {skill.length > 20 ? `${skill.slice(0, 20)}...` : skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {profile.experience && profile.experience.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Experience</h3>
                <div className="space-y-3 sm:space-y-4">
                  {profile.experience.slice(0, 5).map((exp) => (
                    <div key={exp.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{exp.title}</h4>
                      <p className="text-gray-600 text-sm sm:text-base">{exp.company} • {exp.location}</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 mt-2 text-sm sm:text-base">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {profile.education && profile.education.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Education</h3>
                <div className="space-y-3 sm:space-y-4">
                  {profile.education.slice(0, 3).map((edu) => (
                    <div key={edu.id} className="border-l-4 border-green-500 pl-3 sm:pl-4">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{edu.degree}</h4>
                      <p className="text-gray-600 text-sm sm:text-base">{edu.institution}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{edu.field}</p>
                      {edu.description && (
                        <p className="text-gray-700 mt-2 text-sm sm:text-base">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {profile.completion && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Profile Completion</h4>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${profile.completion * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {Math.round(profile.completion * 100)}%
                    </span>
                  </div>
                </div>
              )}

              {profile.connections && profile.connections.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Connections</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{profile.connections.length} connections</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
