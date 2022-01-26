# [Detail & Profile Page](https://velog.io/@nezhitsya/스파르타-코딩-클럽-개발일지-2-ylc394ug)

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/151105310-797663fc-6726-4880-ab24-fe7fe8f64cc1.mp4">
</p>

## 라이브러리

```javascript
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dimensions } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  List,
  Thumbnail,
  Card,
  CardItem,
  Icon,
} from "native-base";
import HeaderComponent from "../components/HeaderComponent";
```

## 함수

- CardComponent.jsx에서 DetailPage.jsx로 데이터 전달

**CardComponent.jsx**

```javascript
<TouchableOpacity
  onPress={() => {
    navigation.navigate("DetailPage", { content: content });
  }}
  style={styles.container}>
```

**DetailPage.jsx**

```javascript
useEffect(() => {
  navigation.setOptions({
    title: content.title,
    headerStyle: {
      backgroundColor: "white",
      shadowColor: "white",
    },
    headerTintColor: "black",
    headerShown: "true",
    headerBackTitleVisible: false,
  });
}, []);
```

## 디자인

**ImageComponent.jsx**

- 화면 가로 너비 3등분한 값

```javascript
const imageWidth = Dimensions.get("window").width / 3;
```

- ImageBlurLoading을 사용하여 해당 값 적용

```javascript
<ImageBlurLoading
  withIndicator
  thumbnailSource={{ uri: image }}
  source={{ uri: image }}
  style={{ width: imageWidth, height: imageWidth }}
/>
```
