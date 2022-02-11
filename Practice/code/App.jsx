import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";
import * as Font from "expo-font";
import firebase from "firebase/compat/app";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./pages/Loading";
import apiKeys from "./config/key";

export default function App() {
  const [ready, setReady] = useState(false);

  const loadFont = () => {
    setTimeout(async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      await setReady(true);
    }, 1000);
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return ready ? (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
});
