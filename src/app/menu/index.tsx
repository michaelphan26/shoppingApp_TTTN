import React, { useState } from 'react';
import MainLayout from '../../common/ui/layout/main-layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import HeadComponent from './components/headComponent';
import axios from 'axios';
import { api_url } from '../../common/util/constant';
import { useEffect } from 'react';

interface Props {}
const Menu = (props: Props) => {
  const [search, setSearch] = useState('');

  const handleTextChange = (searchText: string) => {
    setSearch(searchText);
  };

  const getProduct = () => {
    axios({
      url: '/product/product-list',
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
    }).then((res) => {
      console.log(res.data['data']);
    });
  };

  const getCategory = () => {
    axios({
      url: '/category/category-list',
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
    }).then((res) => {
      console.log(res.data['data']);
    });
  };

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem('@token');
    console.log(token);
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
    </MainLayout>
  );
};

export default Menu;
