import React from 'react'

const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200/70 dark:bg-gray-700/40 rounded ${className}`}
      aria-hidden="true"
    />
  )
}

export default Skeleton
