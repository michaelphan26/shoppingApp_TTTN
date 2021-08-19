import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import CategoryRowContainer from './categoryRowContainer';
import styles from '../style';
import ProductRowContainer from '../../../common/ui/layout/main-layout/components/productRowContainer';
import {
  CategoryItem,
  getCategoryListFromAPI,
  getCategoryNameFromAPI,
  getProductListFromAPI,
  ProductItem,
} from '../../../common/util/common';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../models/cartReducer';
import Toast from 'react-native-simple-toast';

interface Props {
  searchText: string;
}
const BodyComponent = (props: Props) => {
  const [categoryList, setCategoryList] = useState([] as any);
  const [productList, setProductList] = useState([] as any);
  const dispatch = useDispatch();

  const getProductList = async () => {
    const productListFromAPI = await getProductListFromAPI();
    if (typeof productListFromAPI !== 'string') {
      setProductList(productListFromAPI);
    } else {
      //Toast string
      Toast.showWithGravity(
        'Không thể lấy danh sách sản phẩm',
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  const getCategory = async () => {
    const categoryListFromAPI = await getCategoryListFromAPI();
    if (typeof categoryListFromAPI !== 'string') {
      setCategoryList(categoryListFromAPI);
    } else {
      //Toast
      Toast.showWithGravity(
        'Không thể lấy danh sách danh mục',
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  const handleProductPressed = (
    item: ProductItem,
    categoryName: string
  ): void => {
    Actions.push('product', { item: item, categoryName: categoryName });
  };

  const handleSearchPressed = async (item: ProductItem): Promise<void> => {
    const categoryName = await getCategoryNameFromAPI(item);
    Actions.push('product', {
      item: item,
      categoryName: categoryName,
    });
  };

  const handleAddToCart = async (item: ProductItem): Promise<void> => {
    const token = await AsyncStorage.getItem('@token');
    dispatch(
      addToCart({
        cartItem: {
          id_product: item._id,
          price: item.price,
          discount: item.discount,
          quantity: 1,
        },
        token: token,
      })
    );
  };

  useEffect(() => {
    getCategory();
    getProductList();
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      data={
        !props.searchText
          ? categoryList
          : productList.filter((item: ProductItem) => {
              return (
                item.name
                  .toLowerCase()
                  .startsWith(props.searchText.trim().toLowerCase()) ||
                item.brand
                  .toLowerCase()
                  .startsWith(props.searchText.trim().toLowerCase())
              );
            })
      }
      renderItem={
        !props.searchText
          ? (item: CategoryItem) => {
              return (
                <CategoryRowContainer
                  categoryItem={item.item}
                  key={item.item._id}
                  productPressed={handleProductPressed}
                />
              );
            }
          : (item: ProductItem) => {
              return (
                <ProductRowContainer
                  item={item.item}
                  key={item.item._id}
                  addToCart={handleAddToCart}
                  productPressed={handleSearchPressed}
                />
              );
            }
      }
      keyExtractor={
        !props.searchText
          ? (item: CategoryItem) => item._id
          : (item: ProductItem) => item._id
      }
    />

    //   {!props.searchText
    //     ? categoryList.map((item: CategoryItem) => {
    //         return (
    //           <CategoryRowContainer
    //             categoryItem={item}
    //             key={item._id}
    //             productPressed={handleProductPressed}
    //           />
    //         );
    //       })
    //     : productList
    //         .filter((item: ProductItem) => {
    //           return (
    //             item.name
    //               .toLowerCase()
    //               .startsWith(props.searchText.trim().toLowerCase()) ||
    //             item.brand
    //               .toLowerCase()
    //               .startsWith(props.searchText.trim().toLowerCase())
    //           );
    //         })
    //         .map((item: ProductItem) => {
    //           return (
    //             <ProductRowContainer
    //               item={item}
    //               key={item._id}
    //               addToCart={handleAddToCart}
    //               productPressed={handleSearchPressed}
    //             />
    //           );
    //         })}
    // </ScrollView>
  );
};

export default BodyComponent;
