import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import ReceiptRowContainer from '../../../common/ui/layout/receipt-layout/receiptRowContainer';
import {
  getReceiptListAdminFromAPI,
  getUserInfoByIDFromAPI,
  getUserItemByIDFromAPI,
  ReceiptInterface,
  showToast,
} from '../../../common/util/common';
import styles from '../category/style';

interface Props {}
const AdminReceipt = (props: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [receiptList, setReceiptList] = useState([] as any);

  const getUserDetail = async (_id: string) => {
    const userDetail = await getUserInfoByIDFromAPI(_id);
    if (typeof userDetail !== 'string') {
      return userDetail;
    } else {
      //Toast
      showToast('Không thể lấy thông tin tài khoản');
    }
  };

  const getReceiptList = async () => {
    const receiptListFromAPI = await getReceiptListAdminFromAPI();
    if (typeof receiptListFromAPI !== 'string') {
      setReceiptList(receiptListFromAPI);
    } else {
      //Toast
      showToast('Không thể lấy danh sách khách hàng');
    }
  };

  useEffect(() => {
    getReceiptList();
  }, []);

  const handleDetailPressed = async (receipt: ReceiptInterface) => {
    const userInfo = await getUserDetail(receipt.id_user);
    Actions.push('receiptDetail', { receipt: receipt, userInfo: userInfo });
  };

  return (
    <CartLayout
      title="Hóa đơn"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
      <View style={styles.searchContainer}>
        <NormalTextInput
          iconName="search"
          placeholderText="Tìm kiếm..."
          onTextChange={(text) => setSearchText(text)}
          value={searchText}
          editable={true}
        />
      </View>

      <FlatList
        data={receiptList}
        style={styles.listContainer}
        renderItem={(item: ReceiptInterface) => {
          return (
            <ReceiptRowContainer
              receipt={item.item}
              key={item._id}
              onDetailPressed={handleDetailPressed}
            />
          );
        }}
        keyExtractor={(item: ReceiptInterface) => item._id}
      />
    </CartLayout>
  );
};

export default AdminReceipt;
