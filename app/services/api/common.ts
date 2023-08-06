import { ApiSecret } from "app/types/Auth"
import { api } from "./api"

/**
 * Fetch API Secret
 */
export const fetchSecret = async () => {
  return await api.apisauce
    .get<ApiSecret>("api/auth")
    .then((res) => {
      console.log(res)
      return res.data.secret
    })
    .catch(() => {
      return null
    })
}
