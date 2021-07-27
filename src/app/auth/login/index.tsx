import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import {
  NormalTextInput,
  PasswordTextInput,
} from '../../../common/ui/base/textInput';
import styles from '../../../common/ui/base/textInput/style';
import { SmallText } from '../../../common/ui/base/errorText';
import { LargeTextTouchable } from '../../../common/ui/base/touchableText';
import AuthLayout from '../../../common/ui/layout/authLayout';
import axios from 'axios';
import { api_url } from '../../../common/util/constant';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { accountLogin } from '../../../models/accountReducer';
import { emailReg } from '../../../common/util/common';
import { SmallCardView } from '../../../common/ui/base/cardView';
import { BlueButton } from '../../../common/ui/base/button';

interface LoginInfo {
  email: string;
  password: string;
}
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  async function checkToken() {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      Actions.push('menu');
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  const handleLoginPress = (info: LoginInfo): void => {
    axios({
      url: '/auth/login',
      baseURL: `${api_url}`,
      method: 'post',
      data: info,
      responseType: 'json',
    })
      .then(async (res) => {
        console.log(res.data);
        console.log(res.data['code']);
        if (res.data['code'] === 200) {
          const saveToken = await AsyncStorage.setItem(
            '@token',
            res.headers['x-auth-token']
          );
          dispatch(accountLogin(res.data['data']));
          Actions.pop();
          Actions.push('profile');
        }
      })
      .catch((err) =>
        Alert.alert('Lỗi đăng nhập', err.response.data['message'], [
          {
            text: 'OK',
            style: 'cancel',
          },
        ])
      );
  };

  const handleChangeVisible = (): void => {
    setVisible(!visible);
  };

  const handleRegisterPress = () => {
    Actions.push('register');
  };

  return (
    <AuthLayout>
      <SmallCardView title="Đăng nhập">
        <Controller
          control={control}
          rules={{ required: true, pattern: emailReg }}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Email"
              iconName="at"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <SmallText title="Email không đúng định dạng" />}

        <Controller
          control={control}
          rules={{ required: true, minLength: 8, maxLength: 30 }}
          render={({ field: { onChange, value } }) => (
            <PasswordTextInput
              placeholderText="Password"
              iconName="key"
              secure={visible}
              onTextChange={onChange}
              onVisibleChange={handleChangeVisible}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && <SmallText title="Mật khẩu có độ dài 8-30 kí tự" />}

        <BlueButton
          title="Đăng nhập"
          pressed={handleSubmit(handleLoginPress)}
        />
        <LargeTextTouchable title="Đăng ký" pressed={handleRegisterPress} />
        <LargeTextTouchable
          title="Trở về trang chủ"
          pressed={() => Actions.pop()}
        />
      </SmallCardView>
    </AuthLayout>
  );
};

export default Login;
