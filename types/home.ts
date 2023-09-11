export interface ScheduleEvent {
  duration: number
  date: string
  service: 'Twitch' | 'Youtube' | 'Patreon'
  description: string
  title: string
  noDate: boolean
}
export interface Resolution {
  height: number
  width: number
  url: string
}

export interface Episode {
  show: string
  title: string
  description: string
  channelId: string
  playlistId: string
  videoId: string
  published: string
  thumbs: {
    maxres: Resolution
    high: Resolution
    medium: Resolution
    default: Resolution
  }
}

export interface Show {
  youtubeId: string
  description: string
  urlTitle: string
  title: string
  order: number
  episodes: Episode[]
}

export interface APIResponse {
  schedule: ScheduleEvent[]
  shows: Show[]
}

export type Authors =
  | 'Michael Damiani'
  | 'Daniel Bloodworth'
  | 'Bradley Ellis'
  | 'Michael Huber'

export interface Review {
  fullText: string
  writer: Authors
  numscore: number
  episode: Episode
  game: string
  videoId: string
  urlTitle: string // written review url
}

export type ReviewAPIResponse = Review[]
