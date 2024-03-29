import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../style';
import numeral from 'numeral';
import { ProductItem } from '../../../../util/common';
import DiscountIconBadge from '../../../../../app/menu/components/discountIconBadge';

interface Props {
  item: ProductItem;
  productPressed: (item: ProductItem) => void;
}
const SquareItemView = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.productPressed(props.item)}>
      <View style={styles.itemContainer}>
        {props.item.discount != 0 ? (
          <DiscountIconBadge percent={props.item.discount} />
        ) : null}
        <Image
          source={{ uri: `data:image/png;base64,${props.item.image}` }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.titleSmall} numberOfLines={1}>
          {props.item.name}
        </Text>
        <Text style={styles.titleTiny} numberOfLines={1}>
          {numeral(props.item.price).format('0,0')}đ
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SquareItemView;
