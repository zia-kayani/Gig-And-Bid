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
import {baseURL} from '../Api';
const ProductCard = ({products, onDelete}) => {
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
            source={{uri: baseURL + '/' + product.imageUrl}}
            style={styles.image}
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Price: {product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            {product.quantity && (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => handleDecreaseQuantity(product)}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{product.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleIncreaseQuantity(product)}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => onDelete(product._id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: '2%',
    marginHorizontal: '2%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
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

export default ProductCard;
