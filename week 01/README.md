# 앱개발 플러스 - 1 주차

### [수업 목표]

1. Expo 앱 개발 환경 세팅과 유용한 개발 환경 세팅
2. JSX 문법 리뷰 및 앱화면 만들기
3. 필수 리액트 기본 지식 및 함수

## 01. 1 주차

- 앱 화면
  - 화면을 그리는 기술 JSX 문법과 StyleSheet에 대한 내용을 리뷰해보면서 자주 실수하는 부분 및 추가로 유용하게 쓰이는 기술 학습
- 최소한의 리액트 개념
  - 컴포넌트 (Component)
  - 상태 (State, useState)
  - 속성 (Props)
  - useEffect

> 리액트 네이티브는 리액트 (React.js) 기반으로 만들어진 앱 개발 기술

## 02. 필수 프로그램 설치

- [Visual Studio Code](https://code.visualstudio.com)
- [안드로이드 스튜디오](https://developer.android.com/studio/)
- [XCode](https://apps.apple.com/kr/app/xcode/id497799835?mt=12)
- [node, npm](https://nodejs.org/download/release/v12.19.1/node-v12.19.1.pkg)

## 03. Expo 개념

**Expo**

- 리액트 네이티브를 좀 더 쉽게 개발 할 수 있도록 도와주는 도구
- 개발 중인 앱 확인해주는 앱 제공
  - [iOS](https://apps.apple.com/app/apple-store/id982107779)
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

> 리액트 네이티브를 사용하는 상황과 Expo를 사용하여 앱을 만드는 상황은 다르다.

**React Native vs Expo**

- 리액트 네이티브 개발
  - RN Core나 Expo SDK에서 지원하지 않는 네이티브 모듈 사용 시 Expo를 사용 X
  - Expo 개발 환경에서 expo eject 명령어로 Expo 환경을 걷어 낸 후 순수 리액트 네이티브로 개발
  - Expo에서 제공하는 쉬운 앱 배포 기능 사용 불가
- Expo 개발
  - 빠르게 앱 개발 후 배포 및 일반적 앱 기능으로 앱 서비스 개발 시 적합

> 초기 앱 기획 시 어떤 기능이 필요할지 나열 후 Expo에 해당 기능 지원 여부 확인 후 진행

## 04. nvm으로 Node 버전 관리

**Node 버전 관리 필요성**

- Node.js는 자바스크립트로 개발할 수 있게 해주는 자바 스크립트 기반 개발 환경 의미
- Node 버전이 앱 개발 시 문제 발생 가능성
  - ex. Firebase : Node 버전 14에서 버그 발생

**Node 버전 관리 툴 nvm**

- 사용 라이브러리에 따라 Node 개발 환경이 프로젝트 별로 다를 경우

**nvm 설치 및 사용**

- [윈도우](https://github.com/coreybutler/nvm-windows/releases)
- 맥

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

    - Node version 12
    ```
    nvm install 12
    nvm use 12.20.1
    ```

## 05. [Expo 프로젝트 생성](https://github.com/nezhitsya/Sparta_React_Native/blob/master/week%2002/README.md) & Expo 명령어

**Expo 명령어 도구 설치**

```
sudo npm install -g expo-cli
```

**[Expo](https://expo.io/signup) 가입 및 로컬에 계정 세팅**

```
expo login --username "Expo 사이트 가입당시 입력한 name"
...
expo 패스워드 입력란 > 차례대로 입력하면 로그인
```

**Expo 프로젝트 생성**

```
expo init 프로젝트명
// blank template 선택
```

**Expo 프로젝트 실행**

```
expo start
```

## 06. 코드 스타일 지정 - Prettier

**Prettier 설치**
<img width="927" src="https://user-images.githubusercontent.com/60697742/149708435-a20c3c86-2778-4bab-89e5-89cb29d9c641.png">

1. .prettierrc 파일을 app.js 위치에 생성
2. Prettier의 [옵션 문서](https://prettier.io/docs/en/options.html)에서 필요한 설정 지정

```
{
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true
}
```

3. vscode editor 설정

```
1. mac (shift + command + p) / window (ctrl + ,)
2. user settings (JSON)

// 추가
{
    ...
    "javascript.format.enable": false,
    "prettier.jsxBracketSameLine": true
}

3. Code -> Preferences -> Settings
4. Format On Save 설정 체크
5. Default Formatter 설정 esbenp.prettier-vscode로 변경
```

4. 화면이 깨지면 .js 파일을 .jsx 파일로 변경

> 기본적으로 .js 확장자 (자바스크립트) 기준으로 규칙 적용하기 때문에 발생.
> 따라서 <> 태그 문법과 자바스크립트 문법 동시 사용 JSX 문법 코드 파일은 .jsx 확장자로 변경.

## 07. JSX 기본 원칙 5 가지

- App.jsx는 JSX 문법으로 그려져 준비된 화면 반환
- return은 작성한 JSX 문법으로 구성된 화면을 앱상에 보여주는 역할 = **렌더링 (rendering)**
- <> 꺽쇠 (태그) 로 작성된 문법은 JSX라 부르는 화면을 그리는 문법
- <> </>와 같이 닫는 태그로 온전히 화면의 한 영역 구성 시 **엘리먼트**라 일컫음

**1. 모든 태그는 가져와서 사용**

- View, Text 문법은 임의의 태그가 아닌 리액트 네이티브에서 제공하는 태그 문법 - [공식 사용 설명서](https://docs.expo.io/versions/v38.0.0/react-native/view/)

```
import { StyleSheet, Text, View } from 'react-native';
```

**2. 태그는 항상 닫는 태그와 자체적으로 닫는 태그 구분 사용**

- [리액트 네이티브 공식 문서](https://reactnative.dev/docs/view)
- [Expo 공식 문서](https://docs.expo.io/versions/v38.0.0/react-native/view/)

**3. 모든 엘리먼트는 감싸는 최상위 엘리먼트 존재 (엘리먼트 == 태그)**

```javascript
<View>
  <Text>Open up App.js to start working on your app!</Text>
  <StatusBar style="auto" />
</View>
```

- 감싸는 엘리먼트 없이 진행해야 할 경우 의미없는 엘리먼트 <> </>로 감싸서 진행

```javascript
<>
  <View>
    <Text>Open up App.js to start working on your app!</Text>
  </View>
  <StatusBar style="auto" />
</>
```

**4. return에 의해 렌더링 시 항상 소괄호로 감싸져야 한다**

**5. JSX 문법 밖과 안의 주석은 다르다**

```javascript
export default function App() {
  //JSX밖에서의 주석
  return (
    //JSX 밖에서의 주석
    <View style={styles.container}>
      {/*
		JSX 문법 안에서의 주석
	  */}
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

## 08. JSX 주요 태그와 속성 01

**< View >** **</ View >**

- 화면의 영역 (레이아웃)을 잡아주는 엘리먼트
- View 엘리먼트로 화면 분할 가능 but StyleSheet를 활용해 **Flex** 사용

```javascript
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainerOne}></View>
      <View style={styles.subContainerTwo}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainerOne: {
    flex: 1,
    backgroundColor: "yellow",
  },
  subContainerTwo: {
    flex: 1,
    backgroundColor: "green",
  },
});
```

**< Text >**

- 앱에 글을 작성하기 위해 사용하는 엘리먼트

```javascript
<View style={styles.container}>
  <Text>
    그날이 오면 그날이 오며는 삼각산(三角山)이 일어나 더덩실 춤이라도 추고,
    한강(漢江)물이 뒤집혀 용솟음칠 그날이, 이 목숨이 끊기기 전에 와주기만 할
    양이면 나는 밤하늘에 날으는 까마귀와 같이 종로(鐘路)의 인경을 머리로
    들이받아 울리오리다. 두개골은 깨어져 산산조각이 나도 기뻐서 죽사오매 오히려
    무슨 한(恨)이 남으오리까.
  </Text>
</View>
```

- 줄바꿈

  - { `` } 안에 줄바꿈 포함 글 작성

  ```javascript
  <View style={styles.container}>
    <Text>
      {`그날이 오면 그날이 오며는
      삼각산(三角山)이 일어나 더덩실 춤이라도 추고,
      한강(漢江)물이 뒤집혀 용솟음칠 그날이,
      이 목숨이 끊기기 전에 와주기만 할 양이면
      나는 밤하늘에 날으는 까마귀와 같이
      종로(鐘路)의 인경을 머리로 들이받아 울리오리다.
      두개골은 깨어져 산산조각이 나도
      기뻐서 죽사오매 오히려 무슨 한(恨)이 남으오리까. `}
    </Text>
  </View>
  ```

  - 특정 부분만 띄우고 싶다면 {"\n"} 표현식을 사용해서 구현

  ```javascript
  <View style={styles.container}>
    <Text>
      그날이 오면 그날이 오며는{"\n"}
      삼각산(三角山)이 일어나 더덩실 춤이라도 추고,{"\n"}
      한강(漢江)물이 뒤집혀 용솟음칠 그날이,{"\n"}이 목숨이 끊기기 전에 와주기만
      할 양이면{"\n"}
      나는 밤하늘에 날으는 까마귀와 같이{"\n"}
      종로(鐘路)의 인경을 머리로 들이받아 울리오리다.{"\n"}
      두개골은 깨어져 산산조각이 나도{"\n"}
      기뻐서 죽사오매 오히려 무슨 한(恨)이 남으오리까.{"\n"}
    </Text>
  </View>
  ```

- 말줄임표

  - numberOfLines 속성을 사용하여 긴 글에서 몇 줄만 보이게 할지 결정 가능

  ```javascript
  <View style={styles.container}>
    <Text numberOfLines={3}>
      그날이 오면 그날이 오며는{"\n"}
      삼각산(三角山)이 일어나 더덩실 춤이라도 추고,{"\n"}
      한강(漢江)물이 뒤집혀 용솟음칠 그날이,{"\n"}이 목숨이 끊기기 전에 와주기만
      할 양이면{"\n"}
      나는 밤하늘에 날으는 까마귀와 같이{"\n"}
      종로(鐘路)의 인경을 머리로 들이받아 울리오리다.{"\n"}
      두개골은 깨어져 산산조각이 나도{"\n"}
      기뻐서 죽사오매 오히려 무슨 한(恨)이 남으오리까.{"\n"}
    </Text>
  </View>
  ```

## 09. JSX 주요 태그와 속성 02
