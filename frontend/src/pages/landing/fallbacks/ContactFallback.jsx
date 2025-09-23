import React from 'react'
import Skeleton from '../../../components/common/Skeleton'

const ContactFallback = () => {
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-[26rem] max-w-full mx-auto mb-3" />
          <Skeleton className="h-5 w-[34rem] max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[0,1,2].map((i)=> (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-56 mb-1" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}
            <div className="p-6 rounded-xl bg-white border">
              <Skeleton className="h-5 w-48 mb-3" />
              {[0,1,2,3].map((i)=> (
                <Skeleton key={i} className="h-4 w-64 mb-2" />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-8 shadow-sm">
            <Skeleton className="h-7 w-56 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-28 w-full mt-6" />
            <Skeleton className="h-12 w-full mt-6 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFallback
