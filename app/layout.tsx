import './globals.css'

import {
  IconBrandTwitch,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Easy Allies',
  description: 'Easy Allies Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.variable} lang="en">
      <body>{children}</body>
    </html>
  )
}
