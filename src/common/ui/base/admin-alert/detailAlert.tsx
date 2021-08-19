import React, { ReactNode } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { BlueButton } from '../button';
import PinkButton from '../button/pinkButton';
import { NormalTextInput } from '../textInput';
import styles from './style';

interface Props {
  children: ReactNode;
  alertVisible: boolean;
  title: string;
  onCancelPressed: () => void;
}
const DetailAlert = (props: Props) => {
  return (
    <Modal transparent={true} animationType="fade" visible={props.alertVisible}>
      <TouchableWithoutFeedback onPress={() => props.onCancelPressed()}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{props.title}</Text>
            <View style={styles.bodyContainer}>{props.children}</View>
            <View style={styles.bottomContainer}>
              <PinkButton
                title="Quay lại"
                pressed={() => props.onCancelPressed()}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DetailAlert;
