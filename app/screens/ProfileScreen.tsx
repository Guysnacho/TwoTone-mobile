import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Fab } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { fetchSotd } from "app/utils/common"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Button, Group, H5, Image, Separator, SizableText, Tabs, Text, YStack, View } from "tamagui"
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
      <View style={$topContainerInsets}>
        <YStack space paddingTop="$5">
          <Image source={welcomeLogo} style={{ left: "30%" }} />
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            {store.user.username}
          </Text>
          <Text color="forestgreen" textAlign="center" marginVertical={5}>
            {store.user.email}
          </Text>
        </YStack>
        <Separator />
        <Tabs
          defaultValue="tab1"
          orientation="horizontal"
          flexDirection="column"
          marginHorizontal="auto"
          marginVertical="$4"
          width="80%"
          minHeight={200}
          borderRadius="$4"
          borderWidth="$0.25"
          overflow="hidden"
          backgroundColor="$accent"
          borderColor="$borderColor"
        >
          <Tabs.List disablePassBorderRadius="bottom" aria-label="Select profile content">
            <Tabs.Tab flex={1} value="tab1" onPressOut={() => fetchSotd(store)}>
              <SizableText fontFamily="$body">Lists</SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="tab2">
              <SizableText fontFamily="$body">SOTD</SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="tab3">
              <SizableText fontFamily="$body">Reviews</SizableText>
            </Tabs.Tab>
          </Tabs.List>
          <Separator />
          <Tabs.Content value="tab1">
            <H5>Lists</H5>
          </Tabs.Content>

          <Tabs.Content value="tab2">
            <H5>SOTD</H5>
          </Tabs.Content>

          <Tabs.Content value="tab3">
            <H5>Reviews</H5>
          </Tabs.Content>
        </Tabs>
      </View>
      <Fab page="Profile" />
    </>
  )
})
