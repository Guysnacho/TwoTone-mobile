import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useToastController } from "@tamagui/toast"
import { Screen } from "app/components"
import { AppStackScreenProps, navigate } from "app/navigators"
import { api } from "app/services/api"
import { APIError, SignUpResponse } from "app/types/auth"
import { createToast, fetchSecret } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Button, Form, Image, Input, Separator, Spinner, Text, View, getTokens } from "tamagui"
const clearLogo = require("../../assets/images/logo.png")

type AuthScreenProps = NativeStackScreenProps<AppStackScreenProps<"Auth">>

// Different messages for different flows
export const AuthMethods = {
  SIGNUP: { method: "SIGNUP", message: "Mkay, gonna need a few things :)" },
  LOGIN: { method: "LOGIN", message: "Welcome back :)" },
  TRIAL: { method: "TRIAL", message: "Lets give you some training wheels" },
}

// Email validation regex
export const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const numberPattern = /^[0-9]+$/
const usernamePattern = /^[a-zA-Z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>/?`~]+$/ // /^[a-zA-Z0-9_]+$/

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen({ route }) {
  const $containerInsets = useSafeAreaInsetsStyle(["top", "left", "right"])
  const tokens = getTokens()
  const toast = useToastController()
  // Pull in one of our MST stores
  // const state = useStores()
  const [status, setStatus] = useState<"off" | "submitting">("off")
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [password, setPassword] = useState("")
  const [validpassword, setValidPassword] = useState(true)
  const [phone, setPhone] = useState("")
  const [validPhone, setValidPhone] = useState(true)
  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(true)
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const handleAuth = async () => {
    setStatus("submitting")
    setValidEmail(true)
    setValidPassword(true)
    setValidPhone(true)
    setValidUsername(true)
    if (emailVal.test(email)) setValidEmail(false)
    if (password.length < 8) setValidPassword(false)
    if (!phone && numberPattern.test(phone)) setValidPhone(false)
    if (!usernamePattern.test(username) || username.length < 5) setValidUsername(false)

    if ((route.params as string) == AuthMethods.SIGNUP.method) {
      if (!(validEmail && validpassword && validPhone && validUsername)) {
        setStatus("off")
      } else {
        await api.apisauce
          .post<SignUpResponse, APIError>("/api/auth", {
            secret: await fetchSecret(),
            email: email,
            password: password,
            phone: phone,
            username: username,
          })
          .then(() => {
            // Progress to next page
            supabase.auth
              .resend({ email: email, type: "signup" })
              .then(() => createToast(toast, "Welcome to TwoTone, confirm your email though."))
              .catch(() =>
                createToast(toast, "Issue sending your confirmation email, please contact support"),
              )
              .finally(() => navigate({ key: "Landing", name: "Landing" }))
          })
          .catch((err) => {
            createToast(toast, err.message)
            setStatus("off")
            setEmail("")
            setPassword("")
            setPhone("")
            setUsername("")
          })
      }
    } else if ((route.params as string) == AuthMethods.LOGIN.method) {
      if (!(validEmail && validpassword)) {
        createToast(toast, "Invalid login")
      } else {
        await supabase.auth
          .signInWithPassword({ email: email, password: password })
          .then((res) => {
            if (res.data.user && res.data.user.confirmed_at == null) {
              createToast(toast, "Please confirm your email :)")
              supabase.auth.signOut().finally()
            } else if (res.error) {
              createToast(toast, res.error.message)
              supabase.auth.signOut().finally()
            } else {
              createToast(toast, "Welcome")
              navigate({ key: "Home", name: "Home" })
            }
            //set store
            //route to home screen
          })
          .catch(() => {
            createToast(toast, "Error connecting to server, maybe try again later")
            supabase.auth.signOut()
            setStatus("off")
          })
      }
    } else if ((route.params as string) == AuthMethods.TRIAL.method) {
      if (!validUsername) {
        createToast(toast, "Invalid username")
      } else {
        //set store
        navigate({ key: "Home", name: "Home" })
      }
    } else {
      createToast(toast, "Error in auth flow, maybe try again later")
    }
    setEmail("")
    setPassword("")
    setStatus("off")
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
          onSubmit={handleAuth}
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
            display={
              [AuthMethods.SIGNUP.method, AuthMethods.LOGIN.method].includes(route.params as string)
                ? undefined
                : "none"
            }
            onChangeText={(e) => {
              setEmail(e)
              setValidEmail(true)
            }}
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
            display={
              [AuthMethods.SIGNUP.method].includes(route.params as string) ? undefined : "none"
            }
            onChangeText={(e) => {
              setPhone(e)
              setValidEmail(true)
            }}
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
            display={
              [AuthMethods.SIGNUP.method, AuthMethods.TRIAL.method].includes(route.params as string)
                ? undefined
                : "none"
            }
            onChangeText={(e) => {
              setUsername(e)
              setValidUsername(true)
            }}
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
            display={
              [AuthMethods.LOGIN.method, AuthMethods.SIGNUP.method].includes(route.params as string)
                ? undefined
                : "none"
            }
            onChangeText={(e) => {
              setPassword(e)
              setValidPassword(true)
            }}
          />
          <Form.Trigger asChild disabled={status === "submitting"}>
            <Button size="$5" icon={status === "submitting" ? () => <Spinner /> : undefined}>
              Submit
            </Button>
          </Form.Trigger>
        </Form>
      </View>
    </Screen>
  )
})
