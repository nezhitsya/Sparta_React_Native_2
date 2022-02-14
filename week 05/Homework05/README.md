# [MyPage](https://velog.io/@nezhitsya/스파르타-코딩-클럽-개발일지-5-nmxoo84m)

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/153816368-0f46ed03-1148-46ed-88e6-d157b37706c3.jpeg">
</p>

## 라이브러리

```javascript
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Alert, AsyncStorage } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Thumbnail } from "native-base";
```

## 함수

**MyPage.jsx**

- 상태 관리

```javascript
const [data, setData] = useState([]);
const [next, setNext] = useState(0);
const [dataCount, setDataCount] = useState("");
const [commentCount, setCommentCount] = useState("");
const [profile, setProfile] = useState([]);
const [AppRunCnt, setAppRunCnt] = useState("");

useEffect(() => {
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });
  getData(setNext, setData);
  getProfile(setProfile);
  getDataCount(setDataCount);
  getCommentCount(setCommentCount);
  getAppRunCnt();
}, []);
```

- 앱 구동 횟수

```javascript
const getAppRunCnt = async () => {
  let cnt = await AsyncStorage.getItem("AppRunCnt");
  if (cnt == null) {
    AsyncStorage.setItem("AppRunCnt", "1");
    let cnt2 = await AsyncStorage.getItem("AppRunCnt");
    console.log(cnt2);
    setAppRunCnt(cnt2);
  } else {
    try {
      const sum = Number(cnt) + 1;
      await AsyncStorage.removeItem("AppRunCnt");
      const result = await AsyncStorage.setItem("AppRunCnt", String(sum));
      let cnt2 = await AsyncStorage.getItem("AppRunCnt");
      setAppRunCnt(cnt2);
    } catch (error) {
      console.log(error);
    }
  }
};
```

**firebaseFunctions.js**

- 작성한 글 갯수

```javascript
export async function getDataCount(setDataCount) {
  const db = firebase.firestore();
  const snapshot = await db.collection("diary").orderBy("date", "desc").get();
  if (snapshot.empty) {
    setDataCount(0);
    return 0;
  } else {
    setDataCount(snapshot.docs.length);
    return snapshot.docs.length;
  }
}
```

- 작성한 댓글 갯수

```javascript
export async function getCommentCount(setCommentCount) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  let snapshot = await db
    .collection("comment")
    .where("uid", "==", currentUser.uid)
    .get();
  if (snapshot.empty) {
    setCommentCount(0);
    return 0;
  } else {
    setCommentCount(snapshot.docs.length);
    return snapshot.docs.length;
  }
}
```
