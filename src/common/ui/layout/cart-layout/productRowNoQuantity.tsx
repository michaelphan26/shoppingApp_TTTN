import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import numeral from 'numeral';
import CartWithDiscardContainer from './cartWithDiscardContainer';
import styles from './style';
import {
  CartItem,
  getProductDetail,
  getProductDetailFromAPI,
  ProductItem,
  ReceiptDetailInterface,
} from '../../../util/common';
import axios from 'axios';
import { useEffect } from 'react';
import { api_url } from '../../../util/constant';
import { Color } from '../../../util/enum';
import { Entypo } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, removeFromCart } from '../../../../models/cartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../../../models/store';
import { Actions } from 'react-native-router-flux';

interface Props {
  item: ReceiptDetailInterface;
}
const ProductRowNoQuantity = (props: Props) => {
  const [product, setProduct] = useState<ProductItem>({} as ProductItem);
  const dispatch = useDispatch();

  const getProductDetail = async () => {
    const productDetail = await getProductDetailFromAPI(props.item.id_product);
    if (typeof productDetail !== 'string') {
      setProduct(productDetail);
    }
  };

  const handleCheckProductDetail = () => {};

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleCheckProductDetail}>
      <View style={styles.productContainer}>
        <View style={styles.detailWrapper}>
          <Image
            source={{ uri: `data:image/png;base64,${product.image}` }}
            style={styles.imageRound}
            resizeMode="contain"
          />
          <View style={styles.detailContainer}>
            <Text style={styles.titleTiny}>{product.name}</Text>
            <Text style={styles.titleTiny}>{product.brand}</Text>
            <Text style={styles.titleTiny}>
              {numeral(props.item.price).format('0,0')}đ
            </Text>
          </View>
        </View>
        <View style={styles.quantityWrapper}>
          <Text style={styles.quantityText}>x{props.item.quantity}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductRowNoQuantity;
