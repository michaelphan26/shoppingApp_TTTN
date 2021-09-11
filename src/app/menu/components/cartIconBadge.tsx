import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/store';
import styles from '../style';

const CartIconBadge = () => {
  const cart = useSelector((state: RootState) => state.cartReducer);

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{cart.productList.length}</Text>
    </View>
  );
};

export default CartIconBadge;
