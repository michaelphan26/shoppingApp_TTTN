import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  FlatList,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  NormalTextInput,
  PasswordTextInput,
} from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import {
  UserInterface,
  addUserToAPI,
  emailReg,
  getRoleFromAPI,
  getUserListFromAPI,
  JustNameItem,
  phoneReg,
  RegisterInfo,
  UserItem,
  initialUserInterface,
  UserDetailItem,
  editUserAPI,
} from '../../../common/util/common';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import { Color } from '../../../common/util/enum';
import UserRow from './userRow';
import { AdminAlert } from '../../../common/ui/base/admin-alert';
import { Controller, useForm } from 'react-hook-form';
import { SmallText } from '../../../common/ui/base/errorText';
import RNPickerSelect from 'react-native-picker-select';

interface Props {}
const AdminUser = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userList, setUserList] = useState([] as any);
  const [roleList, setRoleList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');
  const [action, setAction] = useState<string>('Add');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>(initialUserInterface);
  const [_id, set_id] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  async function getUserList() {
    const userListFromAPI = await getUserListFromAPI();
    if (typeof userListFromAPI != 'string') {
      setUserList(userListFromAPI);
    } else {
      //Toast
    }
  }

  async function getRoleList() {
    const roleListFromAPI = await getRoleFromAPI();
    if (typeof roleListFromAPI != 'string') {
      let tempList = [] as any;
      for (const index in roleListFromAPI) {
        tempList.push({
          label: roleListFromAPI[index].name,
          value: roleListFromAPI[index]._id,
        });
      }
      setRoleList(tempList);
    } else {
      //Toast
    }
  }

  useEffect(() => {
    getUserList();
    getRoleList();
  }, []);

  const handleAddPressed = () => {
    setAction('Add');
    setModalVisible(true);
  };

  const handleEditPressed = (
    userItem: UserItem,
    userDetail: UserDetailItem,
    id_role: string
  ) => {
    set_id(userItem._id);
    setAction('Edit');
    const editUser = {
      email: userItem.email,
      password: '',
      name: userDetail.name,
      phone: userDetail.phone,
      address: userDetail.address,
      id_role: id_role,
    };
    reset(editUser);
    setUser(editUser);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    reset(initialUserInterface);
    setUser(initialUserInterface);
    setModalVisible(false);
  };

  const handlePasswordVisibleChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleAddAccount = async (info: UserInterface) => {
    const code = await addUserToAPI(info);
    if (code === 200) {
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
    }
    //Toast code
  };
  const handleSaveAccount = async (info: UserInterface) => {
    delete info.email;
    delete info.password;
    const code = await editUserAPI(_id, info);
    if (code === 200) {
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
    }
    //Toast code
  };

  const alertBody = () => {
    return (
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Email"
              iconName="at"
              onTextChange={onChange}
              value={value}
              editable={action === 'Add' ? true : false}
            />
          )}
          rules={{ required: true, pattern: emailReg }}
          defaultValue={action === 'Add' ? '' : user.email}
          name="email"
        />
        {errors.email && <SmallText title="Email không đúng định dạng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <PasswordTextInput
              placeholderText="Mật khẩu"
              iconName="key"
              onTextChange={onChange}
              onVisibleChange={handlePasswordVisibleChange}
              secure={passwordVisible}
              value={value}
              editable={action === 'Add' ? true : false}
            />
          )}
          rules={
            action === 'Add'
              ? { required: true, minLength: 8, maxLength: 30 }
              : {}
          }
          name="password"
          defaultValue={action === 'Add' ? '' : user.password}
        />
        {errors.password && (
          <SmallText title="Mật khẩu có độ dài từ 8-30 kí tự" />
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Tên"
              iconName="user"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 2, maxLength: 50 }}
          name="name"
          defaultValue={action === 'Add' ? '' : user.name}
        />
        {errors.name && <SmallText title="Tên không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="SĐT"
              iconName="phone"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: phoneReg,
          }}
          name="phone"
          defaultValue={action === 'Add' ? '' : user.phone}
        />
        {errors.phone && <SmallText title="SĐT không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Địa chỉ"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 100 }}
          name="address"
          defaultValue={action === 'Add' ? '' : user.address}
        />
        {errors.address && <SmallText title="Địa chỉ không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TouchableHighlight style={styles.pickerContainer}>
              <RNPickerSelect
                style={styles}
                onValueChange={onChange}
                placeholder={{
                  label: 'Chọn chức vụ',
                  value: '',
                }}
                value={value}
                items={roleList}
                useNativeAndroidPickerStyle={false}
              />
            </TouchableHighlight>
          )}
          rules={{ required: true }}
          name="id_role"
          defaultValue={action === 'Add' ? '' : user.id_role}
        />
        {errors.id_role && <SmallText title="Chưa chọn chức vụ" />}
      </View>
    );
  };

  return (
    <CartLayout
      title="Danh sách tài khoản"
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
            title="Thêm tài khoản"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleAddAccount)}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa tài khoản"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleSaveAccount)}
          >
            {alertBody()}
          </AdminAlert>
        )}
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={userList.filter((item: UserItem) =>
          item.email.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: UserItem) => {
          return <UserRow item={item.item} onEditPressed={handleEditPressed} />;
        }}
        keyExtractor={(item: UserItem) => item._id}
      />
    </CartLayout>
  );
};

export default AdminUser;
