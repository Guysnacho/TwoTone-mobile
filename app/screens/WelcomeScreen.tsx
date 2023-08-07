import { AppStackScreenProps, navigate } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, View } from "tamagui"
import { Button, Text } from "../components"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

type WelcomeScreenProps = AppStackScreenProps<"Welcome">

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  // const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <View style={$topContainerInsets}>
      <View /*style={$topContainer}*/>
        <Image /*style={$welcomeLogo}*/ source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          /*style={$welcomeHeading}*/
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image /*style={$welcomeFace}*/ source={welcomeFace} resizeMode="contain" />
      </View>

      <View /*style={[$bottomContainer, $bottomContainerInsets]}*/ space>
        <Button onTouchEnd={() => navigate({ key: "Landing", name: "Landing" })}>
          Landing Page
        </Button>
        <Button onTouchEnd={() => navigate({ key: "Home", name: "Home" })}>Home Page</Button>
        <Button onTouchEnd={() => navigate({ key: "Profile", name: "Profile" })}>
          Profile Page
        </Button>
        <Text tx="welcomeScreen.postscript" size="md" />
      </View>
    </View>
  )
})
