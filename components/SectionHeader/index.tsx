const SectionHeader = ({
  title,
  description,
  seeAll,
}: Record<string, string>) => {
  return (
    <div className="my-8 flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold italic text-brandDark">{title}</h3>
        <p className="text-sm font-light italic text-brandDark">
          {description}
        </p>
      </div>
      <a href={seeAll} className="text-brandDark hover:underline">
        See All &gt;
      </a>
    </div>
  )
}

export default SectionHeader
