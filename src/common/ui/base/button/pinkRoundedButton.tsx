import React from 'react';
import { TouchableHighlight } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Color } from '../../../util/enum';
import styles from './style';

interface Props {
  iconName: string;
  pressed: () => void;
}
const PinkRoundedButton = (props: Props) => {
  return (
    <TouchableHighlight
      underlayColor={Color['pink-p']}
      style={styles.circlePink}
      onPress={() => props.pressed()}
    >
      <FontAwesome name={props.iconName} size={26} color={Color.white} />
    </TouchableHighlight>
  );
};

export default PinkRoundedButton;
