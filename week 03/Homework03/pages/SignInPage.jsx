import React, { Component, useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
} from "native-base";
import ItemInput from "../components/ItemInput";
import Loading from "../pages/Loading";
import { signIn } from "../config/firebaseFunctions";

const bImage = require("../assets/background.png");

export default function SignInPage({ navigation }) {
  const [ready, setReady] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    navigation.addListener("breforeRemove", (e) => {
      e.preventDefault();
    });

    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  const goSignUp = () => {
    navigation.navigate("SignUpPage");
  };

  const doSignIn = () => {
    if (email == "") {
      setEmailError("이메일을 입력해주세요");
    } else {
      setEmailError("");
    }

    if (password == "") {
      setPasswordError("비밀번호를 입력해주세요");
    } else {
      setPasswordError("");
    }

    signIn(email, password, navigation);
  };

  const setEmailFunc = (itemInputEmail) => {
    setEmail(itemInputEmail);
  };

  const setPasswordFunc = (itemInputPassword) => {
    setPassword(itemInputPassword);
  };

  return ready ? (
    <Container style={styles.container}>
      <ImageBackground source={bImage} style={styles.backgroundImage}>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Text style={styles.title}>
            <Text style={styles.highlite}>we</Text>gram
          </Text>
          <Form style={styles.form}>
            <ItemInput
              title={"E-mail"}
              type={"email"}
              setFunc={setEmailFunc}
              error={emailError}
            />
            <ItemInput
              title={"Password"}
              type={"password"}
              setFunc={setPasswordFunc}
              error={passwordError}
            />
          </Form>
          <Button full style={styles.emailSignIn} onPress={doSignIn}>
            <Text>E-mail LogIn</Text>
          </Button>
          <Button full style={styles.emailSignUp} onPress={goSignUp}>
            <Text style={{ color: "white" }}>SignUp</Text>
          </Button>
        </Content>
      </ImageBackground>
    </Container>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {},
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    margin: 20,
    borderRadius: 20,
  },
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
  input: {
    color: "white",
  },
  emailSignIn: {
    alignSelf: "center",
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "orange",
  },
  emailSignUp: {
    alignSelf: "center",
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    borderWidth: 1,
    borderColor: "orange",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  highlite: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  label: {
    color: "white",
  },
});
