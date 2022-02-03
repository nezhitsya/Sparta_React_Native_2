# [Loading & Logout](https://velog.io/@nezhitsya/스파르타-코딩-클럽-개발일지-3-q4t8xnyj)

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/152269933-f296a40d-9298-44e1-9484-cd847af08c86.MP4">
</p>

## 라이브러리

```javascript
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Thumbnail } from "native-base";
import { logout } from "../config/firebaseFunctions";
import firebase from "firebase/compat";
import "firebase/compat/firestore";
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

**SignInPage.jsx**

- 1초간 지연

```javascript
useEffect(() => {
  navigation.addListener("breforeRemove", (e) => {
    e.preventDefault();
  });

  setTimeout(() => {
    setReady(true);
  }, 1000);
}, []);
```

- 상태 관리를 통한 Loading 화면 관리

```javascript
const [ready, setReady] = useState(false);

return ready ? (
  <Container style={styles.container}>
    <ImageBackground source={bImage} style={styles.backgroundImage}>
      <Content contentContainerStyle={styles.content} scrollEnabled={false}>
        ...
      </Content>
    </ImageBackground>
  </Container>
) : (
  <Loading />
);
```
