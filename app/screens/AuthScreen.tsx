import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Button, Form, Image, Input, Separator, Spinner, Text, View, getTokens } from "tamagui"
import clearLogo from "../../assets/images/logo.png"

type AuthScreenProps = NativeStackScreenProps<AppStackScreenProps<"Auth">>

// Different messages for different flows
export const AuthMethods = {
  SIGNUP: { method: "SIGNUP", message: "Mkay, gonna need a few things :)" },
  TRIAL: { method: "TRIAL", message: "Welcome back :)" },
  LOGIN: { method: "LOGIN", message: "Lets give you some training wheels" },
}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen({ navigation, route }) {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  const tokens = getTokens()
  // Pull in one of our MST stores
  // const state = useStores()
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">("off")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (status === "submitting") {
      const timer = setTimeout(() => setStatus("off"), 2000)
      return () => {
        setEmail("")
        setPassword("")
        setPhone("")
        setUsername("")
        clearTimeout(timer)
      }
    }
  }, [status])

  return (
    <Screen style={$containerInsets} preset="auto">
      <View marginTop="$5" paddingHorizontal="$5" space>
        <Image source={clearLogo} alt="Transparent logo" />
        <Text fontSize="$7" color="$accent">
          {AuthMethods[route.params as string].message}
        </Text>
        <Separator alignSelf="stretch" />
        <Form
          alignItems="center"
          justifyContent="space-around"
          marginVertical="auto"
          space
          onSubmit={() => setStatus("submitting")}
          borderWidth={1}
          borderRadius="$4"
          borderColor={tokens.color.accent}
          padding="$8"
          elevationAndroid={5}
          backgroundColor={tokens.color.background}
        >
          <Input
            onChangeText={(e) => setEmail(e)}
            borderRadius={0}
            width="70%"
            value={email}
            placeholder="Email"
            backgroundColor="$accentBg"
          />
          <Input
            onChangeText={(e) => setPassword(e)}
            borderRadius={0}
            width="70%"
            value={password}
            placeholder="Password"
            backgroundColor="$accentBg"
          />
          <Input
            onChangeText={(e) => setPhone(e)}
            borderRadius={0}
            width="70%"
            value={phone}
            placeholder="Phone"
            backgroundColor="$accentBg"
          />
          <Input
            onChangeText={(e) => setUsername(e)}
            borderRadius={0}
            width="70%"
            value={username}
            placeholder="Username"
            backgroundColor="$accentBg"
          />
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button icon={status === "submitting" ? () => <Spinner /> : undefined}>Submit</Button>
          </Form.Trigger>
        </Form>
      </View>
    </Screen>
  )
})
