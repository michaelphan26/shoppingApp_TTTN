import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { BlueButton } from '../button';
import PinkButton from '../button/pinkButton';
import { NormalTextInput } from '../textInput';
import styles from './style';

interface Props {
  alertVisible: boolean;
  title: string;
  okTitle: string;
  onOkPressed: () => void;
  onCancelPressed: () => void;
  name: string;
  nameChange: (textChange: string) => void;
}
const AdminAlert = (props: Props) => {
  return (
    <Modal transparent={true} animationType="fade" visible={props.alertVisible}>
      <TouchableWithoutFeedback onPress={() => props.onCancelPressed()}>
        <KeyboardAvoidingView
          style={styles.centeredView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={(-Dimensions.get('window').height * 20) / 100}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{props.title}</Text>
            <View style={styles.bodyContainer}>
              <Text style={styles.text}>Tên:</Text>
              <NormalTextInput
                placeholderText="Tên"
                onTextChange={(text) => props.nameChange(text)}
                value={props.name}
                editable={true}
              />
            </View>
            <View style={styles.bottomContainer}>
              <BlueButton
                title={props.okTitle}
                pressed={() => props.onOkPressed()}
              />
              <PinkButton title="Hủy" pressed={() => props.onCancelPressed()} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AdminAlert;
