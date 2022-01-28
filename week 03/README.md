# 앱개발 플러스 - 3 주차

### [수업 목표]

1. 상태 관리 활용
2. 파이어베이스 활용
3. 회원가입 구현
4. 로그인 구현
5. 전역 상태 관리

## 01. 3 주차

- 사용자들의 데이터 수신
- 파이어베이스
  - 직접 서버를 구축하지 않고 앱에서 벌어지는 일들을 저장하고 관리할 수 있는 서버리스 서비스
  - 파이어베이스 API를 사용하여 로그인 / 회원가입 구현

## 02. Input 태그

- 사용자의 데이터를 받는 Input 태그
  - 리액트 네이티브에서 제공하는 TextInput 태그 기능을 사용하면서 스타일을 입힌 NativeBase의 Input 태그 사용

> [리액트 네이티브 TextInput 태그 공식 문서](https://docs.expo.io/versions/latest/react-native/textinput/) <br> [NativeBase Input 태그 공식 문서](https://docs.nativebase.io/Components.html#Form)

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/151111342-ad86928a-7db9-401d-943d-7418a3032110.PNG">
</p>

**ItemInput.jsx**

```javascript
import React from "react";
import { StyleSheet } from "react-native";
import { Item, Input, Label } from "native-base";

export default function ItemInput({ title, type, setFunc }) {
  return (
    <Item floatingLabel last>
      <Label style={styles.label}>{title}</Label>
      <Input
        style={styles.input}
        // type이 패스워드면 화면상에 텍스트가 안보이게 처리하는 속성
        secureTextEntry={type == "password" ? true : false}
        //태그에 값이 입력되는 동시에 어떤 값이 입력되는 지 바로바로 뱉는 속성함수
        onChangeText={(text) => {
          setFunc(text);
        }}
      />
    </Item>
  );
}
```

**SignInPage.jsx**

```javascript
export default function SignInPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  const doSignIn = () => {
    //Email 로그인 버튼을 누를 때 실행되는 함수
    //관리하는 상태 값을 확인
    console.log(email);
    console.log(password);
  };
  const setEmailFunc = (itemInputEmail) => {
    //이메일 상태값을 관리하는 함수
    setEmail(itemInputEmail);
  };
  const setPasswordFunc = (itemInputPassword) => {
    //패스워드 상태값을 관리하는 함수
    setPassword(itemInputPassword);
  };

  return (
    <Container style={styles.container}>
      <ImageBackground source={bImage} style={styles.backgroundImage}>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Text style={styles.title}>
            <Text style={styles.highlite}>we</Text>gram
          </Text>
          <Form style={styles.form}>
            <ItemInput title={'이메일'} type={'email'} setFunc={setEmailFunc} />
            <ItemInput
              title={'비밀번호'}
              type={'password'}
              setFunc={setPasswordFunc}
            />
          </Form>
          ...
```

1. SignInPage에서 관리할 상태 값은 email & password
2. useState로 각각의 상태 값을 초기화
3. 상태 값을 변경할 함수 생성 > setEmailFunc & setPasswordFunc
4. email, password 상태 값을 변경하는 함수를 ItemInput 컴포넌트로 전송
5. type 값도 넘겨 email인지 password인지 구분
6. ItemInput에서 `function Loading({ title, type, setFunc })` 형태로 넘겨받은 값을 컴포넌트 내부에서 사용
7. type으로 password 타입인 경우 화면에 패스워드 노출되지 않도록 처리 > Input 태그의 `secureTextEntry`
8. Input 태그의 `onChangeText`는 사용자가 한 글자 한 글자 입력할 때마다 입력 란에 입력된 값을 내뱉는 속성 함수
9. 내뱉어진 값을 넘겨받은 상태 관리 함수 setFunc에 넣어 돌려줌

## 03. 부적절한 사용자 정보 관리

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/151111516-6b82bf1b-4195-4b62-9bb2-3634aec7f808.MP4">
</p>

**ItemInput.jsx**

```javascript
export default function Loading({ title, type, setFunc, error }) {
...
<>
  <Item floatingLabel last>
    <Label style={styles.label}>{title}</Label>
    <Input
      style={styles.input}
      secureTextEntry={type == "password" ? true : false}
      onChangeText={(text) => {
        setFunc(text);
      }}
    />
  </Item>
  <Item style={{ borderColor: "transparent" }}>
    <Text style={{ color: "deeppink" }}>{error}</Text>
  </Item>
</>
```

**SingInPage.jsx**

```javascript
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
const doSignIn = () => {
  if (email == "") {
    setEmailError("이메일을 입력해주세요");
  } else {
    setEmailError("");
  }

  if (password == "") {
    setPasswordError("비밀번호를 입력해주세요");
  } else {
    setPasswordError("");
  }
};
...
<ItemInput
  title={'E-mail'}
  type={'email'}
  setFunc={setEmailFunc}
  error={emailError}
/>
<ItemInput
  title={'Password'}
  type={'password'}
  setFunc={setPasswordFunc}
  error={passwordError}
/>
...
```

> UI = Component(state) <br> UI 화면은 컴포넌트에 상태가 주입 / 변경될 때 변한다

1. 이메일을 이력 안하거나 패스워드를 입력하지 않으면 로그인 버튼을 눌렀을 때 email, password 상태를 캐치하여 상태값으로 관리
2. emailError, passwordError 상태값이 ItemInput에 전달되어 변화되는 에러 메시지 반영

## 04. 파이어베이스를 이용한 로그인 / 회원가입

- 파이어베이스 : 구글에서 만든 서버리스 서비스
  - 서버리스 서비스 : 서버가 없다는 뜻이 아니라 서버를 직접 만들 필요가 없는 서비스

1. 앱단 즉, 사용자가 이용하는 있는 앱상에서 사용자 정보를 받아옴
2. 파이어베이스 회원 가입 API, createUserWithEmailAndPassword를 사용하여 파이어베이스 계정 관리 서비스에 회원 정보 등록 > Firebase Authentication
3. 파이어베이스 로그인 API, signInWithEmailAndPassword를 사용하여 Authentication에 해당 계정 확인
4. 존재한다면 success 응답 전송

## 05. 파이어베이스 프로젝트 생성

> [Firebase](https://firebase.google.com/?hl=ko)

## 06. 앱 파이어베이스 설정

- 자바스크립트로 앱을 생성하므로 웹 개발 선택

**파이어베이스 expo 도구 설치**

```
expo install firebase

설치 후 config 폴더 생성 > key.js 파일 생성
```

> expo start로 앱 실행 시 터미널에서 컨트롤 + c 를 눌러 엑스포 앱 종료 후 파이어베이스 라이브러리 설치

**key.js**

```javascript
export default {
  firebaseConfig: {
    <-- 생성한 계정 firebaseConfig 붙여넣기 -->
  },
};
```

## 07. 파이어베이스 회원가입 로직 설정

- 파이어베이스와 통신 설정

**App.jsx**

```javascript
//파이어베이스 라이브러리
import firebase from 'firebase/compat/app'
//파이어베이스 접속 키값
import apiKeys from './config/key';
...
export default function App() {
  //파이어베이스 라이브러리가 준비 되면 연결하는 조건문
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  ...
```

- 회원가입시 입력 값

**SignUpPage.jsx**

```javascript
const doSignUp = () => {
  if (password == "") {
    setPasswordError("비밀번호를 입력해주세요");
    return false;
  } else {
    setPasswordError("");
  }

  if (passwordConfirm == "") {
    setPasswordConfirmError("비밀번호 확인을 입력해주세요");
    return false;
  } else {
    setPasswordConfirmError("");
  }

  if (password !== passwordConfirm) {
    setPasswordConfirmError("비밀번호가 서로 일치하지 않습니다");
    return false;
  } else {
    setPasswordConfirmError("");
  }
};
```

- 입력 값이 누락되지 않고 모두 입력이 된 상태여야 파이어베이스에 API 요청 가능
- if 조건문으로 값 누락시 `return false` 실행
- `return false`는 자바스크립트 코드가 진행되다 중간에 멈추는 기능

## 08. 파이어베이스 회원가입 - Authentication API

- 파이어베이스 라이브러리에서 회원가입 함수, 로그인 함수, 데이터베이스 함수 사용 > 자바스크립트 파일로 관리

**config / firebaseFunctions.js**

```javascript
import firebase from "firebase/compat";
import "firebase/compat/firestore";
import { Alert } from "react-native";

export async function registration(nickName, email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    Alert.alert("회원가입 성공");
  } catch (err) {
    Alert.alert("회원가입 실패 -> ", err.message);
  }
}
```

**export**

- export(내보내기) 키워드가 붙은 함수 생성

**async / await**

- 외부 API를 사용하거나 데이터베이스 접속과 같은 무거운 기능 사용 시 자바스크립트에서 작성한 코드 순서로 실행되기 위해 사용하는 문법
- 자바스크립트 코드 순서를 강제
- 함수 앞에 async를 쓰면 내부에서 사용되는 함수 이름 앞에 await를 쓰는 쌍의 구조

> [참조](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

**파이어베이스 회원가입 함수 API**

```javascript
await firebase.auth().createUserWithEmailAndPassword(email, password);
const currentUser = firebase.auth().currentUser;
```

- `import firebase from 'firebase/compat/app'` 파이어베이스 라이브러리에서 `auth()` 함수 호출
- `auth()` 함수 안의 `createUserWithEmailAndPassword` 함수 사용
- `firebase.auth()`에서 currentUser 값 변수 생성 < `쿠키, 세션` 기능으로 관리

> 쿠키 & 세션 <br> 브라우저에 데이터를 저장해두고 사용하는 기능

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/151308086-24cf5067-b763-40d4-af97-3ff99f969a4c.MP4">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/151308205-5e05ac34-e3e1-42a1-a88f-9db3f7ff48a1.mp4">
</p>

**SignUpPage.jsx**

```javascript
import { registration } from '../config/firebaseFunctions';
...
const doSignUp = () => {
  ...
  registration(nickName, email, password);
};
```

1. 유효한 계정 정보인지 체크 (이메일 @ 형식 확인)
2. 회원 정보 암호화 (사용지 UID) 관리

## 09. 파이어베이스 회원가입 - Cloud Firestore

**Authentication**

- 정제된 회원 데이터 암호화하여 관리
- 사용자 UID 갑 생성 및 보유

**Cloud Firestore**

- 구체적인 회원 데이터 저장 및 관리
- 사용자 UID 보유

> 두 서비스 모두 사용자 UID를 보유하여 로그인할 땐 Authentication에서 인증 진행 후 구체적 회원 정보를 가져올 땐 Cloud Firestore에서 관리

**firebaseFunctions**

```javascript
export async function registration(nickName, email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    Alert.alert("회원가입 성공");
  } catch (err) {
    Alert.alert("회원가입 실패 -> ", err.message);
  }
}
```

- `collection`은 책과 같은 개념
- `doc`은 목차
- `set`은 안에 삽입할 내용을 딕셔너리 형태로 저장 및 관리

## 10. 파이어베이스 로그인

- 파이어베이스 Authentication 서비스 조회 == 로그인

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/151308677-ebb977ea-fee9-4a23-8162-cff6d8924840.mp4">
</p>

**firebaseFunctions**

```javascript
...
export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.replace("TabNavigator");
  } catch (err) {
    Alert.alert("로그인 실패 -> ", err.message);
  }
}
```

- `try...catch` 문으로 로그인 성공 시 TanNavigator로 화면 전환
- `email.trim()`과 같이 trim 함수를 이용해 문자열 앞뒤의 공백 제거

## 11. 파이어베이스 로그인 / 회원가입 심화

- 회원 가입 후 바로 MainPage로 이동

```javascript
export async function registration(nickName, email, password, navigation) {
  try {
    ...
    navigation.navigate('TabNavigator');
    ...
```

- 로그인 / 회원가입 후 메인페이지로 갔을 때 뒤로가기 막기
- 로그아웃 실행 후 로그인 페이지로 갔을 때 뒤로가기 막기

**MainPage.jsx & SignInPage.jsx**

```javascript
...
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);
  ...
```

**firebaseFunctions.js**

```javascript
navigation.navigate('TabNavigator'); -> navigation.push('TabNavigator');

navigation.replace('TabNavigator'); -> navigation.push('TabNavigator');
```

- beforeRemove : 이 전 페이지 기록 삭제

> iOS는 기본적으로 gesture 옵션 true
> 왼쪽에서 오른쪽을 쓸어넘겨 뒤로가기

**StackNavigator.jsx**

```javascript
...
<Stack.Screen
  name="SignInPage"
  component={SignInPage}
  options={{ gestureEnabled: false }}
/>
...
```
