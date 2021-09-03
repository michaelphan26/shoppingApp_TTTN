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
  addReceiptAPI,
  CartItem,
  getCategoryNameFromAPI,
  getProductDetailFromAPI,
  ProductItem,
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
  item: CartItem;
}
const ProductRowWithQuantity = (props: Props) => {
  const [product, setProduct] = useState<ProductItem>({} as ProductItem);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartReducer);

  const getProductDetail = async () => {
    const productDetail = await getProductDetailFromAPI(props.item.id_product);
    if (typeof productDetail !== 'string') {
      setProduct(productDetail);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const handleIncreaseQuantity = async () => {
    const newQuantity = props.item.quantity + 1;
    dispatch(
      changeQuantity({
        item: props.item,
        newQuantity: newQuantity,
      })
    );
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
    // if (token !== null) {
    //   console.log('Push API');
    //   axios({
    //     url: `/receipt/add-receipt`,
    //     baseURL: `${api_url}`,
    //     method: 'post',
    //     headers: {
    //       'x-auth-token': token,
    //     },
    //     responseType: 'json',
    //     data: { productList: cart.productList, total: cart.total },
    //   }).catch((err) => {
    //     console.log(err.response.data['message']);
    //   });
    // }
  };

  const handleDecreaseQuantity = async () => {
    const newQuantity = props.item.quantity - 1;
    dispatch(
      changeQuantity({
        item: props.item,
        newQuantity: newQuantity,
      })
    );
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
    // if (token !== null) {
    //   console.log('Push API');
    //   axios({
    //     url: `/receipt/add-receipt`,
    //     baseURL: `${api_url}`,
    //     method: 'post',
    //     headers: {
    //       'x-auth-token': token,
    //     },
    //     responseType: 'json',
    //     data: { productList: cart.productList, total: cart.total },
    //   }).catch((err) => {
    //     console.log(err.response.data['message']);
    //   });
    // }
  };

  const handleRemoveFromCart = async () => {
    dispatch(removeFromCart(props.item));
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
  };

  const handleCheckProductDetail = async () => {
    const categoryName = await getCategoryNameFromAPI(product);
    console.log(categoryName);
    Actions.push('product', {
      item: product,
      categoryName: categoryName,
    });
  };

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
          <CartWithDiscardContainer
            removeFromCart={handleRemoveFromCart}
            checkDetail={handleCheckProductDetail}
          />
        </View>
        <View style={styles.quantityWrapper}>
          <TouchableHighlight
            underlayColor={Color['pink-p']}
            onPress={handleDecreaseQuantity}
            style={styles.decreaseButton}
          >
            <Entypo name="minus" size={14} color={Color.white} />
          </TouchableHighlight>
          <Text style={styles.quantityText}>{props.item.quantity}</Text>
          <TouchableHighlight
            underlayColor={Color['light-blue-p']}
            onPress={handleIncreaseQuantity}
            style={styles.increaseButton}
          >
            <Entypo name="plus" size={14} color={Color.white} />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductRowWithQuantity;
