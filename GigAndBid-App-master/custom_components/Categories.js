import React, {useContext} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {selectCategory} from '../Redux/categorySlice';
const Categories = () => {
  const dispatch = useDispatch();
  const categories = [
    {
      name: 'All',
      image: require('../assets/categories/c5.jpg'),
    },
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryContainer}
          onPress={() => {
            dispatch(selectCategory(category.name));
          }}>
          <Image source={category.image} style={styles.image} />
          <Text style={styles.name}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
  },
  categoryContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Categories;
