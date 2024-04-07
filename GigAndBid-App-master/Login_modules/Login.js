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
import AuthContext from '../Context/AuthContext';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('abdul22@gmail');
  const [password, setPassword] = useState('12345');

  const handleLogin = () => {
    login(email, password);
  };

  const handleSignup = () => {
    // Implement your navigation logic to the signup screen
    navigation.navigate('Signup');
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
            Login
          </Text>
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

          <TouchableOpacity onPress={handleLogin} style={[styles.btn1]}>
            <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
          </TouchableOpacity>
          <Button title="Sign Up" onPress={handleSignup} />
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
    height: '100%',
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

export default LoginScreen;
