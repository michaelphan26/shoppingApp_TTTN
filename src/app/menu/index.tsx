import React, { useState } from 'react';
import MainLayout from '../../common/ui/layout/main-layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import HeadComponent from './components/headComponent';
import axios from 'axios';
import { api_url } from '../../common/util/constant';
import { useEffect } from 'react';
import BodyComponent from './components/bodyComponent';

interface Props {}
const Menu = (props: Props) => {
  const [search, setSearch] = useState('');

  const handleTextChange = (searchText: string) => {
    setSearch(searchText);
  };

  // const getProduct = () => {
  //   axios({
  //     url: '/product/product-list',
  //     method: 'get',
  //     baseURL: `${api_url}`,
  //     responseType: 'json',
  //   }).then((res) => {
  //     console.log(res.data['data']);
  //   });
  // };

  // useEffect(() => {
  //   getProduct();
  // }, []);

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (!token) {
      Actions.push('login');
    } else {
      Actions.push('profile');
    }
  };

  return (
    <MainLayout>
      <HeadComponent
        onTextChange={handleTextChange}
        search={search}
        profilePressed={handleProfilePress}
      />
      <BodyComponent searchText={search} />
    </MainLayout>
  );
};

export default Menu;
