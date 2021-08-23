import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './style';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Color } from '../../../util/enum';

interface Props {
  placeholderText: string;
  iconName: string;
  secure: boolean;
  onTextChange: (passwordChange: string) => void;
  onVisibleChange: () => void;
  value: string;
  editable: boolean;
}
const PasswordTextInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name={props.iconName}
        size={16}
        color="black"
        style={{ marginLeft: 5, marginRight: 10 }}
      />
      <TextInput
        style={styles.passwordInput}
        placeholder={props.placeholderText}
        secureTextEntry={!props.secure}
        onChangeText={(text) => props.onTextChange(text)}
        value={props.value}
        editable={props.editable}
        placeholderTextColor={Color['medium-gray']}
      />
      <TouchableWithoutFeedback onPress={() => props.onVisibleChange()}>
        <View style={styles.eyeContainer}>
          {!props.secure ? (
            <FontAwesome5 name="eye" size={20} color="black" />
          ) : (
            <FontAwesome5 name="eye-slash" size={20} color="black" />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PasswordTextInput;
