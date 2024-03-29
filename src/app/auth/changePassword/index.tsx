import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BlueButton } from '../../../common/ui/base/button';
import { SmallText } from '../../../common/ui/base/errorText';
import { PasswordTextInput } from '../../../common/ui/base/textInput';
import { LargeTextTouchable } from '../../../common/ui/base/touchableText';
import { SmallCardView } from '../../../common/ui/layout/auth-Layout';
import AuthLayoutContainer from '../../../common/ui/layout/auth-Layout/layoutContainer';
import { api_url } from '../../../common/util/constant';
import { AntDesign } from 'react-native-vector-icons';
import { Color } from '../../../common/util/enum';
import styles from './style';
import Toast from 'react-native-root-toast';
import { showToast } from '../../../common/util/common';

interface ChangePasswordInfo {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  const [oldPasswordVisible, setOldPasswordVisible] = useState<boolean>(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);

  const handleOldPasswordChange = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const handleNewPasswordChange = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleConfirmPasswordChange = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChangePasswordPress = async (
    changeDetail: ChangePasswordInfo
  ) => {
    if (changeDetail.oldPassword.trim() === changeDetail.newPassword.trim()) {
      return showToast('Mật khẩu mới không được giống mật khẩu cũ');
    } else if (
      changeDetail.newPassword.trim() !== changeDetail.confirmPassword.trim()
    ) {
      return showToast('Mật khẩu xác nhận không đúng');
    } else {
      const token = await AsyncStorage.getItem('@token');
      await axios({
        url: 'auth/change-password',
        baseURL: `${api_url}`,
        method: 'post',
        responseType: 'json',
        headers: {
          'x-auth-token': token,
        },
        data: changeDetail,
      })
        .then((res) => {
          if (res.data['code'] === 200) {
            setChangeSuccess(true);
            showToast('Thay đổi mật khẩu thành công');
          } else {
            showToast('Lỗi thay đổi mật khẩu');
          }
        })
        .catch((err) => {
          //Toast err
          showToast('Không thể thay đổi mật khẩu');
        });
    }
  };

  return (
    <AuthLayoutContainer>
      <SmallCardView title="Thay đổi mật khẩu">
        {changeSuccess ? (
          <>
            <AntDesign
              name="checkcircle"
              size={150}
              color={Color['light-blue']}
              style={styles.successIcon}
            />
            <Text style={styles.successText}>Thay đổi mật khẩu thành công</Text>
          </>
        ) : (
          <>
            <Controller
              control={control}
              rules={{ required: true, minLength: 8, maxLength: 30 }}
              render={({ field: { onChange, value } }) => (
                <PasswordTextInput
                  placeholderText="Mật khẩu cũ"
                  iconName="key"
                  onTextChange={onChange}
                  onVisibleChange={handleOldPasswordChange}
                  secure={oldPasswordVisible}
                  value={value}
                  editable={true}
                />
              )}
              name="oldPassword"
              defaultValue=""
            />
            {errors.oldPassword && (
              <SmallText title="Mật khẩu có độ dài 8-30 kí tự" />
            )}

            <Controller
              control={control}
              rules={{ required: true, minLength: 8, maxLength: 30 }}
              render={({ field: { onChange, value } }) => (
                <PasswordTextInput
                  placeholderText="Mật khẩu mới"
                  iconName="key"
                  onTextChange={onChange}
                  onVisibleChange={handleNewPasswordChange}
                  secure={newPasswordVisible}
                  value={value}
                  editable={true}
                />
              )}
              name="newPassword"
              defaultValue=""
            />
            {errors.newPassword && (
              <SmallText title="Mật khẩu có độ dài 8-30 kí tự" />
            )}

            <Controller
              control={control}
              rules={{ required: true, minLength: 8, maxLength: 30 }}
              render={({ field: { onChange, value } }) => (
                <PasswordTextInput
                  placeholderText="Nhập lại"
                  iconName="key"
                  onTextChange={onChange}
                  onVisibleChange={handleConfirmPasswordChange}
                  secure={confirmPasswordVisible}
                  value={value}
                  editable={true}
                />
              )}
              name="confirmPassword"
              defaultValue=""
            />
            {errors.confirmPassword && (
              <SmallText title="Mật khẩu có độ dài 8-30 kí tự" />
            )}

            <BlueButton
              title="Thay đổi"
              pressed={handleSubmit(handleChangePasswordPress)}
            />
          </>
        )}
        <LargeTextTouchable
          title="Trở về trang thông tin"
          pressed={() => Actions.popTo('profile')}
        />
      </SmallCardView>
    </AuthLayoutContainer>
  );
};

export default ChangePassword;
