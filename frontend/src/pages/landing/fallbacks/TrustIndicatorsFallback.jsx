import React from 'react'
import Skeleton from '../../../components/common/Skeleton'

const TrustIndicatorsFallback = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-7 w-96 mx-auto mb-3" />
          <Skeleton className="h-5 w-72 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[0,1,2,3].map((i)=> (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-28 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustIndicatorsFallback
