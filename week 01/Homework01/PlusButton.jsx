import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function PlusButton({ Plus }) {
  return (
    <TouchableOpacity onPress={Plus} style={styles.container}>
      <Text>Plus</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightskyblue",
    height: 50,
    width: 100,
    marginRight: 10,
  },
});
