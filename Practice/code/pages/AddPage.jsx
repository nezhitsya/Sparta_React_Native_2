import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, Alert, Platform } from 'react-native';
import { Grid } from 'react-native-easy-grid';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  Textarea,
} from 'native-base';
import style from 'react-native-image-blur-loading/src/style';
import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as ImgaePicker from 'expo-image-picker';
import HeaderComponent from '../components/HeaderComponent';
import { addDiary, imageUpload } from '../config/firebaseFunctions';

const background2 = require('../assets/background2.png');
const data = require('../data.json');
const imageWidth = Dimensions.get('window').width / 3;
const loading = require('../assets/loading.gif');
const tempImage =
  'https://firebasestorage.googleapis.com/v0/b/sparta-study-plus.appspot.com/o/lecture%2F6-min.png?alt=media&token=bbc87679-4084-40ad-b6cd-01e808983fa4';

export default function AddPage() {
  useEffect(() => {
    getPermission();
  }, []);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const [image, setImage] = useState(tempImage);
  const [imageUri, setImageUri] = useState('');

  const [progress, setProgress] = useState(false);

  const upload = async () => {
    setProgress(true);
    const currentUser = firebase.auth().currentUser;
    let date = new Date();
    let getTime = date.getTime();
    let data = {
      title: title,
      author: currentUser.email,
      desc: content,
      image: image,
      date: getTime,
      uid: currentUser.uid,
    };
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;

    let result = await addDiary(data);
    if (result) {
      Alert.alert('등록 완료');
      setTitle('');
      setContent('');
      setImage(tempImage);
      setImageUri('');
      setProgress(false);
    } else {
      setProgress(false);
    }
  };

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImgaePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('사진 권한이 필요합니다.');
      }
    }
  };

  const pickImage = async () => {
    let imageData = await ImgaePicker.launchImageLibraryAsync({
      mediaTypes: ImgaePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });

    getImageUrl(imageData);
  };

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  return (
    <Container>
      <HeaderComponent />
      {progress == false ? null : (
        <Image source={loading} style={styles.progress} />
      )}
      <Content>
        <Image source={background2} style={styles.backImage} />
        {imageUri == '' ? (
          <Grid style={styles.imageUpload} onPress={() => pickImage()}>
            <Text style={styles.imageUploadPlus}>+</Text>
          </Grid>
        ) : (
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
            onPress={() => pickImage()}
          />
        )}
        <Item regular style={styles.title}>
          <Input
            placeholder="다이어리 제목"
            style={{ fontSize: 13 }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Item>
        <Form style={styles.contentLayout}>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="내용 입력"
            style={styles.content}
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </Form>
        <Button full style={styles.uploadBtn} onPress={() => upload()}>
          <Text>등록</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  backImage: {
    width: '95%',
    height: 100,
    borderRadius: 10,
  },
  imagePreview: {
    borderRadius: 10,
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  progress: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 2,
  },
  imageUpload: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderStyle: 'dashed',
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 10,
    fontSize: 13,
  },
  uploadBtn: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'pink',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'lightgray',
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
});
