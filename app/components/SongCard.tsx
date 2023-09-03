import { useStores } from "app/models"
import { SongModel } from "app/models/Song"
import { colors, typography } from "app/theme"
import { observer } from "mobx-react-lite"
import { getSnapshot } from "mobx-state-tree"
import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { Card, H6, XStack, YStack, Image } from "tamagui"
const clearLogo = require("../../assets/images/logo.png")

export interface SongCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  song: any
}

/**
 * Describe your component here
 */
export const SongCard = observer(function SongCard(props: SongCardProps) {
  const { song } = props

  const handleSelect = (event: GestureResponderEvent) => {
    const store = useStores()
    const currentSong = getSnapshot(song)

    console.log("Selected Song")
    console.log(currentSong)
  }

  return (
    <Card
      key={song.id}
      height="$10"
      borderRadius={4}
      marginVertical="$3"
      padded
      overflow="hidden"
      onPress={handleSelect}
    >
      <XStack flex={5} flexGrow={3}>
        <YStack width="70%">
          <H6>{song.artist}</H6>
          <H6>{song.title}</H6>
        </YStack>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ objectPosition: "100% 50%", objectFit: "scale-down" }}
          alignSelf="center"
          source={song.thumbnail ? { uri: song.thumbnail, width: 100, height: 100 } : clearLogo}
        />
      </XStack>
    </Card>
  )
})
