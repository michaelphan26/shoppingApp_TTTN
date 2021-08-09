import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import styles from './style';

interface Props {
  children: ReactNode;
  title: String;
}
const MainLayout = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.body}>{props.children}</View>
    </SafeAreaView>
  );
};

export default MainLayout;
