'use client'

import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const updateScrollProgress = () => {
      // Get current scroll position and maximum scroll
      const currentScroll = window.scrollY
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      // Calculate percentage (clamped between 0-100)
      const scrolled = Math.min((currentScroll / maxScroll) * 100, 100)
      setScrollProgress(scrolled)
    }

    const throttledScrollHandler = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          updateScrollProgress()
          timeoutId = null
        }, 50)
      }
    }

    // Initial calculation
    updateScrollProgress()

    // Add scroll event listener
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-[100]">
      <div
        className="h-full bg-indigo-600 dark:bg-indigo-400 origin-left"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
