import React from 'react';
import { Dimensions, Text, TouchableHighlight } from 'react-native';
import styles from './style';

interface Props {
  title: string;
  pressed: () => void;
}
const Button = (props: Props) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        props.pressed();
      }}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
