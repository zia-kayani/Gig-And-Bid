import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';

//for image slider
import sliderImg1 from '../assets/sliderImg1.jpg';
import sliderImg2 from '../assets/sliderImg2.jpg';
import sliderImg3 from '../assets/sliderImg3.jpg';
import SliderComponent from '../custom_components/Slider';
import Categories from '../custom_components/Categories';
import ProductsComponent from '../custom_components/Products';

// Data for image slider
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '',
    subtitle: 'beauty creams for sell',
    image: sliderImg1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: ' ',
    subtitle: 'jeans jacket for sell (special discount)',
    image: sliderImg2,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: ' ',
    subtitle: 'premium quality leather jacket',
    image: sliderImg3,
  },
];

// Default Props for image slider
const defaults = {
  height: 200,
  width: Dimensions.get('window').width,
  delay: 3000,
};

// Default Image Item for slider
const Item = ({title, image, height, width, onPress, subtitle}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.imageContainer, {height: height, width: width}]}>
    <Image source={image} style={[styles.image, {height: height}]} />

    <View style={styles.titleContainer}>
      {/* {title && <Text style={styles.title}>{title} </Text>} */}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);

// Default On Press Action for image slider
const handlePress = item => {
  console.log('Pressed', item.id);
};

// Carousal Component for image image slider
export default function Buyer_Dashboard({
  data = DATA,
  height = defaults.height,
  width = defaults.width,
  delay = defaults.delay,
  onPress = handlePress,
  ItemElement = Item,
}) {
  const [selectedIndex, setselectedIndex] = useState(0);
  const scrollView = useRef();

  // Script which will only executed when component initilizes
  // useEffect(() => {
  //   const fn = setInterval(() => {
  //     setselectedIndex(oldCount =>
  //       oldCount === data.length - 1 ? 0 : oldCount + 1,
  //     );
  //   }, delay);
  //   return () => {
  //     clearInterval(fn);
  //   };
  // }, []);

  // Script will executed every time selectedIndex updates
  // useEffect(() => {
  //   scrollView.current.scrollTo({
  //     animated: true,
  //     x: width * selectedIndex,
  //     y: 0,
  //   });
  // }, [selectedIndex]);

  const setIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    setselectedIndex(Math.floor(contentOffset.x / viewSize.width));
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00796B"
        translucent={true}
      />

      <SliderComponent />
      <Categories />
      <ProductsComponent />
      {/* products for you */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousalContainer: {
    // for image slider
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  //for image slider
  imageContainer: {justifyContent: 'center', alignItems: 'center'},
  item: {
    backgroundColor: 'rgba(91, 91, 91, 0.3)',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //for image slider
  titleContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  //for image slider
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  //for image slider
  subtitle: {
    color: '#fff',
  },
  //for image slider
  image: {
    width: 240,
    height: 150,
  },
});
