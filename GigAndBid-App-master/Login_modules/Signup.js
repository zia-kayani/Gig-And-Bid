import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import AuthContext from '../Context/AuthContext';

const radio_props = [
  {label: 'Buyer      ', value: 0},
  {label: 'seller     ', value: 1},
];

const SignupScreen = ({navigation}) => {
  const {signup} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(0);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    signup(name, phone, email, password, address, city, type);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: 200, height: 200, alignSelf: 'center'}}
      />
      <ImageBackground
        borderTopRightRadius={30}
        borderTopLeftRadius={30}
        source={require('../assets/bg_img.png')}
        style={styles.imageBg}>
        <View style={styles.formContainer}>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              fontWeight: 'bold',
              marginVertical: '10%',
            }}>
            Register
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Shipping Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Shipping Address"
              value={address}
              onChangeText={setAddress}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="white"
            />
          </View>
          <RadioForm
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            radio_props={radio_props}
            buttonColor={'#fff'}
            labelColor={'#fff'}
            selectedButtonColor={'#fff'}
            buttonWrapStyle={{marginLeft: 10}} // Adjust the value as needed
            labelStyle={{color: '#fff'}} // Set the text color to white
            onPress={value => {
              setType(value);
            }}
          />

          <TouchableOpacity
            onPress={handleSignup}
            style={[styles.btn1, styles.bg]}>
            <Text style={{fontSize: 20, color: 'white'}}>Signup</Text>
          </TouchableOpacity>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
    // justifyContent: 'space-evenly',
  },
  imageBg: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    flex: 1,
    width: '100%',

    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: 'white',
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

export default SignupScreen;
