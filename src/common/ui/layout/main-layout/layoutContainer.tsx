import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import styles from './style';

interface Props {
  children: ReactNode;
}
const MainLayoutContainer = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.body}>{props.children}</View>
    </SafeAreaView>
  );
};

export default MainLayoutContainer;
