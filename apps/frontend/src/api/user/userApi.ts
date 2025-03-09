import type { UserPublicType, UserType } from "@movie-tracker/types"
import type { RequestOptions } from "@movie-tracker/utils"
import type { UserApiUpdateTypes } from "~/api/user/userApiTypes"
import { api } from "~/api/instance"

export async function getUserProfileApi(options?: RequestOptions) {
  return api.get<UserType>("user", options)
}

export async function getUserProfileByIdApi(userId: string, options?: RequestOptions) {
  return api.get<UserPublicType>(`user/${userId}`, options)
}

export async function updateUserProfileApi(body: UserApiUpdateTypes) {
  return api.patch<UserType>("user", body)
}
