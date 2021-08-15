import React, { ReactNode } from 'react';
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
  children: ReactNode;
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
            <View style={styles.bodyContainer}>{props.children}</View>
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
