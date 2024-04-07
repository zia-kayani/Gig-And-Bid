// import React, { useState, useEffect } from 'react';
// import { Button,Text, Image, View,TouchableOpacity, Platform, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// //import native base

// const nativeInputs = ()=>{
//     return <Stack alignItems="center">
//     <InputGroup w={{
//     base: "70%",
//     md: "285"
//   }}>
//       <InputLeftAddon children={"https://"} />
//       <Input w={{
//       base: "70%",
//       md: "100%"
//     }} placeholder="nativebase" />
//       <InputRightAddon children={".io"} />
//     </InputGroup>
//   </Stack>;
// }
// export default function Test() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center'}}>
//         <Text style={styles.headerTxt}>Chose the product</Text>
//       <TouchableOpacity onPress={pickImage} style={{height:40, width:200,borderRadius:10,marginTop:5,    backgroundColor:'#00796B', justifyContent:'center', alignItems:'center'}}>
//             <Text style={{color:'#000000', justifyContent:'center', alignItems:'center',fontSize:15, fontWeight:'500', padding:5}}>Select Image of product</Text>
//       </TouchableOpacity>
//       {image && <Image source={{ uri: image }} style={{ width: 260, height: 200 }} />}

//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//     headerTxt :{
//         marginTop:30,
//         textAlign:'center',
//         fontSize:20,
//         marginBottom:10,

//         fontWeight:'bold'
//     }
// })//end

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Test = () => {
  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})