import { shorthands } from "@tamagui/shorthands"
import { createFiraMonoFont } from "@tamagui/font-fira-mono"

import { themes, tokens } from "@tamagui/themes"

import { createFont, createTamagui } from "tamagui"
export default createTamagui({
  themes,

  tokens,

  shorthands,

  fonts: {
    default: createFont({
      family: "MoiraiOne",
      weight: {
        1: "500",
      },
      size: {
        1: 11,
        2: 12,
        3: 13,
        4: 14,
        5: 16,
        6: 18,
        7: 20,
        8: 22,
        9: 30,
        10: 42,
        11: 52,
        12: 62,
        13: 72,
        14: 92,
        15: 114,
        16: 124,
      },
      sizeLineHeight: (x: number) => x * 1.5,
    }),
  },
})
