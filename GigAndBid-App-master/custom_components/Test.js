// import { StyleSheet,TouchableOpacity, Text, View, ImageBackground, Image } from 'react-native'
// import React from 'react'
// import { Card } from "react-native-shadow-cards";

// const Test = ({navigation}) => {
//   return (
//     <View style={{flex:2}}>
//         <ImageBackground resizeMode='cover' style={{flex:1, height:800, width:400}} source={require('../assets/bg_img.png')}>
            
//             <View style={{ height:330}} >
               
//             </View>

//             <View style={{ height:430}} >
//                 <Card style={{padding: 10,marginRight:5, marginLeft:5, marginRight:10,backgroundColor:'#EFF5F5', height:440,width:350,justifyContent:'center', alignItems:'center', borderRadius:20, } }>
//                 <View style={{ height:550, width:400,alignItems:'center',justifyContent:'center' }}>
//                 <TouchableOpacity style={style.btn1} onPress={()=>navigation.navigate('Signup')}
// >
//                     <Text style={{fontSize:25,}}>
//                         Register
//                     </Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity style={style.btn1} onPress={()=> navigation.navigate('Login')}>
//                     <Text style={{fontSize:25,}}>
//                         Login
//                     </Text>
//                 </TouchableOpacity>
//             </View>      
//                 </Card>
//             </View>
//         </ImageBackground>
//     </View>
//   )
// }

// export default Test

// const style = StyleSheet.create({
//     btn1:{
        
//         marginLeft:100,
//         marginRight:100,
//         borderRadius:12,
//         marginTop:30,
//        backgroundColor:'#00796B',
//         width:260,
//         height:50,
//         justifyContent:'center',
//         alignItems:'center'

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