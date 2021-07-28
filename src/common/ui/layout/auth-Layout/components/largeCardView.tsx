import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import styles from '../style';

interface Props {
  children: ReactNode;
  title: string;
}
const LargeCardView = (props: Props) => {
  return (
    <View style={styles.largeContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <View>{props.children}</View>
    </View>
  );
};

export default LargeCardView;
