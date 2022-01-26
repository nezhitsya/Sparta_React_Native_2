import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { Card, CardItem, Icon, Text } from "native-base";
import ImageBlurLoading from "react-native-image-blur-loading";

const image = require("../assets/background2.png");
const logo = require("../assets/logo.png");

export default function CardComponent({ navigation, content }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailPage", { content: content });
      }}
      style={styles.container}>
      <Card style={styles.card} transparent>
        <CardItem transparent>
          <ImageBlurLoading
            withIndicator
            thumbnailSource={{ uri: content.image }}
            source={{ uri: content.image }}
            style={styles.image}
          />
        </CardItem>
        <CardItem style={{ marginTop: -10 }}>
          <Grid>
            <Col size={9}>
              <Text numberOfLines={1} style={styles.title}>
                {content.title}
              </Text>
              <Text style={[styles.grey, styles.writer]}>{content.author}</Text>
            </Col>
            <Col size={2}>
              <Grid>
                <Col>
                  <Icon name="chatbox-outline" style={styles.grey} />
                </Col>
                <Col>
                  <Icon name="heart-outline" style={styles.grey} />
                </Col>
              </Grid>
            </Col>
          </Grid>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
  },
  card: {
    width: "100%",
    alignSelf: "center",
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  grey: {
    color: "grey",
  },
  writer: {
    fontSize: 12,
    color: "grey",
    marginLeft: 10,
  },
});
