import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import API, {baseURL} from '../Api';

import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart, clearCart} from '../Redux/cartSlice';
import {addToFav} from '../Redux/favSlice';
import BidProductCard from './BidProduct';

const demo = [
  {
    name: 'Product 1',
    image: require('../assets/products/p1.jpg'),
    price: 9.99,
  },
  {
    name: 'Product 2',
    image: require('../assets/products/p2.jpg'),
    price: 19.99,
  },
  {
    name: 'Product 3',
    image: require('../assets/products/p3.jpg'),
    price: 14.99,
  },
  {
    name: 'Product 4',
    image: require('../assets/products/p4.jpg'),
    price: 12.99,
  },
  {
    name: 'Product 5',
    image: require('../assets/products/p5.jpg'),
    price: 24.99,
  },
];
const ProductsComponent = () => {
  const filter = useSelector(state => state.category);
  console.log('fielr', filter);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [bidProducts, setBidProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      const response = await API.get('/products');
      console.log(response.data);
      const bidProducts = response.data.filter(
        product => product.biddable && product.bidStatus == 'Active',
      );
      const Products = response.data.filter(product => !product.biddable);

      // Set the state with the separate arrays
      setBidProducts(bidProducts);
      setProducts(Products);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    getProducts();
  }, [isFocused]);

  const filterProducts =
    filter != 'All'
      ? products.filter(product => product.category === filter)
      : products;
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <>
      <Text style={styles.sectionHeading}>Featured Products</Text>
      <View style={styles.container}>
        {!filterProducts.length && (
          <Text style={[styles.price, {textAlign: 'center'}]}>No products</Text>
        )}
        {filterProducts.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Image
              // source={product.image || demo[index % 5].image}
              source={{uri: baseURL + '/' + product.imageUrl}}
              style={styles.image}
            />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Rs {product.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(product)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => dispatch(addToFav(product))}>
              <Text style={styles.buttonText}>Add to favourite</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={styles.sectionHeading}>Bid Products</Text>
      <View style={styles.container}>
        {bidProducts.map(product => (
          <BidProductCard
            saleEndTime={product.bidEndAt}
            basePrice={product.price}
            product={product}
            index
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: '5%',
  },
  productContainer: {
    backgroundColor: '#fff',
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#00796B',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProductsComponent;
