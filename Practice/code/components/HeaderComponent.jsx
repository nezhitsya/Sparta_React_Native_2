import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Header, Left, Icon, Right, Text, Button } from 'native-base';

const logo = require('../assets/logo.png');

export default function HeaderComponent() {
  return (
    <Header transparent>
      <Left>
        <Button transparent>
          <Image source={logo} style={styles.logoImage} />
        </Button>
      </Left>
      <Right>
        <Icon name="ellipsis-horizontal" style={{ color: 'orange' }} />
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 100,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
