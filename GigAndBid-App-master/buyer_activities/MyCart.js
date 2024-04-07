import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

import ProductCard from '../custom_components/ProductsHorizontal';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, clearCart} from '../Redux/cartSlice';
import API from '../Api';
import AuthContext from '../Context/AuthContext';

const MyCart = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  console.log('cart', cartItems);

  const handleRemoveFromCart = productId => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = async () => {
    try {
      const cartProducts = cartItems.map(({_id, quantity}) => ({
        id: _id,
        quantity,
      }));

      const data = JSON.stringify({
        buyer: user._id,
        products: cartProducts,
      });
      console.log('order', data);

      const response = await API.post('/order', data);
      console.log(JSON.stringify(response.data));
      Alert.alert('Order Placed!');
      dispatch(clearCart());
      navigation.navigate('Buyer_Dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.scrollView}>
      <ProductCard products={cartItems} onDelete={handleRemoveFromCart} />
      <Button title="Clear Cart" onPress={handleClearCart} />
      <View style={styles.totalPriceCard}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.totalPrice}>Total</Text>
          <Text style={styles.totalPrice}> {totalPrice} PKR</Text>
        </View>
        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={[styles.btn1, styles.bg]}>
          <Text style={{fontSize: 20, color: 'white'}}>Order</Text>
        </TouchableOpacity>
      </View>
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

export default MyCart;
