async function getData() {
  const res = await fetch('https://easyallies.com/api/site/getHome', {
    method: 'POST',
    body: JSON.stringify({
      method: 'site',
      action: 'getHome',
    }),
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()
  return (
    <main>
      {/* HERO */}
      <section className="bg-brandDark w-full pb-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-brandPurple mb-4 text-2xl font-semibold">
            New Releases
          </h2>
          <div className="w-full">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/72YWLyDeb9U?si=LKoe10r7EJ0dnneu"
              title="Bloodworth&#39;s Starfield Diaries - Part 2: All&#39;s Well That Ends Well"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
