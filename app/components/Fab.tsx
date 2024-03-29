import { Calendar, Home, LogOut, Plus, User2, X } from "@tamagui/lucide-icons"
import { useStores } from "app/models"
import { navigate } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button, YStack, styled } from "tamagui"

export interface FabProps {
  page: "Home" | "Profile"
}

/**
 * Floating action button for navigating the app. I don't want a navbar 😌
 * @todo - Add animations for expansion and closing
 */
export const Fab = observer((props: FabProps) => {
  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "right"])
  const [open, setOpen] = React.useState(false)
  const store = useStores()

  return (
    <YStack
      style={$containerInsets}
      flexDirection="column"
      flex={1}
      justifyContent="center"
      alignItems="flex-end"
      marginHorizontal={3}
      space
    >
      {/* <FabBubble // Search
            style={$containerInsets}
            display={open ? "flex" : "none"}
            onPress={() => setOpen(!open)}
          >
            <Search style={{
          top: "50%"
        }} />
          </FabBubble> */}
      <FabBubble // Profile or Home Page
        style={$containerInsets}
        display={open ? "flex" : "none"}
        onTouchEnd={() =>
          navigate({
            key: props.page === "Profile" ? "Home" : "Profile",
            name: props.page === "Profile" ? "Home" : "Profile",
          })
        }
      >
        {props.page === "Home" ? (
          <User2
            style={{
              top: "50%",
            }}
          />
        ) : null}
        {props.page === "Profile" ? (
          <Home
            style={{
              top: "50%",
            }}
          />
        ) : null}
      </FabBubble>
      <FabBubble // Song of the day
        style={$containerInsets}
        display={open ? "flex" : "none"}
        onPress={() => setOpen(!open)}
      >
        <Calendar
          style={{
            top: "50%",
          }}
        />
      </FabBubble>
      <FabBubble // Logout
        style={$containerInsets}
        display={open ? "flex" : "none"}
        onPress={() => {
          store.user.logout()
          navigate({ name: "Landing", key: "Landing" })
        }}
      >
        <LogOut
          style={{
            top: "50%",
          }}
        />
      </FabBubble>

      <Button
        marginStart={15}
        marginEnd={15}
        top={70}
        style={$containerInsets}
        aspectRatio={1}
        size={3}
        circular
        noTextWrap
        onPress={() => setOpen(!open)}
      >
        {open ? (
          <X
            style={{
              top: "50%",
            }}
          />
        ) : (
          <Plus
            style={{
              top: "50%",
            }}
          />
        )}
      </Button>
    </YStack>
  )
})

const FabBubble = styled(Button, {
  name: "FabBubble",
  marginStart: 15,
  marginEnd: 15,
  paddingVertical: "auto",
  top: 70,
  aspectRatio: 1,
  size: 0.5,
  circular: true,
  noTextWrap: true,
})
