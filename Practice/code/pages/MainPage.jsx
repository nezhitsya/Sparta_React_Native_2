import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Button,
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import HeaderComponent from '../components/HeaderComponent';
import CardComponent from '../components/CardComponent';
import { getData, getNextData } from '../config/firebaseFunctions';

// const data = require('../data.json');

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    getData(setNext, setData);
  }, []);

  return (
    <Container>
      <HeaderComponent />
      {data.length == 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          ListHeaderComponent={() => {
            return (
              <Content style={{ marginTop: 30 }}>
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount={3}
                  direction="alternate"
                >
                  <Grid style={styles.banner}>
                    <Col size={1} style={{ padding: 20 }}>
                      <Icon name="paper-plane" style={{ color: 'orange' }} />
                    </Col>
                    <Col size={6} style={{ padding: 15 }}>
                      <Text>이야기 하고 싶은 친구들에게</Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        wegram을 전하세요
                      </Text>
                    </Col>
                  </Grid>
                </Animatable.View>
                <Grid style={{ padding: 20 }}>
                  <Text style={{ color: 'grey' }}>FROM THE DIARY</Text>
                </Grid>
              </Content>
            );
          }}
          onEndReachedThreshold={0}
          onEndReached={async () => {
            let nextData = await getNextData(next, setNext);
            if (nextData == 0) {
              Alert.alert('마지막 글입니다.');
            } else {
              let newData = [...data, ...nextData];
              await setData(newData);
            }
          }}
          renderItem={(data) => {
            return (
              <CardComponent navigation={navigation} content={data.item} />
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item.date.toString()}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F6F6F6',
    height: 70,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
