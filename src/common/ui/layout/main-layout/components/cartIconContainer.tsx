import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Entypo, FontAwesome } from 'react-native-vector-icons';
import styles from '../style';

interface Props {
  onDetailPressed: () => void;
}
const CartIconContainer = (props: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <FontAwesome name="cart-plus" size={22} />
      <TouchableWithoutFeedback onPress={() => props.onDetailPressed()}>
        <Entypo name="chevron-right" size={30} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CartIconContainer;
