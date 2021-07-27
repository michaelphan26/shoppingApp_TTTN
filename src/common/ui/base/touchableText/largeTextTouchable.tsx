import React from 'react';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import styles from './style';

interface Props {
  title: string;
  pressed: () => void;
}
const LargeTextTouchable = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.pressed()}>
      <Text style={styles.largeText}>{props.title}</Text>
    </TouchableWithoutFeedback>
  );
};

export default LargeTextTouchable;
