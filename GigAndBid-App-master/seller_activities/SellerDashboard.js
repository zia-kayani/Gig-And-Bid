import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const height = Dimensions.get('window').height;
const categories = [
  {
    name: 'Make Up',
    image: require('../assets/categories/c1.jpg'),
  },
  {
    name: 'Clothing',
    image: require('../assets/categories/c2.jpg'),
  },
  {
    name: 'Electronics',
    image: require('../assets/categories/c3.jpg'),
  },
  {
    name: 'Furniture',
    image: require('../assets/categories/c4.jpg'),
  },
  {
    name: 'Watches',
    image: require('../assets/categories/c5.jpg'),
  },
];

const SellerDashboard = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {categories.map((category, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.container}
          onPress={() =>
            navigation.navigate('AddProduct', {category: category.name})
          }>
          <ImageBackground
            source={category.image}
            style={styles.imageBackground}
            resizeMode="cover">
            <View style={styles.overlay}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',

    padding: 10,
  },
});

export default SellerDashboard;
