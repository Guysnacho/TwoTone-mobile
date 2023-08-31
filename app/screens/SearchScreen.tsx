import { Fab, Screen, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type SearchScreenProps = AppStackScreenProps<"Search">

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  const $topContainerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <>
      <Screen style={$topContainerInsets} preset="scroll">
        <Text text="search" />
      </Screen>
      <Fab />
    </>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
