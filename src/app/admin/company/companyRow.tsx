import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../../../common/ui/base/searchRow/style';
import {
  CompanyInterface,
  getRoleInfoFromAPI,
  getUserInfoByIDFromAPI,
  initialJustNameItem,
  initialUserDetailItem,
  JustNameItem,
  UserDetailItem,
  UserItem,
} from '../../../common/util/common';
import { Entypo } from 'react-native-vector-icons';
import { useState } from 'react';
import { useEffect } from 'react';

interface Props {
  item: CompanyInterface;
  onEditPressed: (item: CompanyInterface) => void;
  onDeletePressed: (item: CompanyInterface) => void;
}
const CompanyRow = (props: Props) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{props.item.name}</Text>
        <Text style={styles.detailText}>{props.item.phone}</Text>
        <Text style={styles.detailText}>{props.item.address}</Text>
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

export default CompanyRow;