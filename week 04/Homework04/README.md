# [MainPage]()

<p align="center">
  <img width="300" src="">
</p>

## 라이브러리

```javascript
import firebase from "firebase/compat";
import "firebase/compat/firestore";
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
