# 앱개발 플러스 - 2 주차

### [수업 목표]

1. 탭 네비게이터
2. NativeBase & 컴포넌트
3. 애니메이션
4. 컴포넌트 활용
5. 실전 상태 관리 활용

## 01. 2 주차

- 스택 네비게이터
  - 필요한 페이지들과 폴더들을 준비
  - 컴포넌트 페이지화
- 탭 네비게이터
  - 한 페이지에 여러 화면을 담는 기능
  - 화면 하단에 탭 버튼으로 페이지 이동
- NativeBase
  - 미리 만들어진 StyleSheet 태그를 제공하는 스타일 도구
- 애니메이션
  - 사용자의 편의, 사용자 친화적 UI를 제공하기 위한 애니메이션

## 02. 페이지 & 폴더 구성

- pages
- components
  - 코드를 재사용할 수 있게 분리된 컴포넌트가 들어있는 폴더
- navigations
  - 컴포넌트에 페이지 기능을 붙여놓는 코드가 들어있는 폴더

## 03. 네비게이터

1. 페이지 이동 도움
2. 데이터 전송
3. 화면을 목적에 맞게 구성

> 페이징을 위해 외부 라이브러리 사용
> [react-navigation 공식 문서](https://reactnavigation.org/)

**설치**

```
yarn add @react-navigation/native

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## 04. 스택 네비게이터

- 페이지 이동 및 이동 시 데이터 전송을 위해 페이지 기능 삽입해주는 라이브러리
- 컴포넌트를 페이지화

**설치**

```
yarn add @react-navigation/stack
```

- < Stack.Screen >에 페이지화하여 스택 네비게이터에 연결
- < Stack.Navigator >라는 목차 페이지에 컴포넌트들을 연결시킨 < Stack.Screen >들을 나열한 구조

```javascript
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
          borderBottomColor: "black",
          shadowColor: "black",
          height: 100,
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="SignInPage" component={SignInPage} />
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="AddPage" component={AddPage} />
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
```

- 앱 상의 최상단 파일, App.jsx에 전달
- < Stack.Screen > 순서상 가장 위에 있는 페이지가 먼저 보여짐

```javascript
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigations/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
});
```

- 스택 네비게이터는 페이지화를 거친 컴포넌트에 기본적 헤더 스타일 부여

## 05. navigate 함수 & route.param

- 함수 파라미터 부분에서 비구조 할당을 활용하여 스택 네비게이터가 부여해주는 기능 중 원하는 기능만 사용 가능

```javascript
//navigation 객체가 가지고 있는 두 함수(setOptions와 navigate)
export default function SignUpPage({ navigation, route }) {}

//해당 페이지의 제목을 설정할 수 있음
navigation.setOptions({
  title: "wegram",
});

//Stack.screen에서 name 속성으로 정해준 이름을 지정해주면 해당 페이지로 이동하는 함수
navigation.navigate("DetailPage");

//name 속성을 전달해주고, 두 번째 인자로 딕셔너리 데이터를 전달해주면, Detail 페이지에서
//두번째 인자로 전달된 딕셔너리 데이터를 route 딕셔너리로 로 받을 수 있음
navigation.navigate("DetailPage", {
  title: title,
});

//전달받은 데이터를 받는 route 딕셔너리
//비구조 할당 방식으로 route에 params 객체 키로 연결되어 전달되는 데이터를 꺼내 사용
//navigate 함수로 전달되는 딕셔너리 데이터는 다음과 같은 모습이기 때문
/*
  {
		route : {
			params :{
				title:title
			}
		}
	}

*/
const { title } = route.params;
```

- Stack.Screen은 헤더 부분의 제목과 스타일을 변경해주는 navigation.setOptions부터 페이지 이동, 데이터 전달, 데이터 받기 등 다양한 기능들을 제공

**페이지 이동**

- SignInPage (맨 첫 페이지)에서 SignUpPage로 이동

```javascript
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function SignInPage({ navigation }) {
  const goSignUp = () => {
    navigation.navigate("SignUpPage");
  };

  return (
    <View style={styles.container}>
      <Text>SignInPage</Text>
      <TouchableOpacity onPress={goSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/150071076-970e02c8-7d12-4d17-ad47-861c74d33567.MP4">
</p>

- StackNavigator로부터 넘겨 받는 navigation에는 .navigate 뿐만 아니라 뒤로 가게끔 해주는 goBack 함수, 페이지 헤더 부분의 제목 또는 스타일을 변경 시켜주는 setOptions 함수 제공

> [스택 네비게이터 공식 문서](https://reactnavigation.org/docs/navigation-prop/#navigate)

**페이지 이동 시 데이터 전송**

- route의 params 딕셔너리에서 값을 꺼내 사용
- 이전 페이지에서 넘긴 데이터들은 route.params에 딕셔너리 형태로 존재

- SignInPage에서 SignUpPage로 title 데이터 값 전송

SignInPage

```javascript
const goSignUp = () => {
  navigation.navigate("SignUpPage", { title: "from SignInPage" });
};
```

SignUpPage

```javascript
export default function SignUpPage({ route }) {
  return (
    <View style={styles.container}>
      <Text>SignUpPage</Text>
      <Text>{route.params.title}</Text>
    </View>
  );
}
```

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/150071602-b39d8b1e-2cdb-41e5-a5ff-15afc98ab5c5.MP4">
</p>

```javascript
//전달받은 데이터를 받는 route 딕셔너리
//비구조 할당 방식으로 route에 params 객체 키로 연결되어 전달되는 데이터를 꺼내 사용
//navigate 함수로 전달되는 딕셔너리 데이터는 다음과 같은 모습이기 때문
/*
  {
		route : {
			params :{
				title:title
			}
		}
	}

*/
const { title } = route.params;
```

## 06. 탭 네비게이터 적용

**설치**

```
yarn add @react-navigation/bottom-tabs
```
