import React, { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  getReceiptDetailFromAPI,
  ReceiptDetailInterface,
  ReceiptInterface,
  showToast,
  UserInfo,
} from '../../common/util/common';
import styles from './style';
import numeral from 'numeral';
import ProductRowNoQuantity from '../../common/ui/layout/cart-layout/productRowNoQuantity';
import CartLayout from '../../common/ui/layout/cart-layout';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/store';

interface Props {
  receipt: ReceiptInterface;
  userInfo: UserInfo;
}

const ReceiptDetail = (props: Props) => {
  const [receiptDetail, setReceiptDetail] = useState([] as any);
  const account = useSelector((state: RootState) => state.accountReducer);

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
      showToast('Không thể lấy thông tin hóa đơn');
    }
  }

  useEffect(() => {
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
        <Text style={styles.detailText}>Họ tên: {props.userInfo.name}</Text>
        <Text style={styles.detailText}>SĐT: {props.userInfo.phone}</Text>
        <Text style={styles.detailText}>Email: {account.email}</Text>
        <Text style={styles.detailText}>Địa chỉ: {props.userInfo.address}</Text>
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
