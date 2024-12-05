'use client'
import { useEffect, useState } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth
  })

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
