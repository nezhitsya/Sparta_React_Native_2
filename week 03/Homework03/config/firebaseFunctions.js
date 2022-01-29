import firebase from "firebase/compat";
import "firebase/compat/firestore";
import { Alert } from "react-native";

export async function registration(nickName, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("회원가입 실패 -> ", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("로그인 실패 -> ", err.message);
  }
}

export async function logout(navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    await firebase.auth().signOut();
    navigation.push("SignInPage");
  } catch (err) {
    Alert.alert("로그아웃 실패 -> ", err.message);
  }
}
