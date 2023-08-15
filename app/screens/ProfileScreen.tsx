import { useToastController } from "@tamagui/toast"
import { Fab } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { createToast, fetchSotd } from "app/utils/common"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  H5,
  Image,
  Separator,
  SizableText,
  Spinner,
  Square,
  Tabs,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui"
const welcomeLogo = require("../../assets/images/logo-filled.png")

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type ProfileScreenProps = AppStackScreenProps<"Profile">

/**
 * @todo Scroll view on the entire screen. Can scroll and hide user info, but scrolling continues on lower list
 */
export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen({
  navigation,
  route,
}) {
  const $topContainerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])

  // Pull in one of our MST stores
  const store = useStores()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [songs, setSongs] = useState<
    {
      id: string
      song: {
        title: string
        album: string
        artists: string
      }
      content: string
      created_at: string
      updated_at: string
    }[]
  >()

  const toast = useToastController()

  useEffect(() => {
    setLoading(true)
    fetchSotd(store).then(({ data, message }) => {
      if (data) {
        console.log(data)

        setSongs(data)
      } else if (message) {
        setError(message)
        createToast(toast, message, 5000)
      }
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    console.log("data fetched")
    console.log(songs)
    console.error(error)
  }, [songs, error, loading])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <>
      <View style={$topContainerInsets}>
        <YStack space paddingTop="$5">
          <Image source={welcomeLogo} style={{ left: "30%" }} />
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            {store.user.username}
          </Text>
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            {store.user.email}
          </Text>
        </YStack>
        <Separator />
        <Tabs
          defaultValue="tab1"
          orientation="horizontal"
          flexDirection="column"
          marginHorizontal="auto"
          marginVertical="$4"
          width="90%"
          minHeight={350}
          borderRadius="$4"
          borderWidth="$0.25"
          overflow="scroll"
          backgroundColor="$accent"
          borderColor="$borderColor"
        >
          <Tabs.List disablePassBorderRadius="bottom" aria-label="Select profile content">
            <Tabs.Tab flex={1} value="tab1">
              <SizableText fontFamily="$body">Lists</SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="tab2">
              <SizableText fontFamily="$body">SOTD</SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="tab3">
              <SizableText fontFamily="$body">Reviews</SizableText>
            </Tabs.Tab>
          </Tabs.List>
          <Separator />
          <Tabs.Content value="tab1" paddingVertical="$3">
            <H5>Lists</H5>
          </Tabs.Content>

          <Tabs.Content value="tab2" paddingVertical="$3">
            {loading ? (
              <Spinner />
            ) : songs ? (
              songs.map((sotd) => (
                <XStack paddingHorizontal="$3" space justifyContent="space-evenly" key={sotd.id}>
                  <View flexGrow={2} display="flex" alignItems="center" paddingHorizontal="auto">
                    <H5>
                      {sotd.song.title} - {sotd.song.artists}
                    </H5>
                    <Text>{sotd.content}</Text>
                  </View>
                  <Separator vertical />
                  <Square backgroundColor="wheat" size="$5" elevation="$3" />
                </XStack>
              ))
            ) : undefined}
          </Tabs.Content>

          <Tabs.Content value="tab3" paddingVertical="$3">
            <H5>Reviews</H5>
          </Tabs.Content>
        </Tabs>
      </View>
      <Fab page="Profile" />
    </>
  )
})
