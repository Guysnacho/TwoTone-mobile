import { Calendar, Edit, Plus, User2, X } from "@tamagui/lucide-icons"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Button, YStack, styled } from "tamagui"

/**
 * Describe your component here
 */
export const Fab = observer((props: { page: string }) => {
  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "right"])
  const [open, setOpen] = React.useState(false)

  return (
    <YStack flexDirection="column" flex={1} justifyContent="center" alignItems="flex-end" space>
      {/* <FabBubble // Search
            style={$containerInsets}
            display={open ? "flex" : "none"}
            onPress={() => {
              setOpen(!open)
              console.log(props.page)
            }}
          >
            <Search style={{
          top: "50%"
        }} />
          </FabBubble> */}
      <FabBubble // Profile or Home Page
        style={$containerInsets}
        display={open ? "flex" : "none"}
        onPress={() => {
          setOpen(!open)
          console.log(props.page)
        }}
      >
        {props.page !== "profile" ? (
          <User2
            style={{
              top: "50%",
            }}
          />
        ) : null}
        {props.page !== "home" ? (
          <Edit
            style={{
              top: "50%",
            }}
          />
        ) : null}
      </FabBubble>
      <FabBubble // Song of the day
        style={$containerInsets}
        display={open ? "flex" : "none"}
        onPress={() => {
          setOpen(!open)
          console.log(props.page)
        }}
      >
        <Calendar
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
        onPress={() => {
          setOpen(!open)
          console.log(props.page)
        }}
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
