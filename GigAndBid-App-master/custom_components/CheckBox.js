import React, { useState, } from 'react';
import { TouchableOpacity,StyleSheet, Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Check = ({ checked, onToggle }) => {
  return (
    <View style={styles.container}>
       <TouchableOpacity  onPress={onToggle}>
           <Icon name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="white" />
       </TouchableOpacity>
     
       <Text style={styles.title}> Remember me</Text>
    </View>

  );
};

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <Check checked={checked} onToggle={handleToggle} />
  );
};

export default CheckBox;





  
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: 150,
        marginTop:1,
        marginLeft:50,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 16,
        color: "white",
        marginLeft: 5,
        fontWeight: "600",
    },
});



// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

//  const CheckBox = () => {
//   return (
//     <View>
//       <Text>CheckBox</Text>
//     </View>
//   )
// }

// export default CheckBox

// const styles = StyleSheet.create({})