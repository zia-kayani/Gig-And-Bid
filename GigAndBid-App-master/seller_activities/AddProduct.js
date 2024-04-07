import React, {useState, useContext} from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import API from '../Api';
import AuthContext from '../Context/AuthContext';

export default function AddProduct({navigation, route}) {
  const {user} = useContext(AuthContext);
  const {category} = route.params;
  console.log('categore', category);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(0);

  const [biddable, setBiddable] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    const response = await launchImageLibrary(options);
    console.log(response);
    if (!response.didCancel || !response.error) {
      setImage(response.assets[0].uri);
    }
  };

  const addProduct = async () => {
    try {
      const newProduct = {
        name,
        price,
        description,
        biddable,
        category,
        address: '123 Main Street',
        createdBy: user._id,
        bidEndAt: date,
      };
      const formData = new FormData();

      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('biddable', newProduct.biddable);
      formData.append('category', newProduct.category);
      formData.append('address', newProduct.address);
      formData.append('createdBy', newProduct.createdBy);
      formData.append('bidEndAt', date.toISOString());

      formData.append('image', {
        uri: image,
        type: 'image/jpg',
        name: 'test.jpg',
      });
      console.log('formData', formData);

      const response = await API.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Product added successfully!');
        resetForm();
      }

      // Update the state with the newly added product
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice(0);
    setDescription('');
    setBiddable(false);
    setImage(null);
  };
  const handleDateChange = (event, selected) => {
    const currentDate = selected;

    setDate(currentDate);
  };
  navigation.setOptions({
    headerTitle: `Add Product - ${category}`,
  });
  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        {image && (
          <Image
            source={{uri: image}}
            style={{
              width: Dimensions.get('window').width / 2,
              height: 200,
              marginTop: 20,
              borderRadius: 10,
            }}
          />
        )}
        <TouchableOpacity onPress={pickImage} style={[styles.btn1, styles.bg]}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: '500',
              padding: 5,
            }}>
            Select Image of product
          </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Prodcut name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Price"
            value={price}
            onChangeText={setPrice}
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text=" Biddable"
            iconStyle={{borderColor: 'red'}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{
              textDecorationLine: 'none',
            }}
            onPress={isChecked => {
              console.log(isChecked);
              setBiddable(isChecked);
            }}
          />
        </View>
        {biddable && (
          <View style={styles.dateContainer}>
            <Text style={styles.label}>End Time</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              // mode={'datetime'}
              is24Hour={true}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          </View>
        )}
        <TouchableOpacity style={[styles.btn1, styles.bg]} onPress={addProduct}>
          <Text style={{fontSize: 23, color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  dateContainer: {
    justifyContent: 'flex-end',
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    // color: 'white',
  },
  btn1: {
    marginVertical: '10%',
    borderRadius: 12,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B',
  },
});
