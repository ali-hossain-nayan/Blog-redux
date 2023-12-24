
'use client'
import Posts from '@/components/Posts'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-400">
      <Posts/>
      {/* here call the Posts component  */}
    </main>
  )
}
