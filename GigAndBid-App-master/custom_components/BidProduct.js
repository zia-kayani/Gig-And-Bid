import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import API, {baseURL} from '../Api';
import AuthContext from '../Context/AuthContext';

const BidProductCard = ({product, saleEndTime, basePrice, index}) => {
  const {user} = useContext(AuthContext);
  const [timeLeft, setTimeLeft] = useState('');
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const now = moment();
    const end = moment(saleEndTime);
    const duration = moment.duration(end.diff(now));
    if (duration.asSeconds() <= 0) return 'Sale ended';

    const hours = Math.floor(duration.asHours());
    const seconds = Math.floor(duration.asSeconds()) % 60;

    return `${hours}H : ${seconds}S`;
  }, [saleEndTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear interval if the component is unmounted
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
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
  const handleBid = () => {
    if (Number(bid) > basePrice) {
      makeBid();
      setBid('');
      setModalVisible(!modalVisible);
    } else {
      setMessage(`Bid must be greater than base price: $${basePrice}`);
    }
  };
  const handleClose = () => {
    setBid('');
    setMessage('');
    setModalVisible(false);
  };

  const makeBid = async () => {
    try {
      const data = JSON.stringify({
        productId: product._id,
        amount: bid,
        buyerId: user._id,
      });
      console.log(data);
      const response = await API.post('/bid', data);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View key={product?._id} style={styles.productContainer}>
      <Image
        // source={product.image || demo[index + 1].image}
        source={{uri: baseURL + '/' + product.imageUrl}}
        style={styles.image}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Rs {product.price}</Text>
      <Text style={styles.price}>Ending in {timeLeft}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log('clewick');
          setModalVisible(true);
        }}>
        <Text style={styles.buttonText}>Place Bid</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Place your bid:</Text>
            <TextInput
              value={bid}
              onChangeText={setBid}
              keyboardType="numeric"
              style={styles.input}
            />
            {message && <Text>{message}</Text>}
            <TouchableOpacity style={styles.addButton} onPress={handleBid}>
              <Text style={styles.textStyle}>Submit Bid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleClose}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default BidProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: '30%',
    width: '75%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textAlign: 'center',
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
