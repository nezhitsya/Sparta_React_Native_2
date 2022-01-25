import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Content, Item, Input, Icon, List } from "native-base";
import ImageBlurLoading from "react-native-image-blur-loading";
import CommentComponent from "../components/CommentComponent";

export default function DetailPage({ navigation, route }) {
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
  }, []);

  const content = route.params.content;

  return (
    <Container>
      <Content contentContainerStyle={{ alignItems: "center", marginTop: 20 }}>
        <ImageBlurLoading
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
          style={{ width: "90%", height: 200, borderRadius: 10 }}
        />
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.sentence}>{content.desc}</Text>
        <Item style={{ marginTop: 100 }}>
          <Input placeholder="Comment" />
          <Icon active name="paper-plane" />
        </Item>
        <List>
          <CommentComponent />
          <CommentComponent />
          <CommentComponent />
          <CommentComponent />
          <CommentComponent />
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 25,
  },
  sentence: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 20,
  },
});
