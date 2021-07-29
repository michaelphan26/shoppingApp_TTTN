import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductItem } from '../../../util/common';
import BottomComponent from './components/bottomComponent';
import HeaderComponent from './components/headerComponent';
import styles from './style';

interface Props {
  title: string;
  children: ReactNode;
}
const ProductLayout = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent title={props.title} />
      </View>
      <View style={styles.body}>{props.children}</View>
    </SafeAreaView>
  );
};

export default ProductLayout;
