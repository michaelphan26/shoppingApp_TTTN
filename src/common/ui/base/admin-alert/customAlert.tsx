import React from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
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
}
const CustomAlert = (props: Props) => {
  return (
    <Modal transparent={true} animationType="fade" visible={props.alertVisible}>
      <TouchableWithoutFeedback onPress={() => props.onCancelPressed()}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{props.title}</Text>
            <View style={styles.bodyContainer}>
              <Text style={styles.deleteText}>Bạn có chắc chắn muốn xóa?</Text>
            </View>
            <View style={styles.bottomContainer}>
              <BlueButton
                title={props.okTitle}
                pressed={() => props.onOkPressed()}
              />
              <PinkButton title="Hủy" pressed={() => props.onCancelPressed()} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomAlert;
