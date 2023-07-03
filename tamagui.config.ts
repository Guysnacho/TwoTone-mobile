import { shorthands } from "@tamagui/shorthands"

import { themes, tokens } from "@tamagui/themes"

import { createFont, createTamagui } from "tamagui"
export default createTamagui({
  themes,

  tokens,

  shorthands,

  fonts: {
    default: createFont({
      family: "Inter, Helvetica, Arial, sans-serif",
      size: {
        1: 12,
        2: 14,
        3: 15,
        // ...
      },
      lineHeight: {
        1: 17,
        2: 22,
        3: 25,
        // ...
      },
      weight: {
        4: "300",
        6: "600",
      },
      letterSpacing: {
        4: 0,
        8: -1,
      },

      // for native only, alternate family based on weight/style
      face: {
        // pass in weights as keys
        700: { normal: "InterBold", italic: "InterBold-Italic" },
        800: { normal: "InterBold", italic: "InterBold-Italic" },
        900: { normal: "InterBold", italic: "InterBold-Italic" },
      },
    }),
  },
})
