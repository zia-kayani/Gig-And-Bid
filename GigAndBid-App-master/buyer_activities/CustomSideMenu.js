import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';

//for material icons
import home from '../assets/buyer_icons/home.png';
import profile from '../assets/buyer_icons/profile.png';
import cart from '../assets/buyer_icons/cart.png';
import logoutIcon from '../assets/buyer_icons/logout.png';
import AuthContext from '../Context/AuthContext';

const CustomSideMenu = props => {
  const {logout, user} = useContext(AuthContext);

  const [selectedId, setSelectedId] = useState(null);

  //for menu list
  const listArray = [
    {icon: home, title: 'Buyer_Dashboard', route: 'Buyer_Dashboard'},
    {icon: profile, title: 'My Profile', route: 'MyProfile'},
    {icon: cart, title: 'Cart', route: 'MyCart'},
    {icon: cart, title: 'My Orders', route: 'MyOrders'},
    {icon: cart, title: 'My Favourite', route: 'Favourite'},
  ];
  // bottom list
  const bottomList = [{icon: logout, title: 'Logout'}];
  const Item = ({title, icon, onPress, backgroundColor, color, index}) => (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={[styles.item, {backgroundColor: backgroundColor}]}>
      <Image
        source={icon}
        style={{
          width: 35,
          height: 35,
          borderRadius: 50,
          marginLeft: 10,
        }}></Image>
      <Text style={[styles.title, {color: color}]}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => {
    const backgroundColor = item.title === selectedId ? '#00796B' : 'white';
    const color = item.title === selectedId ? 'black' : 'black';
    return (
      <Item
        onPress={index => {
          setSelectedId(item.title);
          console.log('index :: ', props?.state?.routes[index].name);
          props.navigation.navigate(item.route);
        }}
        title={item.title}
        index={index}
        icon={item.icon}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Header section*/}
      <View
        style={{
          flex: 0.3,
          backgroundColor: '#00796B',
          borderBottomColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/icon.png')}
          style={{width: 100, height: 100, borderRadius: 50}}></Image>
        <Text
          style={{
            marginHorizontal: 0,
            marginTop: 10,
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          {user?.name}
        </Text>
      </View>

      {/* menu section */}
      <View
        style={{flex: 0.65, borderBottomColor: 'black', borderBottomWidth: 1}}>
        <FlatList data={listArray} renderItem={renderItem} />
      </View>

      {/* bottom sectino logout */}
      <View style={{flex: 0.1}}>
        <Item
          onPress={() => {
            logout();
          }}
          title={'logout'}
          icon={logoutIcon}
          backgroundColor={'white'}
          color={'black'}
        />
      </View>
    </View>
  );
};

export default CustomSideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // padding: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 5,
  },
});
