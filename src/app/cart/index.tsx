import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import {
  addReceiptAPI,
  CartItem,
  getUserInfoFromAPI,
  UserInfo,
} from '../../common/util/common';
import { api_url } from '../../common/util/constant';
import { RootState } from '../../models/store';
import styles from './style';
import numeral from 'numeral';
import ProductRowWithQuantity from '../../common/ui/layout/cart-layout/productRowWithQuantity';
import { emptyCart } from '../../models/cartReducer';
import BlueButton from '../../common/ui/base/button/blueButton';
import CartLayout from '../../common/ui/layout/cart-layout';
import Toast from 'react-native-root-toast';

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
    if (typeof userResponse !== 'string') {
      if (Object.keys(userResponse).length !== 0) {
        setUserInfo(userResponse);
      }
    } else {
      Toast.show('Không thể lấy thông tin tài khoản', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  const handleConfirmPressed = async () => {
    if (cart.productList.length === 0) {
      Toast.show('Giỏ hàng hiện đang trống', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      return;
    }

    const token = await AsyncStorage.getItem('@token');
    await addReceiptAPI({
      productList: cart.productList,
      total: cart.total,
    });
    if (token && account.email !== '') {
      await axios({
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
            Toast.show('Xác nhận đơn hàng thành công', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
            });
          } else {
            Toast.show('Xác nhận đơn hàng thất bại', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
            });
          }
        })
        .catch((err) => {
          Toast.show('Không thể xác nhận đơn hàng', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
          });
        });
    } else {
      Actions.push('login');
      Toast.show('Vui lòng đăng nhập', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  const pushCart = async () => {
    await addReceiptAPI(cart);
    //Toast message
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    pushCart();
  }, [cart]);

  return (
    <CartLayout
      title="Giỏ hàng"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
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
        <BlueButton title="Xác nhận" pressed={handleConfirmPressed} />
      </View>
    </CartLayout>
  );
};

export default Cart;
