import React from 'react'
import FeatureSection from './assets/FeatureSection'
import Architecture from './assets/Architecture'
import Technologies from './assets/Technologies'

export default function Dev() {
  return (
    <div className='bg-background max-[400px]:bg-transparent'>
        <FeatureSection />

        <div className='bg-background'>
          <Architecture />

          <Technologies />
        </div>
    </div>
  )
}
