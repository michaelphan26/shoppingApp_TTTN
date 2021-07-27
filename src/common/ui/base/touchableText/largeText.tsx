import React from 'react';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import styles from './style';

interface Props {
  title: string;
}
const LargeText = (props: Props) => {
  return (
    <TouchableWithoutFeedback>
      <Text style={styles.largeText}>{props.title}</Text>
    </TouchableWithoutFeedback>
  );
};

export default LargeText;
