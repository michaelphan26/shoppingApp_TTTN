import React from 'react';
import { View } from 'react-native';
import { Entypo, FontAwesome } from 'react-native-vector-icons';
import styles from '../style';

const CartIconContainer = () => {
  return (
    <View style={styles.buttonContainer}>
      <FontAwesome name="cart-plus" size={22} />
      <Entypo name="chevron-right" size={30} />
    </View>
  );
};

export default CartIconContainer;
