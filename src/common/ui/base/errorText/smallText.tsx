import React from 'react';
import { Text } from 'react-native';
import styles from './style';

interface Props {
  title: string;
}
const SmallText = (props: Props) => {
  return <Text style={styles.smallText}>{props.title}</Text>;
};

export default SmallText;
