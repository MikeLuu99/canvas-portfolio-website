"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PortfolioFlow = dynamic(() => import('../components/PortfolioFlow'), { ssr: false })

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <PortfolioFlow />
      </Suspense>
    </main>
  )
}

