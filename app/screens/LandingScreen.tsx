import { useNavigation } from "@react-navigation/native"
import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Image, Text, XStack, YStack, getTokens } from "tamagui"
import { AuthMethods } from "./AuthScreen"

const welcomeLogo = require("../../assets/images/logo-filled.png")

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type LandingScreenProps = AppStackScreenProps<"Landing">

export const LandingScreen: FC<LandingScreenProps> = observer(function LandingScreen() {
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])
  const tokens = getTokens()
  // Pull in one of our MST stores
  // const rootstore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={$topContainerInsets}>
      <XStack height="80%" marginVertical="auto" justifyContent="space-around" alignSelf="center">
        <YStack display="flex" justifyContent="space-around" alignContent="center" space>
          <Image source={welcomeLogo} marginHorizontal="auto" />
          <Text color="forestgreen" textAlign="center" marginVertical={5} fontSize="$8">
            Listen with us 🎵
          </Text>
          <Button
            alignSelf="center"
            size="$5"
            backgroundColor={tokens.color.primary}
            // @ts-ignore
            onPressOut={() => navigation.navigate("Auth", { method: AuthMethods.LOGIN.method })}
          >
            Login
          </Button>

          <Button
            alignSelf="center"
            size="$5"
            backgroundColor={tokens.color.primary}
            // @ts-ignore
            onPressOut={() => navigation.navigate("Auth", { method: AuthMethods.SIGNUP.method })}
          >
            Sign Up
          </Button>
          <Button
            alignSelf="center"
            size="$5"
            theme="green"
            // @ts-ignore
            onPressOut={() => navigation.navigate("Auth", { method: AuthMethods.TRIAL.method })}
          >
            Try it Out
          </Button>
        </YStack>
      </XStack>
    </Screen>
  )
})
