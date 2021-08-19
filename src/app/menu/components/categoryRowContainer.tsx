import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from '../style';
import SquareItemView from '../../../common/ui/layout/main-layout/components/squareItemView';
import {
  JustNameItem,
  getProductByCategoryFromAPI,
  ProductItem,
} from '../../../common/util/common';
import Toast from 'react-native-simple-toast';

interface Props {
  categoryItem: JustNameItem;
  productPressed: (item: ProductItem, categoryName: string) => void;
  // children: ReactNode;
}
const CategoryRowContainer = (props: Props) => {
  const [productList, setProductList] = useState([] as any);

  const getProductListByCategory = async () => {
    const productListByCategory = await getProductByCategoryFromAPI(
      props.categoryItem._id
    );
    if (typeof getProductByCategoryFromAPI !== 'string') {
      setProductList(productListByCategory);
    } else {
      //Toast
      Toast.showWithGravity(
        'Không thể lấy danh sách sản phẩm',
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  useEffect(() => {
    getProductListByCategory();
  }, []);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleSmall}>{props.categoryItem.name}</Text>
      </View>
      <FlatList
        style={styles.bodyContainer}
        data={productList}
        renderItem={(item: ProductItem) => {
          return (
            <SquareItemView
              item={item.item}
              productPressed={(item) =>
                props.productPressed(item, props.categoryItem.name)
              }
            />
          );
        }}
        keyExtractor={(item) => item._id}
      />
      {/* <ScrollView
        style={styles.bodyContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {productlist.map((item: ProductItem) => {
          return (
            <SquareItemView
              key={item._id}
              item={item}
              productPressed={(item) =>
                props.productPressed(item, props.categoryItem.name)
              }
            />
          );
        })}
      </ScrollView> */}
    </View>
  );
};

export default CategoryRowContainer;
