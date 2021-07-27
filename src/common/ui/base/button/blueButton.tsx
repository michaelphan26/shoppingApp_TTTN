import React from 'react';
import { Dimensions, Text, TouchableHighlight } from 'react-native';
import { Color } from '../../../util/enum';
import styles from './style';

interface Props {
  title: string;
  pressed: () => void;
}
const BlueButton = (props: Props) => {
  return (
    <TouchableHighlight
      style={styles.blueButton}
      onPress={() => {
        props.pressed();
      }}
      underlayColor={Color['light-blue-p']}
      activeOpacity={1}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableHighlight>
  );
};

export default BlueButton;
