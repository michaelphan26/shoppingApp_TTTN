import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import styles from './style';

interface Props {
  children: ReactNode;
}
const MainLayout = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Xin chào</Text>
      <View style={styles.body}>{props.children}</View>
    </SafeAreaView>
  );
};

export default MainLayout;