import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import API from '../Api';
import AuthContext from '../Context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import ProductCard from '../custom_components/ProductsHorizontal';

const ManageProduct = () => {
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyProducts = async () => {
    try {
      console.log('user', user._id);
      const userData = {
        userId: user._id,
      };

      const response = await API.post('/products/my-products', userData);
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  const onDelete = async productId => {
    try {
      await API.delete(`/products/${productId}`);
      console.log(`Deleted product with ID: ${productId}`);

      // Remove the deleted product from the state
      setProducts(prevProducts =>
        prevProducts.filter(product => product._id !== productId),
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    getMyProducts();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <ProductCard products={products} onDelete={onDelete} />
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
});

export default ManageProduct;
