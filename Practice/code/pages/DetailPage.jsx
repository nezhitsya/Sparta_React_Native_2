import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Container, Content, Item, Input, Icon, List } from 'native-base';
import ImageBlurLoading from 'react-native-image-blur-loading';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import CommentComponent from '../components/CommentComponent';
import { addComment, getComment } from '../config/firebaseFunctions';

export default function DetailPage({ navigation, route }) {
  const [commentInput, setCommentInput] = useState('');
  const [comment, setComment] = useState([]);
  const content = route.params.content;

  useEffect(() => {
    navigation.setOptions({
      title: content.title,
      headerStyle: {
        backgroundColor: 'white',
        shadowColor: 'white',
      },
      headerTintColor: 'black',
      headerShown: 'true',
      headerBackTitleVisible: false,
    });

    commentLoad(content.date);
  }, []);

  const commentFunc = async () => {
    let date = new Date();
    let getTime = date.getTime();
    const currentUser = firebase.auth().currentUser;
    let newComment = {
      date: getTime,
      comment: commentInput,
      did: content.date + 'D',
      uid: currentUser.uid,
    };

    let result = await addComment(newComment);
    if (result) {
      Alert.alert('댓글 저장');
      await setComment([...comment, newComment]);
    }
  };

  const commentLoad = async (did) => {
    let c = await getComment(did + 'D');
    if (c == 0) {
    } else {
      setComment(c);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}>
        <ImageBlurLoading
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
          style={{ width: '90%', height: 200, borderRadius: 10 }}
        />
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.sentence}>{content.desc}</Text>
        <Item style={{ marginTop: 100 }}>
          <Input
            placeholder="Comment"
            value={commentInput}
            onChangeText={(text) => {
              setCommentInput(text);
            }}
          />
          <Icon
            active
            name="paper-plane"
            onPress={() => {
              commentFunc();
            }}
          />
        </Item>
        <List>
          {comment.map((c, i) => {
            return <CommentComponent key={i} comment={c} />;
          })}
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 25,
  },
  sentence: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 20,
  },
});
