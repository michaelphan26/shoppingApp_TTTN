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
        <Text style={styles.title} numberOfLines={2}>
          {props.item.title.replace(/\\n/g, '\n')}
        </Text>
        {props.item.count === 0 && props.item.count !== null ? (
          <Text style={styles.countPink}>{props.item.count}</Text>
        ) : (
          <Text style={styles.countBlue}>{props.item.count}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DetailCard;
