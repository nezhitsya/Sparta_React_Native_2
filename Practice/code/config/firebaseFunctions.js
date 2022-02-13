import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { Alert, AsyncStorage } from "react-native";

export async function registration(nickName, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    await AsyncStorage.setItem("session", email);
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("회원가입 실패 -> ", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    await AsyncStorage.setItem("session", email);
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("로그인 실패 -> ", err.message);
  }
}

export async function logout(navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    await AsyncStorage.removeItem("session");
    await firebase.auth().signOut();
    navigation.push("SignInPage");
  } catch (err) {
    Alert.alert("로그아웃 실패 -> ", err.message);
  }
}

export async function addDiary(content) {
  try {
    const db = firebase.firestore();
    let userRef = await db.collection("users").doc(content.uid);
    let data = await userRef.get().then((doc) => {
      return doc.data();
    });

    content.author = data.nickName;

    await db
      .collection("diary")
      .doc(content.date + "D")
      .set(content);
    return true;
  } catch (err) {
    Alert.alert("글 작성 실패 -> ", err.message);
    return false;
  }
}

export async function imageUpload(blob, date) {
  const storageRef = firebase
    .storage()
    .ref()
    .child("diary" + date);
  const snapshot = await storageRef.put(blob);
  const imageUrl = await snapshot.ref.getDownloadURL();
  blob.close();
  return imageUrl;
}

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

export async function getProfile(setProfile) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  let snapshot = await db.collection("users").doc(currentUser.uid);
  let data = await snapshot.get().then((doc) => {
    return doc.data();
  });
  setProfile(data);
  return data;
}

export async function getDataCount(setDataCount) {
  const db = firebase.firestore();
  const snapshot = await db.collection("diary").orderBy("date", "desc").get();
  if (snapshot.empty) {
    setDataCount(0);
    return 0;
  } else {
    setDataCount(snapshot.docs.length);
    return snapshot.docs.length;
  }
}

export async function getCommentCount(setCommentCount) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  let snapshot = await db
    .collection("comment")
    .where("uid", "==", currentUser.uid)
    .get();
  if (snapshot.empty) {
    setCommentCount(0);
    return 0;
  } else {
    setCommentCount(snapshot.docs.length);
    return snapshot.docs.length;
  }
}
