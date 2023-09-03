import { Instance, SnapshotIn, SnapshotOut, getParent, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Song object
 */
export const SongModel = types
  .model("Song")
  .props({
    id: types.identifierNumber,
    title: types.string,
    artist: types.string,
    genres: types.array(types.string),
    year: types.string,
    label: types.array(types.string),
    thumbnail: types.string,
    cover: types.string,
    selected: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setSelected: (isSelected) => {
      self.selected = isSelected
    },
    select: () => {
      getParent(self, 2).selectedSong().selected = false
      self.selected = true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Song list object
 */
export const SongListModel = types
  .model("SongList", { songs: types.array(SongModel) })
  .actions(withSetPropAction)
  .views((self) => ({
    get selectedSong() {
      return self.songs.find((song) => song.selected)
    },
    get allSongs() {
      return self.songs
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    // saveSOTDs(songList: Song[]) {
    // console.log(songList)
    // },
    saveSongs: (songList) => {
      self.songs = songList
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Song extends Instance<typeof SongModel> {}
export interface SongSnapshotOut extends SnapshotOut<typeof SongModel> {}
export interface SongSnapshotIn extends SnapshotIn<typeof SongModel> {}
export interface SongList extends Instance<typeof SongListModel> {}
export interface SongListSnapshotOut extends SnapshotOut<typeof SongListModel> {}
export interface SongListSnapshotIn extends SnapshotIn<typeof SongListModel> {}

export const createSongDefaultModel = () =>
  types.optional(SongModel, {
    id: 0,
    title: "",
    artist: "",
    genres: [""],
    year: "",
    label: [""],
    thumbnail: "",
    cover: "",
  })
export const createSongListDefaultModel = () => types.optional(SongListModel, { songs: [] })
