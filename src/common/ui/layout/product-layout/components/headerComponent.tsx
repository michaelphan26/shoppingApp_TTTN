import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../style';
import { Entypo } from 'react-native-vector-icons';
import { Color } from '../../../../util/enum';

interface Props {
  title: string;
}
const HeaderComponent = (props: Props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default HeaderComponent;
