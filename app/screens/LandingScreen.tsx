import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Button, Image, Text, View } from "react-native-ui-lib"
import welcomeLogo from "../../assets/images/logo-filled.png"
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
      <Text color="forestgreen" textAlign="center" marginVertical={5}>
        Listen with us 🎵
      </Text>
      <View flex center>
        <Button alignSelf="center" size="$3">
          Login
        </Button>
        <Button alignSelf="center" size="$3">
          Sign Up
        </Button>
        <Button alignSelf="center" size="$3">
          Try it Out
        </Button>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
