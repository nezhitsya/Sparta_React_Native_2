# 앱개발 플러스 - 5 주차

### [수업 목표]

1. flatList 무한 스크롤
2. 댓글 및 좋아요 구현
3. 내가 쓴 글 불러오기 (마이페이지)

## 01. 5 주차

- 게시글 무한 스크롤
- 사용자들과 상호 커뮤니케이션을 위한 댓글 기능
- 좋아요 눌렀던 게시글을 껐다 켰을 때 버튼 상태 유지

## 02. FlatList - 일정 개수 불러오기

**무한 스크롤**

- 게시글 5개 > 스크롤 하단까지 내린다 > 다음 3개 출력

1. `앱 속도 증진`
2. `사용자 이탈 감소`

**Cloud Firebase에서 특정 개수 게시글 출력**

**MainPage.jsx**

```javascript
const [next, setNext] = useState(0);

const readyData = async () => {
  const data = await getData(setNext);
  setData(data);
};
```

**firebaseFunctions.js**

```javascript
export async function getData(setNext) {
  try {
    let data = [];
    const db = firebase.firestore();
    const first = db.collection("diary").orderBy("date", "desc").limit(5);
    const snapshot = await first.get();
    snapshot.docs.map((doc) => {
      data.push(doc.data());
    });

    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
    }
    setNext(last.data().date);
    return data;
  } catch (err) {
    return false;
  }
}
```

1. 데이터 추출
2. 다음 순서로 넘겨줄 마지막 데이터를 상태 관리에 저장
3. 사용자가 스크롤을 내려 5개를 다 보면
4. 상태에 저장된 마지막 데이터 출력 및 다음 5개 데이터를 가져옴
5. 그 다음 데이터를 출력했을 때, 다시 마지막 데이터를 상태 관리에 저장

## 03. FlatList - 무한 스크롤 적용

