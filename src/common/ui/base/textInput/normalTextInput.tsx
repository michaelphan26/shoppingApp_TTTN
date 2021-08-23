import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './style';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Color } from '../../../util/enum';

interface Props {
  placeholderText: string;
  iconName: string;
  onTextChange: (textChange: string) => void;
  value: string;
  editable: boolean;
}
const NormalTextInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name={props.iconName}
        size={16}
        color="black"
        style={{ marginLeft: 5, marginRight: 10 }}
      />
      <TextInput
        style={styles.normalInput}
        placeholder={props.placeholderText}
        onChangeText={(text) => props.onTextChange(text)}
        value={props.value}
        editable={props.editable}
        placeholderTextColor={Color['medium-gray']}
      />
    </View>
  );
};

export default NormalTextInput;
