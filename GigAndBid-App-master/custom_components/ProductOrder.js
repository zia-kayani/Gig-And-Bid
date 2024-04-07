import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {increaseQuantity, decreaseQuantity} from '../Redux/cartSlice';
import {useDispatch} from 'react-redux';
const ProductOrder = ({products, onDelete}) => {
  const dispatch = useDispatch();
  console.log('xx', products);
  const handleDecreaseQuantity = product => {
    dispatch(decreaseQuantity(product));
  };
  const handleIncreaseQuantity = product => {
    dispatch(increaseQuantity(product));
  };

  return (
    <ScrollView style={styles.scrollView}>
      {products.map((product, index) => (
        <View style={styles.container} key={index}>
          <Image
            source={product.image || require('../assets/products/p2.jpg')}
            style={styles.image}
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{product.productId.name}</Text>
            <Text style={styles.price}>Price: {product.productId.price}</Text>
            <Text style={styles.description}>
              {product.productId.description}
            </Text>
            <Text style={styles.quantity}> x{product.quantity}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    // padding: 12,
    marginVertical: '2%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 6,
  },
  price: {
    fontSize: 16,
    // marginBottom: 6,
  },
  description: {
    fontSize: 14,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // marginTop: 8,
  },
  quantityButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 30,
    width: 30,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductOrder;
