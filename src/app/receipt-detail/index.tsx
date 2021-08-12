import React, { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  getReceiptDetailFromAPI,
  getReceiptListFromAPI,
  getUserInfoFromAPI,
  ReceiptDetailInterface,
  ReceiptInterface,
  UserInfo,
} from '../../common/util/common';
import styles from './style';
import numeral from 'numeral';
import ProductRowNoQuantity from '../../common/ui/layout/cart-layout/productRowNoQuantity';
import CartLayout from '../../common/ui/layout/cart-layout';

interface Props {
  receipt: ReceiptInterface;
}

const ReceiptDetail = (props: Props) => {
  const [receiptDetail, setReceiptDetail] = useState([] as any);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    address: '',
  });

  async function getUserInfo() {
    const userInfoFromAPI = await getUserInfoFromAPI();
    if (typeof userInfoFromAPI !== 'string') {
      // if (Object.keys(userInfoFromAPI).length !== 0) {
      //   set
      // } else {
      //   //Toast cannot get info
      // }
      setUserInfo(userInfoFromAPI);
    } else {
      //Toast string
    }
  }

  //get Receipt detail
  async function getReceiptDetail() {
    const receiptDetailFromAPI = await getReceiptDetailFromAPI(
      props.receipt._id
    );
    if (typeof receiptDetailFromAPI !== 'string') {
      //
      setReceiptDetail(receiptDetailFromAPI);
    } else {
      //Toast
    }
  }

  useEffect(() => {
    getUserInfo();
    getReceiptDetail();
  }, []);

  return (
    <CartLayout
      title="Thông tin hóa đơn"
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
          {receiptDetail.map((item: ReceiptDetailInterface) => {
            return <ProductRowNoQuantity item={item} key={item.id_product} />;
          })}
        </ScrollView>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Thông tin đơn hàng</Text>
        <Text style={styles.detailText}>Họ tên: {userInfo.name}</Text>
        <Text style={styles.detailText}>SĐT: {userInfo.phone}</Text>
        <Text style={styles.detailText}>Email: {props.receipt.email}</Text>
        <Text style={styles.detailText}>Địa chỉ: {userInfo.address}</Text>
        <Text style={styles.detailText}>Ngày tháng: {props.receipt.date}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.totalText}>
          {numeral(props.receipt.total).format('0,0')}đ
        </Text>
      </View>
    </CartLayout>
  );
};

export default ReceiptDetail;
