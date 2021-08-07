import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProductLayout from '../../common/ui/layout/product-layout';
import ReceiptBottomComponent from '../../common/ui/layout/product-layout/components/receiptBottomComponent';
import ReceiptRowContainer from '../../common/ui/layout/receipt-layout/receiptRowContainer';
import {
  getReceiptListFromAPI,
  ReceiptInterface,
} from '../../common/util/common';
import styles from './style';

const Receipt = () => {
  const [receiptList, setReceiptList] = useState([] as any);

  const getReceiptList = async () => {
    const receiptListFromAPI = await getReceiptListFromAPI();
    if (typeof receiptListFromAPI !== 'string') {
      setReceiptList(receiptListFromAPI);
    } else {
      //Toast
    }
  };

  useEffect(() => {
    getReceiptList();
  }, []);

  const handleDetailPressed = (receipt: ReceiptInterface) => {
    Actions.push('receiptDetail', { receipt: receipt });
  };

  return (
    <ProductLayout title="Danh sách hóa đơn" backPressed={() => Actions.pop()}>
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
    </ProductLayout>
  );
};

export default Receipt;
