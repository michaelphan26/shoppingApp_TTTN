import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './style';
import { FontAwesome5 } from 'react-native-vector-icons';

interface Props {
  placeholderText: string;
  iconName: string;
  onTextChange: (textChange: string) => void;
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
      />
    </View>
  );
};

export default NormalTextInput;
