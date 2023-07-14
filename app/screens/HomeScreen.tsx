import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Fab, Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Text, View } from "tamagui"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type HomeScreenProps = NativeStackScreenProps<AppStackScreenProps<"Home">>

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const $topContainerInsets = useSafeAreaInsetsStyle(["top", "bottom"])
  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "right", "left"])

  return (
    <>
      <Screen style={$topContainerInsets} preset="scroll">
        <View display="flex" alignContent="center">
          <View>
            <Text color="forestgreen" textAlign="center" marginVertical={5}>
              Listen with us 🎵
            </Text>
          </View>
          <View>
            <Text color="forestgreen" textAlign="center" marginVertical={5}>
              Bottom Nav
            </Text>
          </View>
        </View>
      </Screen>
      <Fab page="Home" />
    </>
  )
})
