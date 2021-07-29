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
import AuthLayoutContainer from '../../../common/ui/layout/auth-Layout/layoutContainer';
import axios from 'axios';
import { api_url } from '../../../common/util/constant';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountLogin } from '../../../models/accountReducer';
import { emailReg } from '../../../common/util/common';
import { SmallCardView } from '../../../common/ui/layout/auth-Layout';
import { BlueButton } from '../../../common/ui/base/button';
import { loadCart } from '../../../models/cartReducer';
import { RootState } from '../../../models/store';

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
  const cart = useSelector((state: RootState) => state.cartReducer);

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
          await AsyncStorage.setItem('@token', res.headers['x-auth-token']);
          dispatch(accountLogin(res.data['data']));
          //Check cart
          if (cart.productList.length === 0) {
            axios({
              url: `/receipt/get-cart`,
              baseURL: `${api_url}`,
              method: 'get',
              responseType: 'json',
              headers: {
                'x-auth-token': res.headers['x-auth-token'],
              },
            })
              .then((res) => {
                if (res.data['code'] === 200) {
                  dispatch(loadCart(res.data['data']));
                }
              })
              .catch((err) => {
                console.log(err.response.data['message']);
              });
          } else {
            axios({
              url: `/receipt/add-receipt`,
              baseURL: `${api_url}`,
              method: 'post',
              headers: {
                'x-auth-token': res.headers['x-auth-token'],
              },
              responseType: 'json',
              data: { productList: cart.productList, total: cart.total },
            })
              .then((res) => {
                if (res.data['code'] === 200) {
                  dispatch(loadCart(res.data['data']));
                }
              })
              .catch((err) => {
                console.log(err.response.data['message']);
              });
          }
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
    <AuthLayoutContainer>
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
    </AuthLayoutContainer>
  );
};

export default Login;
