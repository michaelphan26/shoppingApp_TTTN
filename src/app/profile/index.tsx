import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../common/ui/base/button';
import PinkButton from '../../common/ui/base/button/pinkButton';
import { LargeCardView } from '../../common/ui/layout/auth-Layout';
import { SmallText } from '../../common/ui/base/errorText';
import { NormalTextInput } from '../../common/ui/base/textInput';
import { LargeTextTouchable } from '../../common/ui/base/touchableText';
import AuthLayoutContainer from '../../common/ui/layout/auth-Layout/layoutContainer';
import { api_url } from '../../common/util/constant';
import { accountLogout } from '../../models/accountReducer';
import { RootState } from '../../models/store';
import styles from './styles';
import {
  getUserInfoFromAPI,
  phoneReg,
  showToast,
  UserInfo,
} from '../../common/util/common';
import Toast from 'react-native-root-toast';

interface Props {}

const Profile = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
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
    clearErrors();
  };

  async function getUserInfo() {
    const userInfoFromAPI = await getUserInfoFromAPI();
    if (typeof userInfoFromAPI !== 'string') {
      setFormValue(userInfoFromAPI);
      setUserInfo(userInfoFromAPI);
    } else {
      //Toast string
      showToast('Không thể lấy thông tin tài khoản');
    }
  }

  async function checkProfile() {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      return await getUserInfo();
    } else {
      showToast('Bạn chưa đăng nhập/đăng ký');
    }
  }

  useEffect(() => {
    checkProfile();
  }, []);

  const cancelEdit = () => {
    setFormValue(userInfo);
    setIsEdited(!isEdited);
  };

  const backToHome = () => {
    Actions.popTo('menu');
    setTimeout(() => {
      Actions.refresh({ key: Math.random() });
    }, 10);
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
      .catch((err) => showToast('Không thể chỉnh sửa thông tin tài khoản'));
  };

  const handleLogout = async () => {
    dispatch(accountLogout({}));
    await AsyncStorage.setItem('@token', '');
    Actions.popTo('menu');
    setTimeout(() => {
      Actions.refresh({ key: Math.random() });
    }, 10);
    showToast('Đăng xuất thành công');
  };

  const handleChangePassword = () => {
    Actions.push('changePassword');
  };

  const handleReceiptList = () => {
    Actions.push('receipt', { userInfo: userInfo });
  };

  return (
    <AuthLayoutContainer>
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
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="SĐT"
              iconName="phone"
              onTextChange={onChange}
              value={value}
              editable={isEdited}
            />
          )}
          rules={{
            required: true,
            minLength: 10,
            maxLength: 11,
            pattern: phoneReg,
          }}
          name="phone"
          defaultValue=""
        />
        {errors.phone && <SmallText title="SĐT không đúng" />}

        <Controller
          control={control}
          rules={{ required: true, minLength: 5, maxLength: 100 }}
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
              <BlueButton title="Đổi mật khẩu" pressed={handleChangePassword} />
            </View>
            <View style={styles.buttonContainer}>
              <PinkButton title="DS hóa đơn" pressed={handleReceiptList} />
              <PinkButton title="Đăng xuất" pressed={handleLogout} />
            </View>

            <LargeTextTouchable
              title="Quay về màn hình chính"
              pressed={backToHome}
            />
          </>
        )}
      </LargeCardView>
    </AuthLayoutContainer>
  );
};

export default Profile;
