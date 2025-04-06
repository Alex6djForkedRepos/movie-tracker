import type { TmdbMediaDetailsSeasonType } from "../tmdb"
import type { MediaTypeEnum } from "./mediaItem"

export interface MediaDetailsType {
  id: string
  mediaId: number
  mediaType: MediaTypeEnum
  score: number | null
  en: MediaDetailsInfoType
  ru: MediaDetailsInfoType
  createdAt: Date
  updatedAt: Date
}

export interface MediaDetailsInfoType {
  title: string | null
  originalTitle: string | null
  poster: string | null
  seasons?: TmdbMediaDetailsSeasonType[]
}
