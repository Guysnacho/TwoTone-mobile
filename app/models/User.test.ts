import { createUserDefaultModel } from "./User"

test("can be created", () => {
  const instance = createUserDefaultModel()
  
  expect(instance).toBeTruthy()
})
