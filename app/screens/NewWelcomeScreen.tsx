import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { Button, XStack, YStack } from "tamagui"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type NewWelcomeScreenProps = NativeStackScreenProps<AppStackScreenProps<"NewWelcome">>

export const NewWelcomeScreen: FC<NewWelcomeScreenProps> = observer(function NewWelcomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="scroll">
      <YStack justifyContent="center">
        <Button alignSelf="center" size="$3">
          Login
        </Button>
        <Button alignSelf="center" size="$3">
          Sign Up
        </Button>
        <Button alignSelf="center" size="$3">
          Try it Out
        </Button>
      </YStack>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
