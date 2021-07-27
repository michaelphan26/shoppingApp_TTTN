import React from 'react';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './style';

interface Props {
  title: string;
}
const SmallTextTouchable = (props: Props) => {
  return (
    <TouchableWithoutFeedback>
      <Text style={styles.smallText}>{props.title}</Text>
    </TouchableWithoutFeedback>
  );
};

export default SmallTextTouchable;
