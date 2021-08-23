import React from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchRow from '../../../common/ui/base/searchRow';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import AdminAlert from '../../../common/ui/base/admin-alert/adminAlert';
import { Color } from '../../../common/util/enum';
import { useState } from 'react';
import {
  addJustName,
  JustNameItem,
  deleteJustName,
  editJustName,
  getRoleFromAPI,
  initialJustNameItem,
  addRoleUrl,
  editRoleUrl,
  deleteRoleUrl,
} from '../../../common/util/common';
import { useEffect } from 'react';
import { CustomAlert } from '../../../common/ui/base/admin-alert';
import Toast from 'react-native-root-toast';

interface Props {}

const AdminRole = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [roleList, setRoleList] = useState([] as any);
  const [editItem, setEditItem] = useState<JustNameItem>(initialJustNameItem);
  const [searchText, setSearchText] = useState<string>('');
  const [name, setName] = useState<string>('');

  async function getRoleList() {
    const roleListFromAPI = await getRoleFromAPI();
    if (typeof roleListFromAPI != 'string') {
      setRoleList(roleListFromAPI);
    } else {
      //Toast
      Toast.show('Không thể lấy danh sách chức vụ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  useEffect(() => {
    getRoleList();
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

  const handleAddRole = async () => {
    if (name.trim().length !== 0) {
      const code = await addJustName(addRoleUrl, name.trim());
      //Toast
      if (code === 200) {
        handleCloseModal();
        Actions.refresh({ key: Math.random() });
        Toast.show('Thêm chức vụ thành công', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      } else {
        Toast.show('Không thể thêm chức vụ', {
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

  const handleSaveRole = async () => {
    if (name.trim().length !== 0) {
      editItem.name = name.trim();
      const code = await editJustName(editRoleUrl, editItem);
      //Toast
      if (code === 200) {
        handleCloseModal();
        Actions.refresh({ key: Math.random() });
        Toast.show('Chỉnh sửa chức vụ thành công', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      } else {
        Toast.show('Không thể chỉnh sửa chức vụ', {
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

  const handleDeleteRole = async () => {
    const code = await deleteJustName(deleteRoleUrl, editItem);
    //Toast
    if (code === 200) {
      console.log('200');
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
      Toast.show('Xóa chức vụ thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else {
      Toast.show('Không thể xóa chức vụ', {
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
      title="Danh mục chức vụ"
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
            title="Thêm chức vụ"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleAddRole}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa chức vụ"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSaveRole}
          >
            {alertBody()}
          </AdminAlert>
        )}
        <CustomAlert
          alertVisible={modalDeleteVisible}
          title="Xóa chức vụ"
          okTitle="Xóa"
          onCancelPressed={handleCloseModal}
          onOkPressed={handleDeleteRole}
        />
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={roleList.filter((item: JustNameItem) =>
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

export default AdminRole;
