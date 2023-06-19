import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SongModel = types
  .model("Song")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Song extends Instance<typeof SongModel> {}
export interface SongSnapshotOut extends SnapshotOut<typeof SongModel> {}
export interface SongSnapshotIn extends SnapshotIn<typeof SongModel> {}
export const createSongDefaultModel = () => types.optional(SongModel, {})
