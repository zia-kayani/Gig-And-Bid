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

//for m icons
import home from '../assets/seller_icons/home.png';
import addIcon from '../assets/seller_icons/addIcon.png';
import pppp from '../assets/seller_icons/pppp.png';
import logoutIcon from '../assets/buyer_icons/logout.png';
import AuthContext from '../Context/AuthContext';

const CustomSideMenu = props => {
  const {user, logout} = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState(null);

  //for menu list
  const listArray = [
    {icon: home, title: 'Seller_Dashboard', route: 'SellerDashboard'},
    {icon: addIcon, title: 'My Orders', route: 'Orders'},
    {icon: pppp, title: 'My Products', route: 'ManageProducts'},
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
          console.log('index :: ', props?.state?.routes);
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
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00796B"
        translucent={true}
      />
      {/* Header section*/}
      <View
        style={{
          flex: 0.3,
          backgroundColor: '#00796B',
          borderBottomColor: 'gray',
          paddingTop: 50,
          paddingHorizontal: 20,
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
          {user.name}
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
}); //end

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const SellerDrawerMenu = () => {
//   return (
//     <View>
//       <Text>SellerDrawerMenu</Text>
//     </View>
//   )
// }

// export default SellerDrawerMenu

// const styles = StyleSheet.create({})
