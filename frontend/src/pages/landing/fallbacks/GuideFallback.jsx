import React from 'react'
import Skeleton from '../../../components/common/Skeleton'

const GuideFallback = () => {
  return (
    <section id="guide" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-96 mx-auto mb-3" />
          <Skeleton className="h-5 w-[30rem] max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {[0,1,2,3].map((i)=> (
            <div key={i} className="bg-white rounded-xl border border-border p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GuideFallback
