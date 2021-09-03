import React, { useState } from 'react';
import MainLayout from '../../common/ui/layout/main-layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import HeadComponent from './components/headComponent';
import BodyComponent from './components/bodyComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/store';
import { useEffect } from 'react';

interface Props {}
const Menu = (props: Props) => {
  const [search, setSearch] = useState('');
  const account = useSelector((state: RootState) => state.accountReducer);

  async function resetToken() {
    const token = await AsyncStorage.getItem('@token');
    if (token && account._id === '') {
      await AsyncStorage.setItem('@token', '');
    }
  }

  useEffect(() => {
    resetToken();
  }, []);

  const handleTextChange = (searchText: string) => {
    setSearch(searchText);
  };

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (!token || account.email === '') {
      Actions.push('login');
    } else {
      Actions.push('profile');
    }
  };

  const handleAdminPress = async () => {
    if (
      account.role_name.toLowerCase() === 'admin' ||
      account.role_name.toLowerCase() === 'quản trị' ||
      account.role_name.toLowerCase() === 'quan tri'
    ) {
      Actions.push('adminMenu');
    }
  };

  return (
    <MainLayout title="Xin chào">
      <HeadComponent
        onTextChange={handleTextChange}
        search={search}
        profilePressed={handleProfilePress}
        adminPressed={handleAdminPress}
        isAdmin={
          account.role_name.toLowerCase() === 'admin' ||
          account.role_name.toLowerCase() === 'quản trị' ||
          account.role_name.toLowerCase() === 'quan tri'
            ? true
            : false
        }
      />
      <BodyComponent searchText={search} />
    </MainLayout>
  );
};

export default Menu;
