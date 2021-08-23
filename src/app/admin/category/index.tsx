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
  addJustName,
  JustNameItem,
  deleteJustName,
  editJustName,
  getCategoryListFromAPI,
  initialJustNameItem,
  addCategoryUrl,
  editCategoryUrl,
  deleteCategoryUrl,
} from '../../../common/util/common';
import { useEffect } from 'react';
import { CustomAlert } from '../../../common/ui/base/admin-alert';
import Toast from 'react-native-root-toast';

interface Props {}
const AdminCategory = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [categoryList, setCategoryList] = useState([] as any);
  const [editItem, setEditItem] = useState<JustNameItem>(initialJustNameItem);
  const [searchText, setSearchText] = useState<string>('');
  const [name, setName] = useState<string>('');

  async function getCategoryList() {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (typeof categoryListFromAPI != 'string') {
      setCategoryList(categoryListFromAPI);
    } else {
      //Toast
      Toast.show('Không thể lấy danh sách danh mục', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleAddPressed = () => {
    setModalVisible(true);
    setAction('Add');
  };

  const handleEditPressed = (item: JustNameItem) => {
    setModalVisible(true);
    setAction('Edit');
    setEditItem(item);
    setName(item.name);
  };

  const handleCloseModal = () => {
    setName('');
    setModalVisible(false);
    setModalDeleteVisible(false);
    setEditItem(initialJustNameItem);
  };

  const handleAddCategory = async () => {
    if (name.trim().length !== 0) {
      const code = await addJustName(addCategoryUrl, name.trim());
      //Toast
      if (code === 200) {
        handleCloseModal();
        Actions.refresh({ key: Math.random() });
        Toast.show('Thêm danh mục thành công', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      } else {
        Toast.show('Không thể thêm danh mục', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      }
    } else {
      //Toast err
      Toast.show('Tên không được để trống', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  const handleSaveCategory = async () => {
    if (name.trim().length !== 0) {
      editItem.name = name.trim();
      const code = await editJustName(editCategoryUrl, editItem);
      //Toast
      if (code === 200) {
        handleCloseModal();
        Actions.refresh({ key: Math.random() });
      } else {
        Toast.show('Không thể chỉnh sửa danh mục', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      }
    } else {
      //Toast err
      Toast.show('Tên không được để trống', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  const handleDeletePressed = (item: JustNameItem) => {
    setModalDeleteVisible(true);
    setEditItem(item);
  };

  const handleDeleteCategory = async () => {
    const code = await deleteJustName(deleteCategoryUrl, editItem);
    //Toast
    if (code === 200) {
      console.log('200');
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
      Toast.show('Xóa danh mục thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else {
      Toast.show('Không thể xóa danh mục', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      setModalDeleteVisible(false);
    }
  };

  const alertBody = () => {
    return (
      <NormalTextInput
        placeholderText="Tên"
        onTextChange={(text) => setName(text)}
        value={name}
        editable={true}
      />
    );
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
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa danh mục"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSaveCategory}
          >
            {alertBody()}
          </AdminAlert>
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
        data={categoryList.filter((item: JustNameItem) =>
          item.name.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: JustNameItem) => {
          return (
            <SearchRow
              item={item.item}
              onEditPressed={handleEditPressed}
              onDeletePressed={handleDeletePressed}
            />
          );
        }}
        keyExtractor={(item: JustNameItem) => item._id}
      />
    </CartLayout>
  );
};

export default AdminCategory;
