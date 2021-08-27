import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { api_url } from '../../../../util/constant';
import styles from '../../../../../app/menu/style';
import SquareItemView from './squareItemView';
import numeral from 'numeral';
import { FontAwesome, Entypo } from 'react-native-vector-icons';
import CartIconContainer from './cartIconContainer';
import { ProductItem } from '../../../../util/common';

interface Props {
  item: ProductItem;
  addToCart: (item: ProductItem) => Promise<void>;
  productPressed: (item: ProductItem) => Promise<void>;
}
const ProductRowItem = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.productPressed(props.item)}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: `data:image/png;base64,${props.item.image}` }}
          style={styles.imageRound}
          resizeMode="contain"
        />
        <View style={styles.detailContainer}>
          <Text style={styles.titleTiny} numberOfLines={1}>
            {props.item.name}
          </Text>
          <Text style={styles.titleTiny} numberOfLines={1}>
            {props.item.brand}
          </Text>
          <Text style={styles.titleTiny} numberOfLines={1}>
            {numeral(props.item.price).format('0,0')}đ
          </Text>
        </View>
        <CartIconContainer
          onCartPressed={() => props.addToCart(props.item)}
          onDetailPressed={() => props.productPressed(props.item)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductRowItem;
