import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useSelector } from 'react-redux';
import PinkButton from '../../common/ui/base/button/pinkButton';
import ProductLayout from '../../common/ui/layout/product-layout';
import { CartItem, ProductItem, UserInfo } from '../../common/util/common';
import { api_url } from '../../common/util/constant';
import { RootState } from '../../models/store';
import styles from './style';
import numeral from 'numeral';
import ProductRowItem from '../../common/ui/layout/main-layout/components/productRowContainer';
import ProductRowWithQuantity from '../../common/ui/layout/cart-layout/productRowWithQuantity';

interface Props {}
const Cart = (props: Props) => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    address: '',
    phone: '',
  });

  async function getUserInfo() {
    const token = await AsyncStorage.getItem('@token');
    if (token === null) {
      return Alert.alert('Lỗi', 'Không lấy được token', [
        {
          text: 'OK',
          style: 'cancel',
          onPress: () => Actions.popTo('menu'),
        },
      ]);
    }
    axios({
      url: '/user/me',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          const userResponse: UserInfo = res.data['data'];
          setUserInfo(userResponse);
        }
      })
      .catch((err) =>
        Alert.alert('Lỗi', err.response.data['message'], [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => Actions.popTo('menu'),
          },
        ])
      );
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ProductLayout title="Giỏ hàng">
      <View style={styles.productContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {cart.productList.map((item: CartItem) => {
            console.log(item);
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
        <PinkButton title="Xác nhận" pressed={() => {}} />
      </View>
    </ProductLayout>
  );
};

export default Cart;
