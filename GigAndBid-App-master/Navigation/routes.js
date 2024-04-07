//  import 'react-native-gesture-handler';
import {SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useContext} from 'react';
//for stack navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

//importing login_modules components

import Signup from '../Login_modules/Signup';
import Login from '../Login_modules/Login';
//seller
import SellerDashboard from '../seller_activities/SellerDashboard';
import ManageProducts from '../seller_activities/ManageProducts';
import AddProduct from '../seller_activities/AddProduct';

import SellerDrawerMenu from '../seller_activities/SellerDrawerMenu';

//buyer activities
import Buyer_Dashboard from '../buyer_activities/Buyer_Dashboard';
import MyCart from '../buyer_activities/MyCart';
import CustomSideMenu from '../buyer_activities/CustomSideMenu';
import Logout from '../buyer_activities/Logout';
import MyProfile from '../buyer_activities/MyProfile';

//SPlash screen
import SplashScreen from 'react-native-splash-screen';
import AuthContext from '../Context/AuthContext';
import Orders from '../seller_activities/Orders';
import MyOrders from '../buyer_activities/MyOrders';
import Favourite from '../buyer_activities/Favourites';
import CheckoutScreen from '../buyer_activities/Checkout';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// //seller drawer
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="SellerDashoard"
      drawerContent={props => <SellerDrawerMenu {...props} />}>
      <Drawer.Screen name="SellerDashboard" component={SellerDashboard} />
      <Drawer.Screen name="AddProduct" component={AddProduct} />
      <Drawer.Screen name="ManageProducts" component={ManageProducts} />
      <Drawer.Screen name="Orders" component={Orders} />
    </Drawer.Navigator>
  );
}

//buyer drawer
function DrawerRouteBuyer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSideMenu {...props} />}
      initialRouteName="Buyer_Dashboard">
      <Drawer.Screen
        name="Buyer_Dashboard"
        options={{headerTitle: ''}}
        component={Buyer_Dashboard}
      />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
      <Drawer.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Favourite" component={Favourite} />
      <Drawer.Screen name="Logout" component={Login} />
    </Drawer.Navigator>
  );
}
const AppNavigator = () => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Authentication stack
  const AuthStack = () => (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );

  // Buyer stack
  const BuyerStack = () => (
    <Stack.Navigator
      initialRouteName="Buyer_Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Buyer_Dashboard" component={DrawerRouteBuyer} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />

      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Favourite" component={Favourite} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );

  // Seller stack
  const SellerStack = () => (
    <Stack.Navigator
      initialRouteName="SellerDashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SellerDashboard" component={DrawerRoutes} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ManageProducts" component={ManageProducts} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {user?.type === 0 ? (
        <BuyerStack />
      ) : user?.type === 1 ? (
        <SellerStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
