import React, { useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import HeaderComponent from '../../common/ui/layout/product-layout/components/headerComponent';
import ProductLayout from '../../common/ui/layout/product-layout';
import { ProductItem } from '../../common/util/common';
import styles from './style';
import numeral from 'numeral';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';
import { addToCart, loadCart } from '../../models/cartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api_url } from '../../common/util/constant';
import BottomComponent from '../../common/ui/layout/product-layout/components/bottomComponent';

interface Props {
  item: ProductItem;
  categoryName: string;
}
const Product = (props: Props) => {
  const dispatch = useDispatch();

  const handleBackPressed = () => {
    Actions.pop();
  };

  const handleAddToCartPressed = async () => {
    const token = await AsyncStorage.getItem('@token');
    console.log(token);
    dispatch(
      addToCart({
        cartItem: {
          id_product: props.item._id,
          price: props.item.price,
          discount: props.item.discount,
          quantity: 1,
        },
        token: token,
      })
    );
  };

  return (
    <ProductLayout title="Thông tin sản phẩm">
      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.detailContainer}>
            <Image
              source={{ uri: `data:image/png;base64,${props.item.image}` }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.textName}>{props.item.name}</Text>
            <Text style={styles.text}>Hãng sản xuất: {props.item.brand}</Text>
            <Text style={styles.text}>Phân loại: {props.categoryName}</Text>
            <Text style={styles.text}>
              Giá: {numeral(props.item.price).format('0,0')}đ
            </Text>
            <Text style={styles.text}>
              Số lượng còn lại: {props.item.stock}
            </Text>
            <Text style={styles.text}>Giảm giá: {props.item.discount}%</Text>
            <Text style={styles.text}>Mô tả:</Text>
            <Text style={styles.text}>{props.item.description}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <BottomComponent
          backPressed={handleBackPressed}
          addToCartPressed={handleAddToCartPressed}
        />
      </View>
    </ProductLayout>
  );
};

export default Product;
