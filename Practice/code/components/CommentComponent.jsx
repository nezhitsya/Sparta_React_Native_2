import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Body, Button, Left, ListItem, Right, Thumbnail } from 'native-base';
import ImageBlurLoading from 'react-native-image-blur-loading';

const profile = require('../assets/my.png');
const width = Dimensions.get('screen').width;

export default function CommentComponent({ comment }) {
  function dateFormat(d) {
    let date = new Date(d);
    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;

    let min = date.getMinutes();
    if (min < 10) min = '0' + min;

    let sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return year + '.' + month + '.' + day + ' ' + hour + ':' + min + ':' + sec;
  }

  return (
    <ListItem thumbnail style={{ width: width }}>
      <Left>
        <Thumbnail circular source={profile} />
      </Left>
      <Body>
        <Text style={{ fontWeight: 'bold' }}>{comment.author}</Text>
        <Text note numberOfLines={3}>
          {comment.comment}
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>{dateFormat(comment.date)}</Text>
        </Button>
      </Right>
    </ListItem>
  );
}
