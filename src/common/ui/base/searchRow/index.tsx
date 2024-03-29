import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './style';
import { Entypo } from 'react-native-vector-icons';
import { JustNameItem } from '../../../util/common';

interface Props {
  item: JustNameItem;
  onEditPressed: (item: JustNameItem) => void;
  onDeletePressed: (item: JustNameItem) => void;
}
const SearchRow = (props: Props) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText} numberOfLines={1}>
          {props.item.name}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          onPress={() => props.onEditPressed(props.item)}
        >
          <Entypo name="edit" size={25} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.onDeletePressed(props.item)}
        >
          <Entypo name="trash" size={25} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SearchRow;
