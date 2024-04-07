import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '',
      subtitle: 'beauty creams for sell',
      image: require('../assets/banners/b1.jpg'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: ' ',
      subtitle: 'jeans jacket for sell (special discount)',
      image: require('../assets/banners/b2.jpg'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: ' ',
      subtitle: 'premium quality leather jacket',
      image: require('../assets/banners/b3.jpg'),
    },
  ];

  return (
    <Swiper autoplay loop height={200}>
      {DATA.map(item => (
        <View key={item.id} style={styles.slide}>
          <Image source={item.image} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    // resizeMode: 'cover',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ImageSlider;
