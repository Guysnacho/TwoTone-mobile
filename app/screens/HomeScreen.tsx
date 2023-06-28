import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { YStack, Image, Text, View, Button } from "tamagui"
import welcomeLogo from "../../assets/images/logo-filled.png"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type HomeScreenProps = NativeStackScreenProps<AppStackScreenProps<"Home">>

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <Screen style={$topContainerInsets} preset="scroll">
      <YStack  display="flex" justifyContent="space-between" space>
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
      </YStack>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
