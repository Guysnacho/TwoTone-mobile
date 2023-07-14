import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import welcomeLogo from "../../assets/images/logo-filled.png"

import { View, Text, Image, Button, YStack } from "tamagui"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type LandingScreenProps = NativeStackScreenProps<AppStackScreenProps<"Landing">>

export const LandingScreen: FC<LandingScreenProps> = observer(function LandingScreen() {
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$topContainerInsets} preset="scroll">
      <View>
        <Image source={welcomeLogo} marginHorizontal="auto" />
      </View>
      <Text color="forestgreen" textAlign="center" marginVertical={5} fontSize={5}>
        Listen with us 🎵
      </Text>
      <YStack justifyContent="space-around" alignContent="center" space>
        <Button alignSelf="center" size="$5">
          Login
        </Button>
        <Button alignSelf="center" size="$5">
          Sign Up
        </Button>
        <Button alignSelf="center" size="$5">
          Try it Out
        </Button>
      </YStack>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
