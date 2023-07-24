import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { supabase } from "app/utils/supabaseClient"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Button, Form, Image, Input, Separator, Spinner, Text, View, getTokens } from "tamagui"
import clearLogo from "../../assets/images/logo.png"

type AuthScreenProps = NativeStackScreenProps<AppStackScreenProps<"Auth">>

// Different messages for different flows
export const AuthMethods = {
  SIGNUP: { method: "SIGNUP", message: "Mkay, gonna need a few things :)" },
  TRIAL: { method: "TRIAL", message: "Welcome back :)" },
  LOGIN: { method: "LOGIN", message: "Lets give you some training wheels" },
}

// Email validation regex
export const emailVal = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/
const numberPattern = /^[0-9]+$/

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen({ route }) {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  const tokens = getTokens()
  // Pull in one of our MST stores
  // const state = useStores()
  const [status, setStatus] = useState<"off" | "submitting" | "submitted" | "success" | "errored">(
    "off",
  )
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [password, setPassword] = useState("")
  const [validpassword, setValidPassword] = useState(true)
  const [phone, setPhone] = useState("")
  const [validPhone, setValidPhone] = useState(true)
  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(true)

  const handleSignUp = () => {
    setStatus("submitting")
    if (emailVal.test(email)) setValidEmail(false)
    if (password.length < 8) setValidPassword(false)
    if (!phone && numberPattern.test(phone)) setValidPhone(false)
    if (username.length < 6) setValidUsername(false)

    if (validEmail && validpassword && validPhone && validUsername && validUsername === true) {
      supabase.auth.signUp({ email: email, password: password, phone: phone }).then(() => {
        setStatus("success")
        // run updates
        // Progress to next page
      })
    }
    setPassword("")
  }

  return (
    <Screen style={$containerInsets} preset="scroll">
      <View marginTop="$5" paddingHorizontal="$5" justifyContent="space-between" space="$5">
        <Image source={clearLogo} alt="Transparent logo" />
        <Text fontSize="$7" color="$accent">
          {AuthMethods[route.params as string].message}
        </Text>
        <Separator alignSelf="stretch" />
        <Form
          alignItems="center"
          justifyContent="space-around"
          marginTop="auto"
          space="$5"
          borderWidth={1}
          borderRadius="$4"
          borderColor={tokens.color.accent}
          padding="$8"
          elevationAndroid={5}
          backgroundColor={tokens.color.background}
          onSubmit={handleSignUp}
        >
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder={validEmail ? "Email" : "Enter a valid email"}
            backgroundColor="$accentBg"
            value={email}
            aria-label="email"
            importantForAutofill="auto"
            onChangeText={(e) => setEmail(e)}
          />
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder={validpassword ? "Password" : "Enter a valid password"}
            backgroundColor="$accentBg"
            value={password}
            aria-label="password"
            importantForAutofill="auto"
            onChangeText={(e) => setPassword(e)}
          />
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder={validPhone ? "Phone" : "Enter a valid phone"}
            backgroundColor="$accentBg"
            value={phone}
            aria-label="phone"
            importantForAutofill="auto"
            onChangeText={(e) => setPhone(e)}
          />
          <Input
            borderRadius={5}
            width="90%"
            color="$accent"
            placeholder={validUsername ? "Username" : "Enter a valid username"}
            backgroundColor="$accentBg"
            value={username}
            aria-label="username"
            importantForAutofill="auto"
            onChangeText={(e) => setUsername(e)}
          />
          <Form.Trigger asChild disabled={status === "submitting" || status === "success"}>
            <Button size="$5" icon={status === "submitting" ? () => <Spinner /> : undefined}>
              Submit
            </Button>
          </Form.Trigger>
        </Form>
      </View>
    </Screen>
  )
})
