import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Label, Text } from 'native-base';

export default function ItemInput({ title, type, setFunc, error }) {
  return (
    <>
      <Item floatingLabel last>
        <Label style={styles.label}>{title}</Label>
        <Input
          style={styles.input}
          secureTextEntry={type == 'password' ? true : false}
          onChangeText={(text) => {
            setFunc(text);
          }}
        />
      </Item>
      <Item style={{ borderColor: 'transparent' }}>
        <Text style={{ color: 'deeppink' }}>{error}</Text>
      </Item>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
  },
  input: {
    color: 'white',
  },
});
