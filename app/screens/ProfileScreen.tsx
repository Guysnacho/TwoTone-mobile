import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Fab, Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Button, Group, Image, Text, YStack } from "tamagui"
import welcomeLogo from "../../assets/images/logo-filled.png"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type ProfileScreenProps = NativeStackScreenProps<AppStackScreenProps<"Profile">>

/**
 * @todo Scroll view on the entire screen. Can scroll and hide user info, but scrolling continues on lower list
 */
export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"])

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <>
      <Screen style={$topContainerInsets} preset="scroll">
        <YStack space>
          <Image source={welcomeLogo} marginHorizontal="auto" />
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            Tunji
          </Text>
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            @guysnacho
          </Text>
        </YStack>
        <Group orientation="horizontal">
          <Group.Item>
            <Button>Lists</Button>
          </Group.Item>
          <Group.Item>
            <Button>SOTD</Button>
          </Group.Item>
          <Group.Item>
            <Button>Reviews</Button>
          </Group.Item>
        </Group>
      </Screen>
      <Fab page="profile" />
    </>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
