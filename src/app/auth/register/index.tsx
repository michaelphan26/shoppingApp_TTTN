import React, { useState } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { Alert, View } from 'react-native';
import Button, { BlueButton } from '../../../common/ui/base/button';
import { SmallText } from '../../../common/ui/base/errorText';
import {
  NormalTextInput,
  PasswordTextInput,
} from '../../../common/ui/base/textInput';
import AuthLayout from '../../../common/ui/layout/authLayout';
import { emailReg, phoneReg } from '../../../common/util/common';
import {
  LargeTextTouchable,
  SmallTextTouchable,
} from '../../../common/ui/base/touchableText';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { api_url } from '../../../common/util/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { accountLogin } from '../../../models/accountReducer';
import { LargeCardView } from '../../../common/ui/base/cardView';

interface RegisterInfo {
  email: '';
  password: '';
  name: '';
  phone: '';
  address: '';
}
const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleVisibleChange = () => {
    setVisible(!visible);
  };

  const handleRegisterPress = (info: RegisterInfo): void => {
    axios({
      url: '/auth/register',
      method: 'post',
      baseURL: `${api_url}`,
      data: info,
      responseType: 'json',
    })
      .then(async (res) => {
        console.log(res.data);
        if (res.data['code'] === 200) {
          await AsyncStorage.setItem('@token', res.headers['x-auth-token']);
          dispatch(accountLogin(res.data['data']));
          Actions.push('menu');
        }
      })
      .catch((err) =>
        Alert.alert('Lỗi đăng ký', err.response.data['message'], [
          {
            text: 'OK',
            style: 'cancel',
          },
        ])
      );
  };

  const handleBackToLogin = () => {
    Actions.pop();
  };

  return (
    <AuthLayout>
      <LargeCardView title="Đăng ký">
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Email"
              iconName="at"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, pattern: emailReg }}
          defaultValue=""
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
              onVisibleChange={handleVisibleChange}
              secure={visible}
              value={value}
            />
          )}
          rules={{ required: true, minLength: 8, maxLength: 30 }}
          name="password"
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
        />
        {errors.address && <SmallText title="Địa chỉ không đúng" />}

        <BlueButton
          title="Đăng ký"
          pressed={handleSubmit(handleRegisterPress)}
        />
        <LargeTextTouchable
          title="Quay về đăng nhập"
          pressed={handleBackToLogin}
        />
      </LargeCardView>
    </AuthLayout>
  );
};

export default Register;
