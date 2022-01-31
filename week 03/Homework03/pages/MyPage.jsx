import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Thumbnail } from "native-base";
import { logout } from "../config/firebaseFunctions";
import HeaderComponent from "../components/HeaderComponent";
import ImageComponent from "../components/ImageComponent";

const profile = require("../assets/my.png");
const data = require("../data.json");

export default function MyPage({ navigation }) {
  const logoutFunc = () => {
    logout(navigation);
  };

  return (
    <Container>
      <HeaderComponent />
      <Content>
        <Col>
          <Thumbnail large source={profile} style={styles.image} />
          <Text style={styles.title}>스파르타 코딩 클럽</Text>
          <Text style={styles.email}>dylee@spartacoding.co.kr</Text>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={logoutFunc}>
            <Text style={styles.logout}>LogOut</Text>
          </TouchableOpacity>
        </Col>
        <Grid style={{ marginTop: 20 }}>
          <Col size={3} style={{ alignItems: "center" }}>
            <Text style={styles.category}>작성한 글</Text>
            <Text style={styles.categoryContent}>7</Text>
          </Col>
          <Col size={3} style={{ alignItems: "center" }}>
            <Text style={styles.category}>작성한 댓글</Text>
            <Text style={styles.categoryContent}>21</Text>
          </Col>
          <Col size={3} style={{ alignItems: "center" }}>
            <Text style={styles.category}>방문 횟수</Text>
            <Text style={styles.categoryContent}>321</Text>
          </Col>
        </Grid>
        <Grid style={styles.imageContainer}>
          {data.diary.map((content, i) => {
            return <ImageComponent image={content.image} key={i} />;
          })}
        </Grid>
      </Content>
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
