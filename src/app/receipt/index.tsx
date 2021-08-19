import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CartLayout from '../../common/ui/layout/cart-layout';
import ReceiptRowContainer from '../../common/ui/layout/receipt-layout/receiptRowContainer';
import {
  getReceiptListFromAPI,
  ReceiptInterface,
} from '../../common/util/common';
import styles from './style';
import Toast from 'react-native-simple-toast';

const Receipt = () => {
  const [receiptList, setReceiptList] = useState([] as any);

  const getReceiptList = async () => {
    const receiptListFromAPI = await getReceiptListFromAPI();
    if (typeof receiptListFromAPI !== 'string') {
      setReceiptList(receiptListFromAPI);
    } else {
      //Toast
      Toast.showWithGravity(
        'Không thể lấy danh sách hóa đơn',
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  useEffect(() => {
    getReceiptList();
  }, []);

  const handleDetailPressed = (receipt: ReceiptInterface) => {
    Actions.push('receiptDetail', { receipt: receipt });
  };

  return (
    <CartLayout
      title="Danh sách hóa đơn"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
      <View style={styles.body}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {receiptList.map((item: ReceiptInterface) => {
            return (
              <ReceiptRowContainer
                receipt={item}
                key={item._id}
                onDetailPressed={handleDetailPressed}
              />
            );
          })}
        </ScrollView>
      </View>
    </CartLayout>
  );
};

export default Receipt;
