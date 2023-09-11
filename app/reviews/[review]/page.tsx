import { Review } from '@/types/home'

async function getReview({ title }: { title: string }) {
  const formData = new FormData()
  formData.append('method', 'review')
  formData.append('action', 'get')
  formData.append('data[title]', title)
  const res = await fetch('https://easyallies.com/api/review/get', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
// add igdb stuff for images
export default async function Review({
  params,
}: {
  params: { review: string }
}) {
  const review: Review = await getReview({ title: params.review })
  const reviewTextArray = review.fullText.split('\n\n')
  const contribution = reviewTextArray[1].replaceAll('**', '').split('\n')
  const description = reviewTextArray[2]
  const reviewText = reviewTextArray.slice(3, -2).join('\n\n')
  return (
    <>
      <img
        className="h-screen w-screen object-cover object-left"
        src={'/ac6.jpg'}
      />
      <div className="mx-auto max-w-2xl whitespace-pre-wrap px-4">
        <h1 className="my-6 text-4xl font-bold italic text-brandDark">
          {review.episode.title}
          <div className="mt-4 flex">
            {contribution.map((contributer) => (
              <span className="text-brandDarkGreen text-xs">{contributer}</span>
            ))}
          </div>
        </h1>
        <p className="first0letter:font-bold text-xl font-medium text-brandDark first-letter:float-left first-letter:pr-[4px] first-letter:pt-[8px] first-letter:align-top first-letter:text-8xl first-letter:text-brandGreen">
          {description}
          <br />
          <br />
        </p>
        <p className="text-lg text-brandDark">{reviewText}</p>
      </div>
    </>
  )
}
