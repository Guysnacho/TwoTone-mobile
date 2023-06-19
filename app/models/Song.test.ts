import { SongModel } from "./Song"

test("can be created", () => {
  const instance = SongModel.create({})

  expect(instance).toBeTruthy()
})
