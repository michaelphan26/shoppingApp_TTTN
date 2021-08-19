import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CartLayout from '../../../common/ui/layout/cart-layout';
import { ioProductDetailItem } from '../../../common/util/common';
import styles from '../../receipt-detail/style';
import IOProductDetailRow from './ioProductDetailRow';

interface Props {
  ioProductDetailList: [];
  date: string;
  id_ioType: string;
}
const AdminIOProductDetail = (props: Props) => {
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
          {props.ioProductDetailList.map((item: ioProductDetailItem) => {
            return <IOProductDetailRow item={item} key={item.id_product} />;
          })}
        </ScrollView>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Thông tin nhập xuất</Text>
        <Text style={styles.detailText}>Loại: {props.ioTypeName}</Text>
        <Text style={styles.detailText}>Ngày tháng: {props.date}</Text>
      </View>
      <View style={styles.buttonContainer}></View>
    </CartLayout>
  );
};

export default AdminIOProductDetail;
