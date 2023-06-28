import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Button, Text } from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { AppStackScreenProps, navigate } from "app/navigators"

import welcomeLogo from "../../assets/images/logo.png"
import welcomeFace from "../../assets/images/welcome-face.png"
import { View, Image } from "tamagui"

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

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
