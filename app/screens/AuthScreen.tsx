import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import { string } from "mobx-state-tree/dist/types/primitives"
import React, { FC, useEffect } from "react"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AuthScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Auth">> {
  method: string
}

export const AuthMethods = {
  TRIAL: "trialRun",
  SIGNUP: "signup",
  LOGIN: "login",
}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen(props) {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    console.log(props.route.params)
    console.log(props.navigation.getState())
  })

  return (
    <Screen style={$containerInsets} preset="auto">
      <Text text={props.route.params} />
    </Screen>
  )
})
