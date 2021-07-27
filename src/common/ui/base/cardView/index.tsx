import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import styles from './style';

interface Props {
  children: ReactNode;
  title: string;
}
const CardView = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View>{props.children}</View>
    </View>
  );
};

export default CardView;
