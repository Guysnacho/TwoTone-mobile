import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Fab, Screen } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Group, Image, Text, View, YStack } from "tamagui"
const welcomeLogo = require("../../assets/images/logo-filled.png")
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type ProfileScreenProps = NativeStackScreenProps<AppStackScreenProps<"Profile">>

/**
 * @todo Scroll view on the entire screen. Can scroll and hide user info, but scrolling continues on lower list
 */
export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const $topContainerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])

  // Pull in one of our MST stores
  const store = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <>
      <Screen style={$topContainerInsets} preset="scroll">
        <YStack space paddingTop="$5">
          <Image source={welcomeLogo} style={{ left: "30%" }} />
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            {store.user.username}
          </Text>
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            {store.user.email}
          </Text>
        </YStack>
        <Group orientation="horizontal">
          <Group.Item>
            <Button size={1}>Lists</Button>
          </Group.Item>
          <Group.Item>
            <Button size={1}>SOTD</Button>
          </Group.Item>
          <Group.Item>
            <Button size={1}>Reviews</Button>
          </Group.Item>
        </Group>
      </Screen>
      <Fab page="Profile" />
    </>
  )
})
