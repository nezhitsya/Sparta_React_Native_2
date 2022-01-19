import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PlusButton from "./components/PlusButton";
import MinusButton from "./components/MinusButton";

export default function App() {
  const [state, setState] = useState(0);

  const Minus = () => {
    setState(state - 1);
  };

  const Plus = () => {
    setState(state + 1);
  };

  return (
    <View style={styles.contianer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Counter</Text>
        <Text>{state}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PlusButton Plus={Plus} />
        <MinusButton Minus={Minus} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
});
