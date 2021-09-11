import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

interface Props {
  percent: number;
}
const SearchRowDiscountIconBadge = (props: Props) => {
  return (
    <View style={styles.discountBadgeLeft}>
      <Text style={styles.badgeText}>-{props.percent}%</Text>
    </View>
  );
};

export default SearchRowDiscountIconBadge;
