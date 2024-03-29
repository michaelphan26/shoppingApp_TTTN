import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  NormalTextInput,
  PasswordTextInput,
} from '../../../common/ui/base/textInput';
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
import {
  addReceiptAPI,
  emailReg,
  getCartFromAPI,
  showToast,
} from '../../../common/util/common';
import { SmallCardView } from '../../../common/ui/layout/auth-Layout';
import { BlueButton } from '../../../common/ui/base/button';
import { loadCart } from '../../../models/cartReducer';
import { RootState } from '../../../models/store';
import Toast from 'react-native-root-toast';

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
  const account = useSelector((state: RootState) => state.accountReducer);

  async function checkToken() {
    const token = await AsyncStorage.getItem('@token');
    if (token && account.email !== '') {
      Actions.push('menu');
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  const handleLoginPress = async (info: LoginInfo) => {
    await axios({
      url: '/auth/login',
      baseURL: `${api_url}`,
      method: 'post',
      data: info,
      responseType: 'json',
    })
      .then(async (res) => {
        if (res.data['code'] === 200) {
          await AsyncStorage.setItem('@token', res.headers['x-auth-token']);
          await dispatch(accountLogin(res.data['data']));
          //Check cart
          if (cart.productList.length === 0) {
            const cartFromAPI = await getCartFromAPI();
            if (typeof cartFromAPI !== 'string') {
              dispatch(loadCart(cartFromAPI));
            } else {
              //Toast
              showToast('Không thể lấy giỏ hàng');
            }
          } else {
            await addReceiptAPI(cart);
          }
          Actions.pop();
          setTimeout(() => {
            Actions.refresh({ key: Math.random() });
          }, 10);
          showToast('Đăng nhập thành công');
        } else {
          //Toast res.data['message']
          showToast('Đăng nhập không thành công');
        }
      })
      .catch((err) => showToast('Đăng nhập không thành công'));
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
              editable={true}
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
          pressed={() => {
            Actions.popTo('menu');
            setTimeout(() => {
              Actions.refresh({ key: Math.random() });
            }, 10);
          }}
        />
      </SmallCardView>
    </AuthLayoutContainer>
  );
};

export default Login;
