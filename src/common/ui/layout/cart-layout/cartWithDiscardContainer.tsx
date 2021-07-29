import React from 'react';
import { View } from 'react-native';
import { Entypo, MaterialIcons } from 'react-native-vector-icons';
import styles from './style';

const CartWithDiscardContainer = () => {
  return (
    <View style={styles.buttonContainer}>
      <MaterialIcons name="remove-circle" size={25} />
      <Entypo name="chevron-right" size={30} />
    </View>
  );
};

export default CartWithDiscardContainer;
