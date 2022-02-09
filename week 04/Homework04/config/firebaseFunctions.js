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
