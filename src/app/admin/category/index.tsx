import React from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchRow from '../../../common/ui/base/searchRow';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import styles from './style';
import { Entypo } from 'react-native-vector-icons';
import AdminAlert from '../../../common/ui/base/admin-alert/adminAlert';
import { Color } from '../../../common/util/enum';
import { useState } from 'react';
import {
  addCategory,
  CategoryItem,
  deleteCategory,
  getCategoryListFromAPI,
} from '../../../common/util/common';
import { useEffect } from 'react';
import { CustomAlert } from '../../../common/ui/base/admin-alert';

interface Props {}
const initialItem: CategoryItem = {
  _id: '',
  name: '',
};
const AdminCategory = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [categoryList, setCategoryList] = useState([] as any);
  const [editItem, setEditItem] = useState<CategoryItem>(initialItem);
  const [searchText, setSearchText] = useState<string>('');
  const [name, setName] = useState<string>('');

  async function getCategoryList() {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (typeof categoryListFromAPI != 'string') {
      setCategoryList(categoryListFromAPI);
    } else {
      //Toast
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleAddPressed = () => {
    setModalVisible(true);
    setAction('Add');
  };

  const handleEditPressed = (item: CategoryItem) => {
    setModalVisible(true);
    setAction('Edit');
    setEditItem(item);
  };

  const handleCloseModal = () => {
    setName('');
    setModalVisible(false);
    setModalDeleteVisible(false);
    setEditItem(initialItem);
  };

  const handleAddCategory = async () => {
    if (name.trim().length !== 0) {
      const code = await addCategory(name.trim());
      //Toast
      if (code === 200) {
        handleCloseModal();
        Actions.refresh({ key: Math.random() });
      } else {
        console.log(code);
      }
    } else {
      //Toast err
    }
  };

  const handleSaveCategory = () => {};

  const handleDeletePressed = (item: CategoryItem) => {
    setModalDeleteVisible(true);
    setEditItem(item);
  };

  const handleDeleteCategory = async () => {
    const code = await deleteCategory(editItem);
    //Toast
    if (code === 200) {
      console.log('200');
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
    } else {
      console.log(code);
    }
  };

  return (
    <CartLayout
      title="Danh mục sản phẩm"
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
        {action === 'Add' ? (
          <AdminAlert
            alertVisible={modalVisible}
            title="Thêm danh mục"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleAddCategory}
            name={name}
            nameChange={(nameChange) => setName(nameChange)}
          />
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa danh mục"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSaveCategory}
            name={name}
            nameChange={(nameChange) => setName(nameChange)}
          />
        )}
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
        data={categoryList.filter((item: CategoryItem) =>
          item.name.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: CategoryItem) => {
          return (
            <SearchRow
              item={item.item}
              onEditPressed={handleEditPressed}
              onDeletePressed={handleDeletePressed}
            />
          );
        }}
        keyExtractor={(item: CategoryItem) => item._id}
      />
    </CartLayout>
  );
};

export default AdminCategory;
