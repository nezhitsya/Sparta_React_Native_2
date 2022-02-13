# [MyPage]()

<p align="center">
  <img width="300" src="">
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

useEffect(() => {
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });
  getData(setNext, setData);
  getProfile(setProfile);
  getDataCount(setDataCount);
  getCommentCount(setCommentCount);
}, []);
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
