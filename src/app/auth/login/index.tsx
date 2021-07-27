import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import Button from '../../../common/ui/base/button';
import CardView from '../../../common/ui/base/cardView';
import {
  NormalTextInput,
  PasswordTextInput,
} from '../../../common/ui/base/textInput';
import styles from '../../../common/ui/base/textInput/style';
import { SmallText } from '../../../common/ui/base/errorText';
import { LargeText } from '../../../common/ui/base/touchableText';
import AuthLayout from '../../../common/ui/layout/authLayout';
import axios from 'axios';
import { api_url } from '../../../common/util/constant';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { accountLogin } from '../../../models/accountReducer';

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
      url: `/auth/login`,
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
          Actions.push('menu');
        }
      })
      .catch((err) =>
        Alert.alert('Login error', err.response.data['message'], [
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

  return (
    <AuthLayout>
      <CardView title="Đăng nhập">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <NormalTextInput
              placeholderText="Email"
              iconName="at"
              onTextChange={onChange}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <SmallText title="Tài khoản không được để trống" />}

        <Controller
          control={control}
          rules={{ required: true, minLength: 8, maxLength: 30 }}
          render={({ field: { onChange } }) => (
            <PasswordTextInput
              placeholderText="Password"
              iconName="key"
              secure={visible}
              onTextChange={onChange}
              onVisibleChange={handleChangeVisible}
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && <SmallText title="Mật khẩu có độ dài 8-30 kí tự" />}

        <Button title="Đăng nhập" pressed={handleSubmit(handleLoginPress)} />
        <LargeText title="Đăng ký" />
      </CardView>
    </AuthLayout>
  );
};

export default Login;
