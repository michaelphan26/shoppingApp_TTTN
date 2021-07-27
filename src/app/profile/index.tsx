import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../common/ui/base/button';
import PinkButton from '../../common/ui/base/button/pinkButton';
import { LargeCardView } from '../../common/ui/base/cardView';
import { SmallText } from '../../common/ui/base/errorText';
import { NormalTextInput } from '../../common/ui/base/textInput';
import {
  LargeTextTouchable,
  SmallTextTouchable,
} from '../../common/ui/base/touchableText';
import AuthLayout from '../../common/ui/layout/authLayout';
import { api_url } from '../../common/util/constant';
import { accountLogout } from '../../models/accountReducer';
import { RootState } from '../../models/store';
import styles from './styles';

interface Props {}
interface UserInfo {
  name: string;
  phone: string;
  address: string;
}
const Profile = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ reValidateMode: 'onSubmit' });
  const account = useSelector((state: RootState) => state.accountReducer);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    address: '',
  });
  const dispatch = useDispatch();

  const setFormValue = (userDetail: UserInfo) => {
    setValue('name', userDetail.name);
    setValue('phone', userDetail.phone);
    setValue('address', userDetail.address);
  };

  async function getUserInfo(token: string) {
    axios({
      url: '/user/me',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          const userResponse: UserInfo = res.data['data'];
          setFormValue(userResponse);
          setUserInfo(userResponse);
        }
      })
      .catch((err) =>
        Alert.alert('Lỗi', err.response.data['message'], [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => Actions.popTo('menu'),
          },
        ])
      );
  }

  async function getProfile() {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      return await getUserInfo(token);
    } else {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập/đăng ký', [
        {
          text: 'OK',
          style: 'cancel',
          onPress: () => Actions.push('login'),
        },
      ]);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const cancelEdit = () => {
    setFormValue(userInfo);
    setIsEdited(!isEdited);
  };

  const backToHome = () => {
    Actions.popTo('menu');
  };

  const handleSaveButton = async (editedInfo: UserInfo) => {
    const token = await AsyncStorage.getItem('@token');
    axios({
      url: `user/edit-detail/${account.id_userInfo}`,
      baseURL: `${api_url}`,
      method: 'put',
      headers: {
        'x-auth-token': token,
      },
      data: editedInfo,
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          setFormValue(res.data['data']);
          setUserInfo(res.data['data']);
          setIsEdited(!isEdited);
        }
      })
      .catch((err) =>
        Alert.alert('Lỗi', err.response.data['message'], [
          {
            text: 'OK',
            onPress: () => cancelEdit(),
            style: 'cancel',
          },
        ])
      );
  };

  const handleLogout = async () => {
    dispatch(accountLogout({}));
    await AsyncStorage.setItem('@token', '');
    Actions.push('menu');
  };

  const handleChangePassword = () => {};

  return (
    <AuthLayout>
      <LargeCardView title="Thông tin tài khoản">
        <NormalTextInput
          placeholderText="Email"
          iconName="at"
          onTextChange={() => {}}
          value={account.email}
          editable={false}
        />

        <Controller
          control={control}
          rules={{ required: true, minLength: 2, maxLength: 50 }}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Tên"
              iconName="user"
              onTextChange={onChange}
              value={value}
              editable={isEdited}
            />
          )}
          name="name"
          defaultValue=""
        />
        {errors.name && <SmallText title="Tên không đúng" />}

        <Controller
          control={control}
          rules={{ required: true, minLength: 2, maxLength: 50 }}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="SĐT"
              iconName="phone"
              onTextChange={onChange}
              value={value}
              editable={isEdited}
            />
          )}
          name="phone"
          defaultValue=""
        />
        {errors.phone && <SmallText title="SĐT không đúng" />}

        <Controller
          control={control}
          rules={{ required: true, minLength: 2, maxLength: 50 }}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Địa chỉ"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={isEdited}
            />
          )}
          name="address"
          defaultValue=""
        />
        {errors.address && <SmallText title="Địa chỉ không đúng" />}

        {isEdited ? (
          <>
            <BlueButton title="Lưu" pressed={handleSubmit(handleSaveButton)} />
            <LargeTextTouchable title="Hủy" pressed={() => cancelEdit()} />
          </>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <BlueButton
                title="Chỉnh sửa"
                pressed={() => {
                  setIsEdited(!isEdited);
                }}
              />
              <PinkButton title="Đổi mật khẩu" pressed={handleChangePassword} />
            </View>
            <PinkButton title="Đăng xuất" pressed={handleLogout} />
            <LargeTextTouchable
              title="Quay về màn hình chính"
              pressed={backToHome}
            />
          </>
        )}
      </LargeCardView>
    </AuthLayout>
  );
};

export default Profile;
