import React from "react";
import { Dimensions, Text } from "react-native";
import { Body, Button, Left, ListItem, Right, Thumbnail } from "native-base";

const profile = require("../assets/my.png");
const width = Dimensions.get("screen").width;

export default function CommentComponent() {
  return (
    <ListItem thumbnail style={{ width: width }}>
      <Left>
        <Thumbnail circular source={profile} />
      </Left>
      <Body>
        <Text>스파르타 코딩 클럽</Text>
        <Text note numberOfLines={3}>
          comment desc
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>2021.01.25</Text>
        </Button>
      </Right>
    </ListItem>
  );
}
