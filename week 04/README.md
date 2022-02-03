# 앱개발 플러스 - 4 주차

### [수업 목표]

1. 데이터 영구관리
2. 글작성
3. 이미지 업로드
4. 글 가져오기

## 01. 4 주차

- Cloud Firestore - 게시글 업로드 및 가져오기
- Cloud Storage - 이미지 업로드

## 02. 데이터 영구관리

- 앱이 완전히 꺼졌다 켜졌을 때 로그인 여부 확인 -> `AsyncStorage`

**AsyncStorage**

```
expo install @react-native-async-storage/async-storage
```

1. 로그인 후 앱 재가동 -> 로그인 여부 확인 후 메인화면 출력
2. 글 작성 중 페이지 이탈 -> 작성 중이던 글 복구
3. 사용자가 좋아요 누른 게시글 -> 매번 서버에서 가져오지 않고 AsyncStorage에서 관리

```
로그인 ⇒ 메인페이지 ⇒ 로그아웃 ⇒ Loading ⇒ 로그인 상태 체크 ⇒ 로그인이 되어 있으면 메인페이지로 ⇒ 로그인이 안 되어 있으면 로그인 페이지로
```

**firebaseFunctions.js**

```javascript
import firebase from "firebase/compat";
import "firebase/compat/firestore";
import { Alert, AsyncStorage } from "react-native";

export async function registration(nickName, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    await AsyncStorage.setItem("session", email);
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("회원가입 실패 -> ", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    await AsyncStorage.setItem("session", email);
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("로그인 실패 -> ", err.message);
  }
}

export async function logout(navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    await AsyncStorage.removeItem("session");
    await firebase.auth().signOut();
    navigation.push("SignInPage");
  } catch (err) {
    Alert.alert("로그아웃 실패 -> ", err.message);
  }
}
```

- 로그인 여부를 확인하기 위해 session이란 이름을 부여하여 관리

```javascript
await AsyncStorage.setItem("session", email);
await AsyncStorage.removeItem("session");
```

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/152271741-de0ab4f4-2f1f-4dce-988e-73f0dfcba0be.mov">
</p>

**SignInPage.jsx**

```javascript
useEffect(() => {
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });

  setTimeout(() => {
    AsyncStorage.getItem("session", (err, result) => {
      console.log("ASYNCSTORAGE");
      console.log(result);
      if (result) {
        navigation.push("TabNavigator");
      } else {
        setReady(true);
      }
    });
    setReady(true);
  }, 1000);
}, []);
```

1. SinInPage에서 화면이 그려진 후 useEffect 실행
2. useEffect에서 AsuncStorage 속 session 확인
3. 이메일이 존재하면 TabNavigator에 전송
4. 이메일이 존재하지 않으면 Loading 화면 종료 후 로그인 홤녀 출력

## 03. 글 작성

- 작성중인 글 상태 관리

**AddPage.jsx**

```javascript
const [title, setTitle] = useState("");
const [titleError, setTitleError] = useState("");

const [content, setContent] = useState("");
const [contentError, setContentError] = useState("");

const [image, setImage] = useState(tempImage);

const upload = () => {
  console.log("upload");
};
```

1. 이미지 파이어베이스 storage에 저장
2. 이미지가 저장된 주소 요청
3. 이미지 저장 주소가 들어 있는 최종 게시글 데이터를 Cloud Firestore에 저장

## 04. 글 작성 후 업로드

[Cloud Firestore 업로드 API 공식문서](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko#node.js)

**AddPage.jsx**

```javascript
const upload = async () => {
  const currentUser = firebase.auth().currentUser;
  let date = new Date();
  let data = {
    title: title,
    author: currentUser.email,
    desc: content,
    image: image,
    date: date.getTime(),
    uid: currentUser.uid,
  };
  let result = addDiary(data);

  if (result) {
    Alert("작성 완료");
  }
};
```

- 파이어베이스 Authentication 데이터를 이용하여 현재 로그인한 사용자의 uid 추출
- 자바스크립트 기본 제공 도구인 날짜 도구 Date()를 이용해 현재 날짜 추출
- 현재 날짜는 Date 도구의 getTime() 함수를 이용하여 "표준시에 따라 지정된 날짜의 시간에 해당하는 숫자 값을 반환"받아 숫자로 기록

> [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

**firebaseFunctions.js**

```javascript
export async function addDiary(content) {
  try {
    const db = firebase.firestore();
    await db
      .collection("diary")
      .doc(content.date + "D")
      .set(content);
    return true;
  } catch (err) {
    Alert.alert("글 작성 실패 -> ", err.message);
    return false;
  }
}
```

- 모든 Cloud Firestore 접속 정보와 API들 db 변수에 저장

```javascript
await db
  .collection("diary")
  .doc(content.date + "D")
  .set(content);
```

- 어떤 컬렌션에 `diary` 어떤 문서에 `content.date + "D"` 어떤 내용 `content`
- Cloud Firestore에 값을 저장할 때는 "문자" 자료형만 저장 가능
- 숫자 형태였던 날짜 데이터에 D라는 문자를 더해 문자값으로 변형 시킨 후 값을 저장

## 05. 파이어베이스 storage 설정

- 가지고 있는 사진 업로드 / 바로 사진을 찍어 업로드 선택 -> 'expo-image-picker' 도구 사용

**expo-image-picker 설치**

```
expo install expo-image-picker
```

> [imagepicker 공식문서](https://docs.expo.io/versions/latest/sdk/imagepicker/)

- 권한 허용 확인

**AddPage.jsx**

```javascript
useEffect(() => {
  getPermission();
}, []);

const getPermission = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImgaePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("사진 권한이 필요합니다.");
    }
  }
};
```

1. `ImgaePicker.requestMediaLibraryPermissionsAsync()` 함수로 사용자 권한 확인
2. 팝업 상의 버튼에 따라 status 변수에 값 저장

## 06. 이미지 업로드
