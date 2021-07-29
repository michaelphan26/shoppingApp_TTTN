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
import { CartItem } from '../../../util/common';
import axios from 'axios';
import { useEffect } from 'react';
import { api_url } from '../../../util/constant';
import { Color } from '../../../util/enum';
import { Entypo } from 'react-native-vector-icons';

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
  item: CartItem;
}
const ProductRowWithQuantity = (props: Props) => {
  const [product, setProduct] = useState<ProductItem>({} as ProductItem);

  useEffect(() => {
    axios({
      url: `/product/product-detail/${props.item.id_product}`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    }).then((res) => {
      if (res.data['code'] === 200) {
        setProduct(res.data['data']);
      }
    });
  }, []);

  return (
    <View style={styles.productContainer}>
      <View style={styles.detailWrapper}>
        <TouchableWithoutFeedback>
          <>
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
          </>
        </TouchableWithoutFeedback>
        <CartWithDiscardContainer />
      </View>
      <View style={styles.quantityWrapper}>
        <TouchableHighlight underlayColor={Color['pink-p']}>
          <View style={styles.decreaseButton}>
            <Entypo name="minus" size={14} color={Color.white} />
          </View>
        </TouchableHighlight>
        <Text style={styles.quantityText}>{props.item.quantity}</Text>
        <TouchableHighlight underlayColor={Color['light-blue-p']}>
          <View style={styles.increaseButton}>
            <Entypo name="plus" size={14} color={Color.white} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ProductRowWithQuantity;
