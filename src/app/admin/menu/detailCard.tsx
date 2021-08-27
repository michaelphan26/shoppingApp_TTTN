import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { SummaryInterface } from '../../../common/util/common';
import styles from './style';

interface Props {
  item: SummaryInterface;
  itemPressed: (item: SummaryInterface) => void;
}
const DetailCard = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.itemPressed(props.item)}>
      <View style={styles.detailContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {props.item.title}
        </Text>
        {props.item.count === 0 ? (
          <Text style={styles.countPink}>{props.item.count}</Text>
        ) : (
          <Text style={styles.countBlue}>{props.item.count}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DetailCard;
