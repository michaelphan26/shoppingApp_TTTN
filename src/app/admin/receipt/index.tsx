import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import ReceiptRowContainer from '../../../common/ui/layout/receipt-layout/receiptRowContainer';
import {
  getReceiptListAdminFromAPI,
  ReceiptInterface,
} from '../../../common/util/common';
import styles from '../category/style';

interface Props {}
const AdminReceipt = (props: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [receiptList, setReceiptList] = useState([] as any);

  const getReceiptList = async () => {
    const receiptListFromAPI = await getReceiptListAdminFromAPI();
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
    <CartLayout
      title="Danh mục HĐ"
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
        data={receiptList.filter((item: ReceiptInterface) =>
          item.email.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
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
