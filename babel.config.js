/** @type {import('@babel/core').TransformOptions['plugins']} */
process.env.TAMAGUI_TARGET = 'native'
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZXRxdXVmendmdmJxYWthcXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwOTg5NjgsImV4cCI6MTk3NTY3NDk2OH0.DNtGmL89AUK2rZZK8gwioIGZMiZ_-l3NBYprGkcNL0k"
process.env.EXPO_PUBLIC_SUPABASE_URL="https://ojetquufzwfvbqakaque.supabase.co"
const plugins = [
  [
    /** Enables baseUrl: "./" option in tsconfig.json to work @see https://github.com/entwicklerstube/babel-plugin-root-import */
    "babel-plugin-root-import",
    {
      paths: [
        {
          rootPathPrefix: "app/",
          rootPathSuffix: "app",
        },
        {
          rootPathPrefix: "assets/",
          rootPathSuffix: "assets",
        },
      ],
    },
  ],
  "@tamagui/babel-plugin",
  ['transform-inline-environment-variables'],
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",
  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  "react-native-reanimated/plugin",
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins,
}
