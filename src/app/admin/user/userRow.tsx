import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../../../common/ui/base/searchRow/style';
import {
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
  item: UserItem;
  onEditPressed: (
    userItem: UserItem,
    userDetail: UserDetailItem,
    id_role: string
  ) => void;
}
const UserRow = (props: Props) => {
  const [userDetail, setUserDetail] = useState<UserDetailItem>(
    initialUserDetailItem
  );
  const [roleInfo, setRoleInfo] = useState<JustNameItem>(initialJustNameItem);

  async function getUserDetail() {
    const userDetailFromAPI = await getUserInfoByIDFromAPI(props.item._id);
    if (typeof userDetailFromAPI != 'string') {
      setUserDetail(userDetailFromAPI);
    } else {
      //Toast
    }
  }

  async function getRoleInfo() {
    const roleInfo = await getRoleInfoFromAPI(props.item.id_role);
    if (typeof roleInfo != 'string') {
      setRoleInfo(roleInfo);
    } else {
      //Toast
    }
  }

  useEffect(() => {
    getUserDetail();
    getRoleInfo();
  }, []);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{userDetail?.name}</Text>
        <Text style={styles.detailText}>{props.item.email}</Text>
        <Text style={styles.detailText}>{roleInfo?.name}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          onPress={() =>
            props.onEditPressed(props.item, userDetail, roleInfo?._id)
          }
        >
          <Entypo name="edit" size={25} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default UserRow;
