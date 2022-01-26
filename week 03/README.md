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
