import React from 'react'

export default function RiskGauge({ score = 80, maxScore = 100 }) {
  const percentage = Math.min(Math.max(score / maxScore, 0), 1)

  const radius = 80
  const strokeWidth = 12
  const center = 100
  
  const arcLength = Math.PI * radius
  const filledOffset = arcLength * (1 - percentage)

  const angle = Math.PI * (1 - percentage)
  const handleX = center + radius * Math.cos(angle)
  const handleY = center - radius * Math.sin(angle)

  return (
    <div className="relative flex flex-col items-center justify-center w-52 h-32">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
        <path
          d="M 20,100 A 80,80 0 0,1 180,100"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <path
          d="M 20,100 A 80,80 0 0,1 180,100"
          fill="none"
          stroke="#e11d48"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={filledOffset}
          className="transition-all duration-700 ease-out"
        />

        <circle
          cx={handleX}
          cy={handleY}
          r="10"
          fill="white"
          stroke="#e11d48"
          strokeWidth="4"
          className="shadow-md transition-all duration-700 ease-out"
        />
      </svg>

      <div className="absolute bottom-1 flex items-baseline font-bold font-sans">
        <span className="text-2xl text-[#e11d48]">{score}</span>
        <span className="text-xl text-slate-500 font-medium">/{maxScore}</span>
      </div>
    </div>
  )
}
