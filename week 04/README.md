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

**글 작성 - AddPage.jsx**
