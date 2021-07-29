import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Entypo, FontAwesome } from 'react-native-vector-icons';
import styles from '../style';

interface Props {
  onCartPressed: () => void;
  onDetailPressed: () => void;
}
const CartIconContainer = (props: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableWithoutFeedback onPress={() => props.onCartPressed()}>
        <FontAwesome name="cart-plus" size={22} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.onDetailPressed()}>
        <Entypo name="chevron-right" size={30} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CartIconContainer;
