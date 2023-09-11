'use client'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import React from 'react'
import {
  A11y,
  Autoplay,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { SwiperClass, SwiperProps, Swiper, SwiperSlide } from 'swiper/react'
import { NavigationOptions } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface CarouselProps extends SwiperProps {
  children: React.ReactNode
  iconColor?: string
}

const Carousel = ({
  children,
  iconColor = 'brandGreen',
  ...sliderProps
}: CarouselProps) => {
  const [swiper, setSwiper] = React.useState<SwiperClass>()
  const prevRef = React.useRef<HTMLButtonElement>(null)
  const nextRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (swiper) {
      const navigation = swiper.params.navigation as NavigationOptions
      navigation.prevEl = prevRef.current
      navigation.nextEl = nextRef.current
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [swiper])

  return (
    <div className="flex items-center justify-center gap-8">
      <button
        className={`text-${iconColor} disabled:text-gray-400`}
        ref={prevRef}
      >
        <IconChevronLeft size="32px" />
      </button>
      <Swiper
        className="min-w-0"
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Controller,
          Autoplay,
        ]}
        updateOnWindowResize
        observer
        observeParents
        {...sliderProps}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        onSwiper={setSwiper}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`text-${iconColor} disabled:text-gray-400`}
        ref={nextRef}
      >
        <IconChevronRight size="32px" />
      </button>
    </div>
  )
}

export default Carousel
