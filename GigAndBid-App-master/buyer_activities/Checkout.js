import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CheckoutScreen = () => {
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    // Perform actions with the collected information
    // such as sending it to the backend or processing the order
    setOrderPlaced(true);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'Black',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '5%',
        }}>
        Address Detail
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={text => setAddressLine1(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <View style={styles.cashOnDeliveryContainer}>
        <Text style={styles.cashOnDeliveryLabel}>Cash on Delivery:</Text>
        <Button
          title={cashOnDelivery ? 'Yes' : 'Yes'}
          onPress={() => setCashOnDelivery(!cashOnDelivery)}
        />
      </View>

      <TouchableOpacity
        onPress={() => (onPress = {handleCheckout}(order._id))}
        style={[styles.btn1, styles.bg]}>
        <Text style={{fontSize: 20, color: 'white'}}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  cashOnDeliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cashOnDeliveryLabel: {
    marginRight: 8,
  },
  submitButton: {
    marginTop: 16,
  },
  orderPlacedText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn1: {
    marginVertical: '10%',
    borderRadius: 12,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B',
  },
});

export default CheckoutScreen;
