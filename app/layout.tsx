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
      <body>
        <nav className="bg-brandDark w-full p-4 pb-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-6">
              <Image
                alt="Easy Allies logo"
                src="/eza-header.png"
                width={180}
                height={39}
              />
              <div className="flex gap-4">
                <Link className="font-semibold text-white" href="/about">
                  About
                </Link>
                <a className="font-semibold text-white" href="/about">
                  Patreon
                </a>
                <a className="font-semibold text-white" href="/about">
                  Merch
                </a>
                <Link className="font-semibold text-white" href="/shows">
                  Shows
                </Link>
                <Link className="font-semibold text-white" href="/reviews">
                  Reviews
                </Link>
                <Link className="font-semibold text-white" href="/exclusives">
                  Exclusives
                </Link>
              </div>
            </div>
            <div className="flex gap-2">
              <IconBrandTwitch color="#fff" />
              <IconBrandYoutube color="#fff" />
              <IconBrandTwitter color="#fff" />
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
