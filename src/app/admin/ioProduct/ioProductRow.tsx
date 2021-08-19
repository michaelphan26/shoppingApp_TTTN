import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './style';
import { Entypo } from 'react-native-vector-icons';
import { ioProductInterface } from '../../../common/util/common';

interface Props {
  item: ioProductInterface;
  onDetailPressed: (item: ioProductInterface) => void;
}
const IOProductRow = (props: Props) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{props.item.date}</Text>
        <Text style={styles.detailText}>{props.item._id}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          onPress={() => props.onDetailPressed(props.item)}
        >
          <Entypo name="chevron-right" size={25} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default IOProductRow;
