/* eslint-disable react-native/no-inline-styles */
import { FlashList } from "@shopify/flash-list"
import { useToastController } from "@tamagui/toast"
import { Fab, Screen, SongCard, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { api } from "app/services/api"
import { createToast } from "app/utils/common"
import { observer } from "mobx-react-lite"
import { getSnapshot } from "mobx-state-tree"
import React, { FC, useEffect, useState } from "react"
import { Button, Form, Input, Spinner, YStack, getTokens } from "tamagui"

type SearchScreenProps = AppStackScreenProps<"Search">

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  const store = useStores()

  const [query, setQuery] = useState("")
  const songsList = getSnapshot(store.songList) // : typeof SongList = null
  const [status, setStatus] = useState<"off" | "submitting">("off")
  const tokens = getTokens()
  const toast = useToastController()

  useEffect(() => {
    console.log("**** Compoenent Side - store.songList.songs ****")
    console.log(songsList)
  }, [songsList])

  const handleSearch = async () => {
    setStatus("submitting")

    await api.apisauce
      .get<{ items: number; results: any[] }>("/api/search?" + new URLSearchParams({ song: query }))
      .then((res) => {
        if (res.status > 200) {
          createToast(toast, res.data.message)
        } else {
          store.songList.saveSongs(res.data.results)
        }
      })
      .catch((err) => {
        console.log(err)
        createToast(toast, "Something went wrong, try again later")
      })
      .finally(() => setStatus("off"))
  }

  return (
    <Screen safeAreaEdges={["top"]} preset="scroll">
      <Text style={{ textAlign: "center", marginTop: 25 }}>Search</Text>
      <YStack space="$5" margin="$4">
        {songsList.songs.length > 0 ? (
          <FlashList
            scrollEnabled
            ListHeaderComponent={() => {
              return <Text text={query + "- Results"} />
            }}
            data={songsList.songs}
            estimatedItemSize={130}
            renderItem={({ item }) => {
              return <SongCard song={item} />
            }}
          />
        ) : undefined}
      </YStack>
      <Form
        alignItems="center"
        space="$5"
        margin="$4"
        borderRadius="$4"
        borderColor={tokens.color.accent}
        padding="$8"
        elevationAndroid={5}
        backgroundColor={tokens.color.background}
        onSubmit={handleSearch}
      >
        <Input
          borderRadius={5}
          width="90%"
          // size="$10"
          paddingHorizontal="$4"
          color="$accent"
          placeholder="Hello - Erykah Badu"
          backgroundColor="$accentBg"
          value={query}
          aria-label="song-query"
          importantForAutofill="no"
          inputMode="search"
          onChangeText={setQuery}
        />
        <Form.Trigger asChild="except-style" disabled={status === "submitting"}>
          <Button size="$5" icon={status === "submitting" ? () => <Spinner /> : undefined}>
            Submit
          </Button>
        </Form.Trigger>
      </Form>
      <Fab />
    </Screen>
  )
})
