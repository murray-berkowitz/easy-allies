'use client'
import { Timeline } from 'react-twitter-widgets'

const TwitterTimeline = ({ screenName }: { screenName: string }) => {
  return (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName,
      }}
      options={{
        height: '300',
        theme: 'dark',
      }}
    />
  )
}
export default TwitterTimeline
