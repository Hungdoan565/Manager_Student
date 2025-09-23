import React from 'react'
import Skeleton from '../../../components/common/Skeleton'

const CTAFallback = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Skeleton className="h-9 w-[28rem] max-w-full mx-auto mb-4" />
        <Skeleton className="h-5 w-[36rem] max-w-full mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="h-12 w-52 rounded-xl" />
        </div>
      </div>
    </section>
  )
}

export default CTAFallback
