import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { FontAwesome, Entypo } from 'react-native-vector-icons';
import { Color } from '../../../../util/enum';
import BlueRoundedButton from '../../../base/button/blueRoundedButton';
import PinkRoundedButton from '../../../base/button/pinkRoundedButton';
import styles from '../style';

interface Props {
  backPressed: () => void;
  homePressed: () => void;
}
const ReceiptBottomComponent = (props: Props) => {
  return (
    <View style={styles.bottomContainer}>
      <PinkRoundedButton
        iconName="chevron-left"
        pressed={() => props.backPressed()}
      />
      <BlueRoundedButton iconName="home" pressed={() => props.homePressed()} />
    </View>
  );
};

export default ReceiptBottomComponent;
