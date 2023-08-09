import { ApiSecret } from "app/types/auth"
import { api } from "../services/api/api"
import { supabase } from "./supabaseClient"
import { RootStore } from "app/models"

/**
 * Fetch API Secret
 */
export const fetchSecret = async () => {
  return await api.apisauce
    .get<ApiSecret>("api/auth")
    .then((res) => res.data.secret)
    .catch(() => {
      return null
    })
}

/**
 * Fetch songs of the day for user
 */
export const fetchSotd = (store: RootStore, page?: number) => {
  const songs = supabase
    .from("sotd").fetch({})
    .select("song_id, content, created_at, updated_at")
    .eq("user_id", store.user.id)
    .order("created_at").limit(15);
}

/**
 * Create toast message
 */
export const createToast = (toast: any, title: string, duration?: number) => {
  if (duration) {
    toast.show(title, { duration: duration, native: true })
  } else {
    toast.show(title, { native: true })
  }
}
