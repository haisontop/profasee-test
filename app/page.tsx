import Image from 'next/image'
import Profit from './_components/Profit'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Profit/>
    </main>
  )
}
