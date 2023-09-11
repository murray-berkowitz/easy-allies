import BlogCard from '@/components/BlogCard'
import SectionHeader from '@/components/SectionHeader'
import { APIResponse, ReviewAPIResponse, ScheduleEvent } from '@/types/home'
import Image from 'next/image'
import Link from 'next/link'

import Carousel from '@/components/Carousel'
import TwitterTimeline from '@/components/Twitter'
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import {
  IconBrandPatreon,
  IconBrandTwitch,
  IconBrandYoutube,
} from '@tabler/icons-react'

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

  const latest = home.shows.find((show) => show.title === 'Newest Uploads')

  const shows = home.shows.filter(
    (show) =>
      show.title !== 'Easy Allies Reviews' && show.title !== 'Newest Uploads'
  )

  const schedule = home.schedule.reduce(
    (acc, event) => {
      const dateObj = new Date(event.date)
      const date = event.noDate
        ? 'Also in the works'
        : dateObj.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })

      if (acc[date]) {
        return { ...acc, [date]: [...acc[date], event] }
      }
      return { ...acc, [date]: [event] }
    },
    {} as Record<string, ScheduleEvent[]>
  )

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
          <h1 className="mb-4 text-4xl font-bold italic text-brandGreen">
            LATEST UPDATES
          </h1>
          <Carousel
            autoplay={{
              delay: 7500,
              pauseOnMouseEnter: true,
            }}
            iconColor="white"
            slidesPerView={1}
          >
            {latest?.episodes.map((episode) => (
              <div className="flex" key={episode.title}>
                <div className="w-3/5">
                  <a
                    href={`https://youtube.com/w/${episode.videoId}`}
                    target="blank"
                  >
                    <img src={episode.thumbs.maxres.url || ''} />
                  </a>
                </div>
                <div className="flex w-2/5 flex-col justify-evenly bg-brandDark/75 px-16 py-8">
                  <h2 className="mb-4 text-4xl font-bold text-white">
                    {episode.title}
                  </h2>
                  <p className="font-medium text-white">
                    {episode.description.split('\n')[0]}
                  </p>
                  <a
                    href={`https://youtube.com/w/${episode.videoId}`}
                    target="blank"
                    className="font-bold text-brandGreen hover:underline"
                  >
                    Watch Now -&gt;
                  </a>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      <div className="relative mx-auto flex max-w-[1440px] gap-24">
        <div className="w-4/5 min-w-0 flex-initial">
          {/* REVIEWS */}
          <section className="py-6">
            <SectionHeader
              title="EASY ALLIES REVIEWS"
              description="Check out our latest reviews for todays hottest games."
              seeAll="https://easyallies.com/#!/reviews"
            />
            <Carousel spaceBetween={48} slidesPerView={2} slidesPerGroup={2}>
              {reviews.map((review) => (
                <BlogCard
                  key={review.episode.title}
                  image={review.episode.thumbs.maxres.url}
                  title={review.episode.title}
                  author={review.writer}
                  description={review.episode.description.split('\n')[0]}
                  watch={`https://youtube.com/w/${review.videoId}`}
                  read={`https://easyallies.com/#!/review/${review.urlTitle}`}
                />
              ))}
            </Carousel>
          </section>
          {shows.map((show) => (
            <section className="py-6" key={show.title}>
              <SectionHeader
                title={show.title.toUpperCase()}
                description={show.description}
                seeAll={`https://www.youtube.com/playlist?list=${show.youtubeId}`}
              />
              <Carousel spaceBetween={48} slidesPerView={3} slidesPerGroup={3}>
                {show.episodes.map((episode) => (
                  <BlogCard
                    key={episode.title}
                    image={episode.thumbs.maxres.url}
                    title={episode.title}
                    description={episode.description.split('\n')[0]}
                    watch={`https://youtube.com/w/${episode.videoId}`}
                  />
                ))}
              </Carousel>
            </section>
          ))}
        </div>
        <aside className="mt-16 w-1/5 flex-initial">
          <h4 className="mb-4 text-xl font-bold italic text-brandDark">
            TWITTER
          </h4>
          <TwitterTimeline screenName="EasyAllies" />
          <h4 className="my-4 text-xl font-bold italic text-brandDark">
            SCHEDULE
          </h4>
          <div className="flex flex-col gap-6">
            {Object.entries(schedule).map(([date, events]) => {
              return (
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-bold text-brandDark">{date}</p>
                  {events.map((event) => {
                    const date = new Date(event.date)
                    const time = event.noDate
                      ? undefined
                      : date.toLocaleString(undefined, {
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                    const endTime = event.duration
                      ? new Date(
                          date.getTime() + event.duration * 60000
                        ).toLocaleString(undefined, {
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : undefined
                    return (
                      <div className="flex w-2/3 flex-none flex-col gap-1 pl-2">
                        <p className="text-sm font-bold text-brandGreen">
                          {event.title}
                        </p>
                        <p className="text-xs italic text-brandDark">
                          {event.description}
                        </p>
                        <p className="align-top text-xs font-semibold text-brandDark">
                          {!event.noDate && time}
                          {endTime && !event.noDate
                            ? `- ${endTime}`
                            : ''} on {event.service}{' '}
                          {event.service === 'Twitch' ? (
                            <IconBrandTwitch
                              className="inline-block"
                              size="14"
                            />
                          ) : event.service === 'Youtube' ? (
                            <IconBrandYoutube
                              className="inline-block"
                              size="14"
                            />
                          ) : (
                            <IconBrandPatreon
                              className="inline-block"
                              size="14"
                            />
                          )}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </main>
  )
}
