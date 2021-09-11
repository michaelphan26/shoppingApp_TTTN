import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

interface Props {
  percent: number;
}
const DiscountIconBadge = (props: Props) => {
  return (
    <View style={styles.discountBadge}>
      <Text style={styles.badgeText}>-{props.percent}%</Text>
    </View>
  );
};

export default DiscountIconBadge;
