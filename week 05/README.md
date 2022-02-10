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
