import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import ProductCard from '../custom_components/ProductsHorizontal';
import AuthContext from '../Context/AuthContext';
import API from '../Api';
import ProductOrder from '../custom_components/ProductOrder';
import {useIsFocused} from '@react-navigation/native';

const Orders = () => {
  const isFocused = useIsFocused();

  const {user} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const fetchSellerOrders = async () => {
    try {
      const sellerId = user._id;

      // const sellerId = '646e65dd51f76eb01d3d245c';
      const url = `/seller-orders/${sellerId}`;

      const response = await API.get(url);

      console.log(JSON.stringify(response.data));
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSellerOrders();
  }, [isFocused]);

  const handleDispatch = async suborderId => {
    // Handle dispatching logic for the suborder
    try {
      const data = JSON.stringify({
        suborderId: suborderId,
        status: 'Dispatched',
      });

      const response = await API.put('/order', data);
      console.log(JSON.stringify(response.data));
      fetchSellerOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = suborderId => {
    // Handle deleting logic for the suborder
    console.log(`Deleting suborder with ID: ${suborderId}`);
  };

  return (
    <ScrollView>
      {orders.map((suborder, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.name}>Status: {suborder.status}</Text>
          <Text style={{color: 'grey'}}>order ID: {suborder._id}</Text>
          <View>
            <ProductOrder products={suborder.products} onDelete={() => {}} />
          </View>

          <TouchableOpacity
            onPress={() => handleDispatch(suborder._id)}
            style={[styles.btn1, styles.bg]}>
            <Text style={{fontSize: 20, color: 'white'}}>Dispatch</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Orders;
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    // flexDirection: 'row',
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
