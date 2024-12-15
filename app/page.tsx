"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PortfolioFlow = dynamic(() => import('../components/PortfolioFlow'), { ssr: false })

export default function Home() {
  return (
    <main className="w-full h-screen">
      <h1 className="sr-only">Mike Luu's Portfolio - Software Engineer, AI Developer, and Math Enthusiast</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PortfolioFlow />
      </Suspense>
    </main>
  )
}
