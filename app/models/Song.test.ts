import { createSongDefaultModel } from "./Song"

test("can be created", () => {
  const instance = createSongDefaultModel()

  expect(instance).toBeTruthy()
})
