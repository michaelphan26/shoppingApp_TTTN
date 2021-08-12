import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MainLayout from '../../../common/ui/layout/main-layout';
import DetailCard from './detailCard';
import styles from './style';
import manageList from '../../../common/util/manageList.json';
import { useState } from 'react';
import axios from 'axios';
import { api_url } from '../../../common/util/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { SummaryInterface } from '../../../common/util/common';
import { Actions } from 'react-native-router-flux';
import CartLayout from '../../../common/ui/layout/cart-layout';

interface Props {}
const AdminMenu = (props: Props) => {
  const [summaryObject, setSummaryObject] = useState([] as any);

  async function getSummaryObject() {
    const token = await AsyncStorage.getItem('@token');
    await axios({
      url: '/admin/summary',
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          setSummaryObject(res.data['data']);
        } else {
          //Toast
        }
      })
      .catch((err) => {
        console.log(err.response['message']);
      });
  }

  useEffect(() => {
    getSummaryObject();
  }, []);

  const handleItemPressed = (item: SummaryInterface) => {
    Actions.push(item.id);
  };

  return (
    <CartLayout
      title="Quản trị"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
      <FlatList
        style={{ width: Dimensions.get('window').width }}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        data={summaryObject}
        renderItem={(item: SummaryInterface) => {
          return (
            <DetailCard item={item.item} itemPressed={handleItemPressed} />
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </CartLayout>
  );
};

export default AdminMenu;
