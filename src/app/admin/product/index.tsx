import React, { useEffect, useState } from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AdminAlert, CustomAlert } from '../../../common/ui/base/admin-alert';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import MainLayout from '../../../common/ui/layout/main-layout';
import ProductRowItemNoCart from '../../../common/ui/layout/main-layout/components/productRowContainerNoCart';
import {
  getProductListFromAPI,
  ProductItem,
} from '../../../common/util/common';
import { Color } from '../../../common/util/enum';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';

interface Props {}
const AdminProduct = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [productList, setProductList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');

  async function getProductList() {
    const productListFromAPI = await getProductListFromAPI();
    if (typeof productListFromAPI != 'string') {
      setProductList(productListFromAPI);
    } else {
      //Toast
    }
  }

  useEffect(() => {
    getProductList();
  }, []);

  const handleAddPressed = () => {
    setModalVisible(true);
    setAction('Add');
  };

  const handleEditPressed = () => {
    setModalVisible(true);
    setAction('Edit');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDeleteVisible(false);
  };

  const handleAddCategory = async () => {
    // if (name.trim().length !== 0) {
    //   const code = await addJustName(addCategoryUrl, name.trim());
    //   //Toast
    //   if (code === 200) {
    //     handleCloseModal();
    //     Actions.refresh({ key: Math.random() });
    //   } else {
    //     console.log(code);
    //   }
    // } else {
    //   //Toast err
    // }
  };

  const handleSaveCategory = async () => {
    // if (name.trim().length !== 0) {
    //   editItem.name = name.trim();
    //   const code = await editJustName(editCategoryUrl, editItem);
    //   //Toast
    //   if (code === 200) {
    //     handleCloseModal();
    //     Actions.refresh({ key: Math.random() });
    //   } else {
    //     console.log(code);
    //   }
    // } else {
    //   //Toast err
    // }
  };

  const handleDeletePressed = (item: ProductItem) => {
    // setModalDeleteVisible(true);
    // setEditItem(item);
  };

  const handleDeleteCategory = async () => {
    //   const code = await deleteJustName(deleteCategoryUrl, editItem);
    //   //Toast
    //   if (code === 200) {
    //     console.log('200');
    //     handleCloseModal();
    //     Actions.refresh({ key: Math.random() });
    //   } else {
    //     console.log(code);
    //   }
  };

  return (
    <CartLayout
      title="Sản phẩm"
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
        {/* {action === 'Add' ? (
          <AdminAlert
            alertVisible={modalVisible}
            title="Thêm danh mục"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleAddCategory}
          />
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa danh mục"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSaveCategory}
          />
        )} */}
        <CustomAlert
          alertVisible={modalDeleteVisible}
          title="Xóa danh mục"
          okTitle="Xóa"
          onCancelPressed={handleCloseModal}
          onOkPressed={handleDeleteCategory}
        />
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={productList.filter(
          (item: ProductItem) =>
            item.name
              .toLowerCase()
              .startsWith(searchText.trim().toLowerCase()) ||
            item.brand.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: ProductItem) => {
          return <ProductRowItemNoCart item={item.item} />;
        }}
        keyExtractor={(item: ProductItem) => item._id}
      />
    </CartLayout>
  );
};

export default AdminProduct;
