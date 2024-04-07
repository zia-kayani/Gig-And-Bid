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
import {removeFromCart, clearCart} from '../Redux/cartSlice';
import ProductOrder from '../custom_components/ProductOrder';

const MyOrders = () => {
  const isFocused = useIsFocused();
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const [orders, setOrders] = useState([]);
  console.log('cart', cartItems);

  const fetchBuyerOrder = async () => {
    try {
      const buyerId = user._id;
      // const buyerId = '646e4b04e4e22bff8fcdb84b';
      const response = await API.get(`/buyer-order/${buyerId}`);
      console.log(JSON.stringify(response.data));
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async orderId => {
    try {
      const response = await API.delete(`/order/${orderId}`);
      console.log(JSON.stringify(response.data));
      fetchBuyerOrder();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuyerOrder();
  }, [isFocused]);
  return (
    <ScrollView style={styles.scrollView}>
      {orders.map((order, index) => (
        <View key={index} style={styles.orderContainer}>
          {order.bidPrice > 0 && (
            <Text style={styles.name}>Bid Price: {order.bidPrice}</Text>
          )}

          <Text style={styles.name}>Status: {order.status}</Text>
          <Text style={{color: 'grey'}}>order ID: {order._id}</Text>

          <View>
            {order.suborders.map((suborder, index) => (
              <View
                key={index}
                style={{marginHorizontal: '2%', marginVertical: '2%'}}>
                <Text style={styles.name}>Status: {suborder.status}</Text>
                <Text style={{color: 'grey'}}>seller: {suborder.sellerId}</Text>

                <ProductOrder
                  products={suborder.products}
                  onDelete={() => {}}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => handleDelete(order._id)}
            style={[styles.btn1, styles.bg]}>
            <Text style={{fontSize: 20, color: 'white'}}>Delete</Text>
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
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: '2%',
    marginHorizontal: '2%',
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

export default MyOrders;
