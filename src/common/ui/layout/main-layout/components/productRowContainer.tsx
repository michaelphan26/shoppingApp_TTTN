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

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  stock: number;
  brand: string;
  id_category: string;
  image: string;
}
interface Props {
  item: ProductItem;
  productPressed: (item: ProductItem) => void;
}
const ProductRowItem = (props: Props) => {
  return (
    <View style={styles.productContainer}>
      <TouchableWithoutFeedback
        onPress={() => props.productPressed(props.item)}
      >
        <>
          <Image
            source={{ uri: `data:image/png;base64,${props.item.image}` }}
            style={styles.imageRound}
            resizeMode="contain"
          />
          <View style={styles.detailContainer}>
            <Text style={styles.titleTiny}>{props.item.name}</Text>
            <Text style={styles.titleTiny}>{props.item.brand}</Text>
            <Text style={styles.titleTiny}>
              {numeral(props.item.price).format('0,0')}đ
            </Text>
          </View>
        </>
      </TouchableWithoutFeedback>
      <CartIconContainer
        onDetailPressed={() => props.productPressed(props.item)}
      />
    </View>
  );
};

export default ProductRowItem;