> [FlatList 공식문서](https://docs.expo.io/versions/latest/react-native/flatlist/)

**MainPage.jsx 구조 변경**

```javascript
<Container>
  <Header />
  <Content>
    <CardComponent />
  </Content>
</Container>
```

⬇︎

```javascript
<Container>
  <Header/>
  <FlatList
		 header={()=>{return (<Content></Content>)}}
     renderItem={()=> { return (<CardComponent/>)}}
   >
</Container>
```

1. FlatList가 Content 영역의 역할 수행
2. Content와 CardComponent 부분 분리

> FlatList는 큰 ScrollView 기능의 도화지

- Header 지정

```javascript
ListHeaderComponent={() => {
  return (
  )
}}
```

- **renderItem** : 어떤 컴포넌트를 반복해서 보여주려 하는지 지정

```javascript
<View style={{ marginTop: -20 }}>
  {data.map((content, i) => {
    return <CardComponent content={content} key={i} navigation={navigation} />;
  })}
</View>
```

⬇︎

```javascript
renderItem={(data) => {
  return (
    <CardComponent navigation={navigation} content={data.item} />
  );
}}
```

- **numColumns** : 한 줄에 몇 개의 컴포넌트를 보여줄 것인지 지정
- **keyExtractor** : map 반복문을 돌릴 때 유니크한 값을 넘겼던 key 속성과 유사한 기능

```javascript
numColumns={1}
keyExtractor={(item) => item.data.toString()
```

- **onEndReached** : 바닥 근처에 갔을 때 실행될 함수 지정
- **onEndReachedThreshold** : 바닥에서 얼마나 이격돼야 바닥으로 간주할 것인지 수치 입력 란 (0 : 바닥에 닿았을 때 함수 실행)

```javascript
onEndReachedThreshold={0}
onEndReached={async () => {

}}
```

- **ActivityIndicator** : 로딩바 구현

```javascript
{data.length == 0 ? (
  <ActivityIndicator size="large" />
) : (
  <FlatList ...
```

## 04. FlatList - 데이터 연결

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/153354658-fb21769a-b71d-4395-8a60-50b6dd796166.mov">
</p>

**firebaseFunctions.js**

```javascript
export async function getNextData(nextDate, setNext) {
  try {
    let data = [];
    const db = firebase.firestore();
    const next = db
      .collection("diary")
      .orderBy("date", "desc")
      .startAfter(nextDate)
      .limit(5);
    const snapshot = await next.get();
    snapshot.docs.map((doc) => {
      doc.data();
      data.push(doc.data());
    });

    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
      setNext(last.data().date);
      return data;
    } else {
      return 0;
    }
  } catch (err) {
    return false;
  }
}
```

**MainPage.jsx**

```javascript
onEndReached={async () => {
  let nextData = await getNextData(next, setNext);
  if (nextData == 0) {
    Alert.alert('마지막 글입니다.');
  } else {
    let newData = [...data, ...nextData];
    await setData(newData);
  }
}}
```

- **startAfter** : 다음 데이터 가져올 준비

```javascript
const next = db
  .collection("diary")
  .orderBy("date", "desc")
  .startAfter(nextDate)
  .limit(5);
```

- 스프레드 연산자

```javascript
let newData = [...data, ...nextData];
```

> 기존 게시글이 담겨있는 상태 값 data와 새로운 게시글이 담겨있는 nextData 변수를 합칠 때 사용하는 문법

## 05. 댓글 DB 구상

1. 다이어리 컨텐츠 문서 안에 comment 컬렉션 생성 후 게시글 고유의 댓글 date 저장 (게시글을 불러올 때 댓글 모두 출력)
2. diary, users 레벨의 새로운 컬렉션 생성 (diary 유니크 문서값을 통해 댓글 데이터 출력)

> 1번은 댓글 양 증가 시 게시글 당 가져와야 하는 데이터 증가

## 06. 댓글 저장

**DetailPage.jsx**

```javascript
const [commentInput, setCommentInput] = useState("");

const commentFunc = async () => {
  let date = new Date();
  let getTime = date.getTime();
  const currentUser = firebase.auth().currentUser;
  let comment = {
    date: getTime,
    comment: commentInput,
    did: content.date + "D",
    uid: currentUser.uid,
  };
};

return (
  ...
  <Item style={{ marginTop: 100 }}>
    <Input
      placeholder="Comment"
      value={commentInput}
      onChangeText={(text) => {
        setCommentInput(text);
      }}
    />
    <Icon
      active
      name="paper-plane"
      onPress={() => {
        commentFunc();
      }}
    />
  </Item>
  ...
)
```

**DetailPage -> DB(comment)**

1. 작성 시간 (date)
2. 코멘트 (comment)
3. 다이러리 아이디 (did)
4. 작성자 아이디 (uid)

**firebaseFunctions.js**

- 댓글 컬렉션 생성 및 users 컬렉션 조회하여 사용자 닉네임 조회

```javascript
export async function addComment(comment) {
  try {
    const db = firebase.firestore();
    let userRef = await db.collection("users").doc(comment.uid);
    let data = await userRef.get().then((doc) => {
      return doc.data();
    });
    comment.author = data.nickName;
    await db
      .collection("comment")
      .doc(comment.data + "D")
      .set(comment);
    return true;
  } catch (err) {
    Alert.alert("댓글 작성 오류 -> ", err.message);
    return false;
  }
}
```

## 댓글 상태 관리

**firebaseFunctions.js**

```javascript
export async function getComment(did) {
  const db = firebase.firestore();
  let data = [];
  let snapshot = await db.collection("comment").where("did", "==", did).get();
  if (snapshot.empty) {
    return 0;
  } else {
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }
}
```

- firebase의 where 절 사용

```javascript
// comment 컬렉션에 저장된 댓글 데이터 중 did 값이 DetailPage로부터 넘어온 값과 일치하는 데이터를 골라 조회하는 조건문
let snapshot = await db.collection("comment").where("did", "==", did).get();
```

**DetailPage.jsx**

```javascript
const [comment, setComment] = useState([]);

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

  commentLoad(content.date);
}, []);

const commentLoad = async (did) => {
  let c = await getComment(did + "D");
  if (c == 0) {
  } else {
    setComment(c);
  }
};

return (
  ...
  <List>
    {comment.map((c, i) => {
      return <CommentComponent key={i} comment={c} />;
    })}
  </List>
  ...
)
```

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/153368958-3c7d916f-a6cc-44ae-86f2-18b1cb862221.mov">
</p>

- 댓글 등록 후 바로 출력

**DetailPage.jsx**

```javascript
const commentFunc = async () => {
  let date = new Date();
  let getTime = date.getTime();
  const currentUser = firebase.auth().currentUser;
  let newComment = {
    date: getTime,
    comment: commentInput,
    did: content.date + "D",
    uid: currentUser.uid,
  };

  let result = await addComment(newComment);
  if (result) {
    Alert.alert("댓글 저장");
    await setComment([...comment, newComment]);
  }
};
```

> 배열 + 배열을 위해 사용했던 스프레드 연산자를 통해 배열에 새 객체 추가 <br> 기존의 상태값은 보존하면서 새로운 값 추가 (데이터 불변성)

## 08. 좋아요 기능 DB 구상

- diary 게시글 안에 좋아요(likes) 리스트 삽입 (비관계형 데이터베이스의 장점 : 유연함)

```
diary -> doc -> field
             -> likes -> doc -> field
```

1. 한 다이어리 글에 몇 명이 좋아요를 눌렀는지 축적될 내부의 likes zjffprtus
2. 내가 좋아요를 누른 글은 빨간 하트가 처리되어야해 내가 likes 안에 있는지 확인

## 09. 좋아요 기능 DB 저장

1. 로그인한 사용자의 uid를
2. 해당 diary의 likes 컬렉션에 저장

**MainPage.jsx**

```javascript
useEffect(() => {
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });
  readyData();
}, []);

const readyData = async () => {
  const data = await getData(setNext);
  setData(data);
};
```

⬇︎

```javascript
useEffect(() => {
  navigation.addListener("beforeRemove", (e) => {
    e.preventDefault();
  });
  getData(setNext, setData);
}, []);
```

- readyData() 함수를 useEffect 안으로 넣어 getDate()에 넘겨 관리

**firebaseFunctions.js**

```javascript
export async function doLike(uid, did) {
  try {
    const db = firebase.firestore();
    const date = new Date();
    const getTime = date.getTime();
    await db.collection("diary").doc(did).collection("likes").doc(uid).set({
      date: getTime,
    });
    return true;
  } catch (error) {
    return false;
  }
}
```

1. 넘겨받은 did로 다이어리 특정 게시글 탐색
2. 내부 likes 컬렉션 생성 후 uid 이름으로 문서(doc) 생성
3. 사용자가 좋아요를 누르면 uid 문서 이름으로 누적
4. 언제 좋아요를 눌렀는지 날짜 데이터를 필드 값으로 저장

> 문서는 같은 값 중복 체크 기능을 제공하여 같은 게시글을 여러 번 좋아요 눌러도 딱 한 번만 저장

**CardComponent.jsx**

```javascript
const likeFunc = () => {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser.uid;
  const did = content.date + "D";
  let result = doLike(uid, did);
  if (result) {
    console.log("likes");
  }
};
```

1. 어떤 사용자가 눌렀는지 : `uid`
2. 어떤 게시글에 좋아요를 눌렀는지 : `did`

**firebaseFunctions**

```javascript
export async function getData(setNext, setData) {
  try {
    let data = [];
    const db = firebase.firestore();
    const first = db.collection("diary").orderBy("date", "desc").limit(5);
    const snapshot = await first.get();
    const currentUser = firebase.auth().currentUser;

    let last;
    if (snapshot.docs.length !== 0) {
      last = snapshot.docs[snapshot.docs.length - 1];
    }
    setNext(last.data().date);

    let count = 0;
    let limit = snapshot.docs.length;

    snapshot.docs.map(async (doc) => {
      let d = doc.data();
      const like = await db
        .collection("diary")
        .doc(d.date + "D")
        .collection("likes")
        .doc(currentUser.uid)
        .get();
      if (like.data() == undefined) {
        d.like = false;
      } else {
        d.like = true;
      }
      count += 1;
      data.push(d);
      if (count == limit) {
        setData(data);
      }
    });
    return data;
  } catch (err) {
    return false;
  }
}
```

- 로그인 한 사용자가 어떤 게시글을 좋아요 눌렀는지 조회

1. 어떤 문서(doc)에 likes 컬렉션의 누가 눌렀는지에 대해 게시글 출력
2. 반복문을 돌린 map 함수 내부에서 또 한 번 조회
3. 좋아요를 누른 적이 있다면 likes 변수에 값 저장
4. 그렇지 않으면 undefined로 저장
5. 밖으로 내보낼 게시글 데이터에 like 키값을 두고 눌렀으면 true, 아니면 flase

## 10. 좋아요 매칭 및 해제

<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/60697742/153532118-7c26579d-23e6-46cf-a9ab-2dee086ffd95.mov">
</p>

- 좋아요 매칭

**CardComponent.jsx**

```javascript
<Icon
  name={content.like == true ? "heart" : "heart-outline"}
  style={content.like == true ? styles.pink : styles.grey}
  onPress={() => {
    likeFunc();
  }}
/>
```

- 좋아요 해제

**CardComponent.jsx**

```javascript
const [like, setLike] = useState(false);

useEffect(() => {
  if (content.like == true) {
    setLike(true);
  } else {
    setLike(false);
  }
}, []);

const likeFunc = () => {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser.uid;
  const did = content.date + "D";
  let result = doLike(uid, did);
  if (result) {
    if (like == true) {
      setLike(false);
    } else {
      setLike(true);
    }
  }
};
```

1. doLike 함수에 like 데이터를 넘겨 해제할 것인지, 좋아요 정보를 저장할 것인지 결정
2. 좋아요 데이터에 변화가 있으면 상태를 변경시켜 화면에 출력

**firebaseFunctions.jsx**

```javascript
export async function doLike(uid, did, like) {
  try {
    const db = firebase.firestore();
    const date = new Date();
    const getTime = date.getTime();

    if (like == true) {
      await db
        .collection("diary")
        .doc(did)
        .collection("likes")
        .doc(uid)
        .delete();
    } else {
      await db.collection("diary").doc(did).collection("likes").doc(uid).set({
        date: getTime,
      });
    }
    return true;
  } catch (error) {
    return false;
  }
}
```

## Prologue - React Native Tip

- 리액트 기본 기술 공부
  - 근간이 리액트이기 때문에 리액트 기본기 다지기 중요

> [리액트 네이티브 패키지 정리](https://github.com/jondot/awesome-react-native)

> [코드 비교 사이트](https://www.diffchecker.com/)

## 배포하기

### 01. 배포 체크리스트

1. 앱 로고
2. 스플래스 스크린 (앱 시작 초기 화면)
3. 앱 마켓에 올릴 설명 이미지

### 02. 스플래시 스크린 / 로고

> [온라인 포토샵](https://pixlr.com/kr/x/)

### 03. 최종 앱 파일 생성

1. Expo를 통한 최종 앱 파일 생성
2. 구글 플레이 개발자 라이센스 가입 및 구입
3. 구글 플레이 스토어에 앱 배포

- PERMISSION 문제로 배포가 안되는 현상

```
"android": {
  "package": "",
  "versionCode": 1,
  "config": {
    "googleMobileAdsAppId": ""
  },
  "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE"]
},
```

- 안드로이드 앱 빌드(생성) 명령어

```
expo build:android


// ios
expo build:ios

> apk 파일 선택
> expo 사이트에서 다운
```
