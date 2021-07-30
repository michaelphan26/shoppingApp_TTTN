import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import PinkButton from '../../common/ui/base/button/pinkButton';
import ProductLayout from '../../common/ui/layout/product-layout';
import {
  addReceiptAPI,
  CartItem,
  getUserInfoFromAPI,
  ProductItem,
  UserInfo,
} from '../../common/util/common';
import { api_url } from '../../common/util/constant';
import { RootState } from '../../models/store';
import styles from './style';
import numeral from 'numeral';
import ProductRowItem from '../../common/ui/layout/main-layout/components/productRowContainer';
import ProductRowWithQuantity from '../../common/ui/layout/cart-layout/productRowWithQuantity';
import { emptyCart } from '../../models/cartReducer';

interface Props {}
const Cart = (props: Props) => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    address: '',
    phone: '',
  });

  async function getUserInfo() {
    const userResponse: UserInfo | string = await getUserInfoFromAPI();
    if (typeof userResponse === 'string') {
      //Toast string
    } else {
      if (Object.keys(userResponse).length !== 0) {
        setUserInfo(userResponse);
      }
    }
  }

  const handleConfirmPressed = async () => {
    if (cart.productList.length === 0) {
      //Toast loi
      return;
    }

    const token = await AsyncStorage.getItem('@token');
    if (token) {
      console.log('Checkout');
      axios({
        url: `/receipt/receipt-checkout`,
        baseURL: `${api_url}`,
        method: 'post',
        headers: {
          'x-auth-token': token,
        },
        responseType: 'json',
      })
        .then((res) => {
          if (res.data['code'] === 200) {
            dispatch(emptyCart({}));
            Actions.push('menu');
          } else {
            //Toast res.data['message']
          }
        })
        .catch((err) => {
          //Toast
          console.log(err);
          console.log(err.response.data['message']);
        });
    }
  };

  const pushCart = async () => {
    const addCart = await addReceiptAPI(cart);
    //Toast message
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    pushCart();
  }, [cart]);

  return (
    <ProductLayout title="Giỏ hàng">
      <View style={styles.productContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {cart.productList.map((item: CartItem) => {
            return <ProductRowWithQuantity item={item} key={item.id_product} />;
          })}
        </ScrollView>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <Text style={styles.detailText}>Họ tên: {userInfo.name}</Text>
        <Text style={styles.detailText}>SĐT: {userInfo.phone}</Text>
        <Text style={styles.detailText}>Email: {account.email}</Text>
        <Text style={styles.detailText}>Địa chỉ: {userInfo.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.totalText}>
          {numeral(cart.total).format('0,0')}đ
        </Text>
        <PinkButton title="Xác nhận" pressed={handleConfirmPressed} />
      </View>
    </ProductLayout>
  );
};

export default Cart;
