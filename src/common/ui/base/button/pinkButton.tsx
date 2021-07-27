import React from 'react';
import { Dimensions, Text, TouchableHighlight } from 'react-native';
import { Color } from '../../../util/enum';
import styles from './style';

interface Props {
  title: string;
  pressed: () => void;
}
const PinkButton = (props: Props) => {
  return (
    <TouchableHighlight
      style={styles.pinkButton}
      onPress={() => {
        props.pressed();
      }}
      underlayColor={Color['pink-p']}
      activeOpacity={1}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableHighlight>
  );
};

export default PinkButton;
