import { User as SupaUser } from "@supabase/supabase-js"
import { supabase } from "app/utils/supabaseClient"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    authenticated: types.boolean,
    id: types.maybe(types.string),
    username: types.maybe(types.string),
    email: types.maybe(types.string),
    createdAt: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    trialLogin(username: string) {
      self.authenticated = false
      self.id = undefined
      self.username = username
      self.email = "user@twotone.app"
      self.createdAt = Date.now().toLocaleString()
    },
    login(supaUser: SupaUser) {
      self.authenticated = true
      self.id = supaUser.id
      self.username = supaUser.user_metadata.username
      self.email = supaUser.email
      self.createdAt = supaUser.created_at
    },
    logout() {
      // Actually log out if this isn't a trial
      if (self.authenticated) supabase.auth.signOut().finally()
      self.authenticated = false
      self.id = undefined
      self.username = undefined
      self.email = undefined
      self.createdAt = undefined
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () =>
  types.optional(UserModel, {
    authenticated: false,
    id: undefined,
    username: undefined,
    email: undefined,
    createdAt: undefined,
  })
