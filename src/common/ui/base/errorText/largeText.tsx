import React from 'react';
import { Text } from 'react-native';
import styles from './style';

interface Props {
  title: string;
}
const LargeText = (props: Props) => {
  return <Text style={styles.largeText}>{props.title}</Text>;
};

export default LargeText;
