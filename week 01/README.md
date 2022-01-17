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
