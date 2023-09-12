'use client'
import BlogCard from '@/components/BlogCard'
import SectionHeader from '@/components/SectionHeader'
import { APIResponse, ReviewAPIResponse } from '@/types/home'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

async function getHome() {
  const res = await fetch('https://easyallies.com/api/site/getHome')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getReviews() {
  const formData = new FormData()
  formData.append('method', 'review')
  formData.append('action', 'get')
  formData.append('data[start]', '0')
  formData.append('data[limit]', '10')
  const res = await fetch(
    'https://easyallies.com/api/review/get?method=review&action=get&data%5Bstart%5D=0&data%5Blimit%5D=10',
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const home: APIResponse = await getHome()
  const reviews: ReviewAPIResponse = await getReviews()

  const featuredEpisode = home.shows.find(
    (show) => show.title === 'Easy Allies Podcast'
  )?.episodes[0]

  return (
    <main>
      {/* HERO */}
      <section className="w-full bg-[url('/eza-graphic.png')] bg-cover pb-16">
        <nav className="w-full p-4 pb-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-12">
              <Image
                alt="Easy Allies logo"
                src="/eza.png"
                width={80}
                height={45}
              />
              <div className="flex gap-6">
                <Link
                  className="font-semibold text-white hover:underline"
                  href="/about"
                >
                  About
                </Link>
                <a
                  className="font-semibold text-white hover:underline"
                  href="/about"
                >
                  Patreon
                </a>
                <a
                  className="font-semibold text-white hover:underline"
                  href="/about"
                >
                  Merch
                </a>
                <Link
                  className="font-semibold text-white hover:underline"
                  href="/shows"
                >
                  Shows
                </Link>
                <Link
                  className="font-semibold text-white hover:underline"
                  href="/reviews"
                >
                  Reviews
                </Link>
                <Link
                  className="font-semibold text-white hover:underline"
                  href="/exclusives"
                >
                  Exclusives
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="mx-auto max-w-[1440px]">
          <h1 className="mb-4 text-3xl font-bold italic text-brandGreen">
            LATEST UPDATES
          </h1>
          <div className="flex">
            <div className="w-3/5">
              <a
                href={`https://youtube.com/w/${featuredEpisode?.videoId}`}
                target="blank"
              >
                <img src={featuredEpisode?.thumbs.maxres.url || ''} />
              </a>
            </div>
            <div className="flex w-2/5 flex-col justify-evenly bg-brandDark/75 p-16">
              <h2 className="mb-4 text-3xl font-bold text-white">
                {featuredEpisode?.title}
              </h2>
              <p className="font-medium text-white">
                {featuredEpisode?.description.split('\n')[0]}
              </p>
              <a
                href={`https://youtube.com/w/${featuredEpisode?.videoId}`}
                target="blank"
                className="font-bold text-brandGreen hover:underline"
              >
                Watch Now -&gt;
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="mx-auto max-w-[1440px]">
        <SectionHeader
          title="EASY ALLIES REVIEWS"
          description="Check out our latest reviews for todays hottest games."
          seeAll="https://easyallies.com/#!/reviews"
        />
        <Swiper spaceBetween={72} slidesPerView={3} navigation>
          {reviews.map((review) => (
            <SwiperSlide key={review.episode.title}>
              <BlogCard
                image={review.episode.thumbs.maxres.url}
                title={review.episode.title}
                author={review.writer}
                description={review.episode.description.split('\n')[0]}
                watch={`https://youtube.com/w/${review.videoId}`}
                read={`https://easyallies.com/#!/review/${review.urlTitle}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  )
}
