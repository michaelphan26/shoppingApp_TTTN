import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CartLayout from '../../common/ui/layout/cart-layout';
import ReceiptRowContainer from '../../common/ui/layout/receipt-layout/receiptRowContainer';
import {
  getReceiptListFromAPI,
  ReceiptInterface,
  showToast,
  UserInfo,
} from '../../common/util/common';
import styles from './style';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/store';

interface Props {
  userInfo: UserInfo;
}
const Receipt = (props: Props) => {
  const [receiptList, setReceiptList] = useState([] as any);
  const account = useSelector((state: RootState) => state.accountReducer);

  const getReceiptList = async () => {
    const receiptListFromAPI = await getReceiptListFromAPI();
    if (typeof receiptListFromAPI !== 'string') {
      setReceiptList(receiptListFromAPI);
    } else {
      //Toast
      showToast('Không thể lấy danh sách hóa đơn');
    }
  };

  useEffect(() => {
    getReceiptList();
  }, []);

  const handleDetailPressed = (receipt: ReceiptInterface) => {
    Actions.push('receiptDetail', {
      receipt: receipt,
      userInfo: props.userInfo,
      isAdmin: false,
    });
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
                email={account.email}
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
