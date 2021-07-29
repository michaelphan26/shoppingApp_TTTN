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
import { CartItem, ProductItem } from '../../../util/common';
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

  const handleIncreaseQuantity = async () => {
    const token = await AsyncStorage.getItem('@token');
    const newQuantity = props.item.quantity + 1;
    dispatch(
      changeQuantity({
        item: props.item,
        newQuantity: newQuantity,
        token: token,
      })
    );
    if (token !== null) {
      console.log('Push API');
      axios({
        url: `/receipt/add-receipt`,
        baseURL: `${api_url}`,
        method: 'post',
        headers: {
          'x-auth-token': token,
        },
        responseType: 'json',
        data: { productList: cart.productList, total: cart.total },
      }).catch((err) => {
        console.log(err.response.data['message']);
      });
    }
  };

  const handleDecreaseQuantity = async () => {
    const newQuantity = props.item.quantity - 1;
    const token = await AsyncStorage.getItem('@token');
    dispatch(
      changeQuantity({
        item: props.item,
        newQuantity: newQuantity,
        token: token,
      })
    );
    if (token !== null) {
      console.log('Push API');
      axios({
        url: `/receipt/add-receipt`,
        baseURL: `${api_url}`,
        method: 'post',
        headers: {
          'x-auth-token': token,
        },
        responseType: 'json',
        data: { productList: cart.productList, total: cart.total },
      }).catch((err) => {
        console.log(err.response.data['message']);
      });
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(props.item));
  };

  const getProduct = async (id_product: string): Promise<ProductItem> => {
    let product: ProductItem = {} as ProductItem;
    await axios({
      url: `product/product-detail/${id_product}`,
      baseURL: `${api_url}`,
      method: 'get',
    }).then((res) => {
      if (res.data['code'] === 200) {
        product = res.data['data'];
      }
    });
    return product;
  };

  const getCategoryName = async (product: ProductItem): Promise<string> => {
    let categoryName = '';
    await axios({
      url: `category/get-name/${product.id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
    }).then((res) => {
      if (res.data['code'] === 200) {
        categoryName = res.data['data'].name;
      }
    });
    return categoryName;
  };

  const handleCheckProductDetail = async () => {
    const product = await getProduct(props.item.id_product);
    const categoryName = await getCategoryName(product);
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
