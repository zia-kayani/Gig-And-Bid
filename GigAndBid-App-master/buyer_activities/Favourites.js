import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import API from '../Api';
import AuthContext from '../Context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import ProductCard from '../custom_components/ProductsHorizontal';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromFav} from '../Redux/favSlice';

const Favourite = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.favourite);

  console.log('cart', cartItems);

  const handleRemoveFromCart = productId => {
    dispatch(removeFromFav(productId));
  };

  return (
    <View style={styles.scrollView}>
      <ProductCard products={cartItems} onDelete={handleRemoveFromCart} />
    </View>
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
    backgroundColor: 'red',
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
  totalPriceCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
    margin: '5%',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  btn1: {
    // marginVertical: '10%',
    borderRadius: 12,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B',
  },
});

export default Favourite;
