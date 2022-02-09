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
