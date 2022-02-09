# [MainPage](https://velog.io/@nezhitsya/스파르타-코딩-클럽-개발일지-4-dufo715z)

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/153145661-8e710b33-c99d-4ab5-b1c9-4f1262a8a44b.mov">
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
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Button,
} from "native-base";
import * as Animatable from "react-native-animatable";
```

## 함수

```javascript
const [data, setData] = useState([]);

useEffect(() => {
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });
  readyData();
}, []);

const readyData = async () => {
  const data = await getData();
  setData(data);
};
```
