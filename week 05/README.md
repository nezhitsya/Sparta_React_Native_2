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
