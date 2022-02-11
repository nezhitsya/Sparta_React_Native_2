import React from 'react';
import { Dimensions } from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';

const imageWidth = Dimensions.get('window').width / 3;

export default function ImageComponent({ image }) {
  return (
    <ImageBlurLoading
      withIndicator
      thumbnailSource={{ uri: image }}
      source={{ uri: image }}
      style={{ width: imageWidth, height: imageWidth }}
    />
  );
}
