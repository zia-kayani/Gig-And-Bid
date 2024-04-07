import React, {useState} from 'react';
import AuthContext from './AuthContext';
import API from '../Api';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await API.post('/login', userData);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error:', error);
    }
  };

  const signup = async (name, phone, email, password, address, city, type) => {
    const userData = {
      name,
      phone,
      email,
      password,
      address,
      city,
      type,
    };
    console.log('u', userData);
    try {
      const response = await API.post('/signup', userData);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response.data.message);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, signup, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
