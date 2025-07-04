"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PortfolioFlow = dynamic(() => import("../components/PortfolioFlow"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-screen">
      <h1 className="sr-only">
        Mike Luu&apos;s Portfolio - Math and CS Student, interested in
        databases, automations, and AI. I explore math and film music sometimes.
        I also try writing to be more intellectual.
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PortfolioFlow />
      </Suspense>
    </main>
  );
}
