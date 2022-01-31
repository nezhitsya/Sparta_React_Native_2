# [Loading & Logout]()

<p align="center">
  <img width="300" src="">
</p>

## 라이브러리

```javascript
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Thumbnail } from "native-base";
import { logout } from "../config/firebaseFunctions";
import HeaderComponent from "../components/HeaderComponent";
import ImageComponent from "../components/ImageComponent";
```

## 함수

- 로그아웃 기능

**firebaseFunctions.js**

```javascript
export async function logout(navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    await firebase.auth().signOut();
    navigation.push("SignInPage");
  } catch (err) {
    Alert.alert("로그아웃 실패 -> ", err.message);
  }
}
```

- 로딩화면 출력

## 디자인
