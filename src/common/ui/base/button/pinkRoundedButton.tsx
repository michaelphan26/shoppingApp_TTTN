import React from 'react';
import { Dimensions, Platform, TouchableHighlight } from 'react-native';
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
      <FontAwesome
        name={props.iconName}
        size={
          Platform.OS === 'android'
            ? (Dimensions.get('window').height * 4) / 100
            : (Dimensions.get('window').height * 3.5) / 100
        }
        color={Color.white}
      />
    </TouchableHighlight>
  );
};

export default PinkRoundedButton;
