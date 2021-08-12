import React, { ReactNode } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { FontAwesome } from 'react-native-vector-icons';

interface Props {
  title: string;
  backPressed: () => void;
  children: ReactNode;
}
const CartLayout = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => props.backPressed()}>
          <FontAwesome
            name="chevron-left"
            size={20}
            style={styles.backButton}
          />
        </TouchableWithoutFeedback>

        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.body}>{props.children}</View>
    </SafeAreaView>
  );
};

export default CartLayout;
