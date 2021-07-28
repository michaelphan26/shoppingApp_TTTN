import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

interface Props {
  children: ReactNode;
}
const AuthLayoutContainer = (props: Props) => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

export default AuthLayoutContainer;
