// import React  from "react";
// import { Text ,View, StyleSheet, Touchable } from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import {Card, Button , Title ,Paragraph, } from 'react-native-paper';
  
// const FurnitureCard= () => {
      
//     return(

        
             
//         <Card style={Styles.container}>
//             <Card.Content style={{width:130, padding:5}}>
//                  <Title >Furniture</Title>
//             </Card.Content>
//                 {/* <Image style={{width:400, height:200}} source={require('../assets/bottom.png')} ></Image> */}
//             <Card.Cover style={{width:70, height:70, marginLeft:20}} source={require('../assets/furniture.png')} />
//             <Card.Content >
//                     <Paragraph>Furniture/couche</Paragraph>
//             </Card.Content>
//             <Card.Actions>
//             {/* <Button>Select</Button> */}
//             <Button color={'#f08e25'} mode="contained" onPress={() => console.log('Pressed')}>
//                 Add
//             </Button>
//             </Card.Actions>
//       </Card>

         
//     )
// }
// export default FurnitureCard;
  
// const Styles = StyleSheet.create({
//     container :{
//         width:120,
//         height:240,
//         alignContent:'center',
//         margin:10,
//         padding:10
    
//     }
// })//end

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FurnitureCard = () => {
  return (
    <View>
      <Text>FurnitureCard</Text>
    </View>
  )
}

export default FurnitureCard

const styles = StyleSheet.create({})