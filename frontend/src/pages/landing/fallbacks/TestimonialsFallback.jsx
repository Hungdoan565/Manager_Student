import React from 'react'
import Skeleton from '../../../components/common/Skeleton'

const TestimonialsFallback = () => {
  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-80 mx-auto mb-4" />
          <Skeleton className="h-5 w-[28rem] max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0,1,2].map((i)=> (
            <div key={i} className="bg-white rounded-xl border border-border p-8">
              <div className="flex items-center mb-4">
                <Skeleton className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsFallback
