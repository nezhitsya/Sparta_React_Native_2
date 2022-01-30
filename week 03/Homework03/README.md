# [Loading & Logout]()

<p align="center">
  <img width="300" src="">
</p>

## 라이브러리

```javascript

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

## 디자인
