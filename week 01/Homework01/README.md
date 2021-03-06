# [Counter](https://velog.io/@nezhitsya/스파르타-코딩-클럽-개발일지-1-x52c7312)

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/150051120-f62213c8-2885-42c2-9bf8-8ac9db47ce37.MP4">
</p>

## 라이브러리

```javascript
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PlusButton from "./components/PlusButton";
import MinusButton from "./components/MinusButton";
```

## 함수

```javascript
const [state, setState] = useState(0);

const Minus = () => {
  setState(state - 1);
};

const Plus = () => {
  setState(state + 1);
};
```

## 태그

```javascript
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
```

## 디자인

```javascript
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
```
