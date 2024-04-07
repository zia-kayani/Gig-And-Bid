// import React  from "react";
// import { StyleSheet } from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import {Card, Button , Title ,Paragraph, } from 'react-native-paper';
  
// const ClothsCard = () => {
      
//     return(

        
             
//         <Card style={Styles.container}>
//             <Card.Content style={{width:130, padding:5}}>
//                  <Title >Cloths</Title>
//             </Card.Content>
//                 {/* <Image style={{width:400, height:200}} source={require('../assets/bottom.png')} ></Image> */}
//             <Card.Cover style={{width:70, height:70, marginLeft:20}} source={require('../assets/Cloths.jpeg')} />
//             <Card.Content >
//                     <Paragraph>Tshirts</Paragraph>
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
// export default ClothsCard;
  
// const Styles = StyleSheet.create({
//     container :{
//         width:120,
//         height:240,
//         alignContent:'center',
//         margin:10,
//         padding:10
    
//     }
// })end

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ClothCard = () => {
  return (
    <View>
      <Text>ClothCard</Text>
    </View>
  )
}

export default ClothCard

const styles = StyleSheet.create({})