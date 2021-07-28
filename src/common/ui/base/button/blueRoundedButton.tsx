import React from 'react';
import { TouchableHighlight } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Color } from '../../../util/enum';
import styles from './style';

interface Props {
  iconName: string;
  pressed: () => void;
}
const BlueRoundedButton = (props: Props) => {
  return (
    <TouchableHighlight
      underlayColor={Color['light-blue-p']}
      style={styles.circleBlue}
      onPress={() => props.pressed()}
    >
      <FontAwesome name={props.iconName} size={30} color={Color.white} />
    </TouchableHighlight>
  );
};

export default BlueRoundedButton;
