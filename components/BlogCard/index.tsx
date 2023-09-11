import { SOCIALS } from '@/constants'
import { Authors } from '@/types/home'

interface BlogCardProps {
  image: string
  title: string
  author?: Authors
  description: string
  watch: string
  read?: string
}

const BlogCard = ({
  image,
  title,
  author,
  description,
  watch,
  read,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <a href={watch} target="blank">
        <img src={image} alt={description} />
      </a>
      <hr className="h-[3px] w-1/4 bg-brandDark" />
      <div className="gap- flex flex-col">
        <h4
          className="line-clamp-1 min-h-[20px] text-sm font-bold text-brandDark"
          title={title}
        >
          {title}
        </h4>
        {author && (
          <p className="text-xs text-brandDark">
            By{' '}
            <a
              className="font-semibold text-brandPurple"
              href={SOCIALS[author]?.url}
              target="blank"
            >
              {author}
            </a>
          </p>
        )}
      </div>
      <p className="line-clamp-3 min-h-[60px] text-sm" title={description}>
        {description}
      </p>
      <div className="flex gap-6">
        <a
          className="font-bold text-brandPurple hover:underline"
          href={watch}
          target="blank"
        >
          Watch
        </a>
        {read && (
          <a
            className="font-bold text-brandPurple hover:underline"
            href={read}
            target="blank"
          >
            Read
          </a>
        )}
      </div>
    </div>
  )
}

export default BlogCard
