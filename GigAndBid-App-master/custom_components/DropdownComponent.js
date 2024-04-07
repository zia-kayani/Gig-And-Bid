import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  

  const data = [
    { label: 'Admin', value: '1' },
    { label: 'Seller', value: '2' },
    { label: 'Buyer', value: '3' },

  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#00796B' }]}>
            Account Type
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Account Type' : '...' }
          // searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? '#00796B' : 'white'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      width:300,
      
    },
    dropdown: {
      height: 50,
      marginTop:20,
      color:'blue',
      width:250,
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 12,
      paddingHorizontal: 8,
      marginRight:40,
      marginLeft:25
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      borderRadius: 12,
      marginLeft:15,
      marginTop:3,
    },
    placeholderStyle: {
      fontSize: 16,
      color:'white',
    },
    selectedTextStyle: {
      fontSize: 16,
      color:'white',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });



// import React, { useState } from 'react';
//   import { StyleSheet, Text, View } from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
//   import AntDesign from 'react-native-vector-icons/AntDesign';
  

//   const data = [
//     { label: 'Admin', value: '1' },
//     { label: 'Seller', value: '2' },
//     { label: 'Buyer', value: '3' },

//   ];

//   const DropdownComponent = () => {
//     const [value, setValue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);

//     const renderLabel = () => {
//       if (value || isFocus) {
//         return (
//           <Text style={[styles.label, isFocus && { color: '#000000' }]}>
//             Account Type
//           </Text>
//         );
//       }
//       return null;
//     };

//     return (
//       <View style={styles.container}>
//         {renderLabel()}
//         <Dropdown
//           style={[styles.dropdown, isFocus && { borderColor: 'white' }]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           // inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={data}
//           // search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? 'Select Account Type' : '...' }
//           // searchPlaceholder="Search..."
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={item => {
//             setValue(item.value);
//             setIsFocus(false);
//           }}
//           renderLeftIcon={() => (
//             <AntDesign
//               style={styles.icon}
//               color={isFocus ? 'white' : 'white'}
//               name="Safety"
//               size={20}
//             />
//           )}
//         />
//       </View>
//     );
//   };

//   export default DropdownComponent;

//   const styles = StyleSheet.create({
//     container: {
//       width:300,
      
//     },
//     dropdown: {
//       height: 50,
//       marginTop:20,
    
//       width:250,
//       borderColor: 'white',
//       borderWidth: 3,
//       borderRadius: 12,
//       paddingHorizontal: 8,
//       marginRight:40,
//       marginLeft:25
//     },
//     icon: {
//       marginRight: 5,
//     },
//     label: {
//       position: 'absolute',
//       backgroundColor: 'white',
      
//       left: 22,
//       top: 8,
//       zIndex: 999,
//       paddingHorizontal: 8,
//       fontSize: 14,
//     },
//     placeholderStyle: {
//       fontSize: 16,
//       color:'white',
//     },
//     selectedTextStyle: {
//       fontSize: 16,
//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//     },
//   });//end

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const DropdownComponent = () => {
//   return (
//     <View>
//       <Text>DropdownComponent</Text>
//     </View>
//   )
// }

// export default DropdownComponent

// const styles = StyleSheet.create({})