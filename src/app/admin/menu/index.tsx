import React from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MainLayout from '../../../common/ui/layout/main-layout';
import DetailCard from './detailCard';
import styles from './style';
import manageList from '../../../common/util/manageList.json';

interface Props {}
const AdminMenu = (props: Props) => {
  return (
    <MainLayout title="Quản trị">
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        data={manageList.manageList}
        renderItem={() => {
          return <DetailCard />;
        }}
        numColumns={2}
      />
    </MainLayout>
  );
};

export default AdminMenu;
