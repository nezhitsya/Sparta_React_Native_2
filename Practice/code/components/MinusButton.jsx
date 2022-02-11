import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function MinusButton({ Minus }) {
  return (
    <TouchableOpacity onPress={Minus} style={styles.container}>
      <Text>Minus</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    height: 50,
    width: 100,
    marginLeft: 10,
  },
});
