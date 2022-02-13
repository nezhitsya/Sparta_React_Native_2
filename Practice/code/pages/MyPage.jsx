import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Thumbnail } from "native-base";
import {
  logout,
  getData,
  getNextData,
  getProfile,
  getCommentCount,
  getDataCount,
} from "../config/firebaseFunctions";
import HeaderComponent from "../components/HeaderComponent";
import ImageComponent from "../components/ImageComponent";

const my = require("../assets/my.png");
// const data = require('../data.json');

export default function MyPage({ navigation }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);
  const [dataCount, setDataCount] = useState("");
  const [commentCount, setCommentCount] = useState("");
  const [profile, setProfile] = useState([]);

  const logoutFunc = () => {
    logout(navigation);
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
    getData(setNext, setData);
    getProfile(setProfile);
    getDataCount(setDataCount);
    getCommentCount(setCommentCount);
  }, []);

  return (
    <Container>
      <HeaderComponent onPress={logoutFunc} />
      {data.length == 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          ListHeaderComponent={() => {
            return (
              <Content>
                <Col>
                  <Thumbnail large source={my} style={styles.image} />
                  <Text style={styles.title}>{profile.nickName}</Text>
                  <Text style={styles.email}>{profile.email}</Text>
                  <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={logoutFunc}>
                    <Text style={styles.logout}>LogOut</Text>
                  </TouchableOpacity>
                </Col>
                <Grid style={{ marginTop: 20, marginBottom: 10 }}>
                  <Col size={3} style={{ alignItems: "center" }}>
                    <Text style={styles.category}>작성한 글</Text>
                    <Text style={styles.categoryContent}>{dataCount}</Text>
                  </Col>
                  <Col size={3} style={{ alignItems: "center" }}>
                    <Text style={styles.category}>작성한 댓글</Text>
                    <Text style={styles.categoryContent}>{commentCount}</Text>
                  </Col>
                  <Col size={3} style={{ alignItems: "center" }}>
                    <Text style={styles.category}>방문 횟수</Text>
                    <Text style={styles.categoryContent}>321</Text>
                  </Col>
                </Grid>
              </Content>
            );
          }}
          onEndReachedThreshold={0}
          onEndReached={async () => {
            let nextData = await getNextData(next, setNext);
            if (nextData == 0) {
              Alert.alert("마지막 글입니다.");
            } else {
              let newData = [...data, ...nextData];
              await setData(newData);
            }
          }}
          renderItem={(data) => {
            return <ImageComponent image={data.item.image} />;
          }}
          numColumns={3}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexWrap: "wrap",
    marginTop: 20,
  },
  title: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    alignSelf: "center",
    marginTop: 5,
    color: "gray",
  },
  category: {
    fontWeight: "bold",
    fontSize: 17,
  },
  categoryContent: {
    fontWeight: "bold",
    color: "orange",
    fontSize: 19,
  },
  logout: {
    alignSelf: "center",
    padding: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    alignSelf: "center",
    marginTop: 30,
  },
});
