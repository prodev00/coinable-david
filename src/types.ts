export type PageMeta = {
  last_visible_page: number
  has_next_page: boolean
}

export type AnimeDetail = {
  mal_id: string
  title: string
  approved: boolean
  type: string
  source: string
  episodes: number
  status: string
  score: number
  rank: number
  popularity: number
  synopsis: string
  images: {
    jpg: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
    webp: {
      image_url: string
      large_image_url: string
      small_image_url: string
    }
  }
}
