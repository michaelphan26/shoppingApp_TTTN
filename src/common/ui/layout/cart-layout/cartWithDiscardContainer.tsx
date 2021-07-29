import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Entypo, MaterialIcons } from 'react-native-vector-icons';
import styles from './style';

interface Props {
  removeFromCart: () => void;
  checkDetail: () => void;
}
const CartWithDiscardContainer = (props: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableWithoutFeedback onPress={() => props.removeFromCart()}>
        <MaterialIcons name="remove-circle" size={25} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.checkDetail()}>
        <Entypo name="chevron-right" size={30} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CartWithDiscardContainer;
