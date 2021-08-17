import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AdminAlert, CustomAlert } from '../../../common/ui/base/admin-alert';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import MainLayout from '../../../common/ui/layout/main-layout';
import ProductRowItemNoCart from '../../../common/ui/layout/main-layout/components/productRowContainerNoCart';
import {
  addProductAPI,
  editProductAPI,
  getCategoryListFromAPI,
  getCompanyListFromAPI,
  getIOTypeFromAPI,
  getProductListFromAPI,
  initialIOProductItem,
  initialJustNameItem,
  initialProductItem,
  ioProductItem,
  ProductItem,
} from '../../../common/util/common';
import { Color } from '../../../common/util/enum';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { SmallText } from '../../../common/ui/base/errorText';
import { ScrollView } from 'react-native-gesture-handler';
import NumberTextInput from '../../../common/ui/base/textInput/numberTextInput';
import RNPickerSelect from 'react-native-picker-select';
import { BlueButton } from '../../../common/ui/base/button';
import * as ImagePicker from 'expo-image-picker';
import IOProductSelect from './ioProductSelect';
import { SegmentedControlIOSComponent } from 'react-native';

interface Props {}
const AdminIOProduct = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');
  const [productList, setProductList] = useState([] as any);
  const [io, setIO] = useState({ label: '', value: '' });
  const [ioTypeList, setIOTypeList] = useState([] as any);
  const [ioProductList, setIOProductList] = useState([] as any);
  const [companyList, setCompanyList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');
  const [product, setProduct] = useState<ProductItem>(initialProductItem);
  const [imageBase64, setImageBase64] = useState<string | undefined>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  async function getCompanyList() {
    const companyListFromAPI = await getCompanyListFromAPI();
    let tempList = [] as any;
    for (const index in companyListFromAPI) {
      tempList.push({
        label: companyListFromAPI[index].name,
        value: companyListFromAPI[index]._id,
      });
    }
    setCompanyList(tempList);
  }

  async function getProductList() {
    const productListFromAPI = await getProductListFromAPI();
    let tempList = [] as any;
    for (const index in productListFromAPI) {
      tempList.push({
        label: productListFromAPI[index].name,
        value: productListFromAPI[index]._id,
      });
    }
    setProductList(tempList);
  }

  async function getIOTypeList() {
    const ioTypeListFromAPI = await getIOTypeFromAPI();
    let tempList = [] as any;
    for (const index in ioTypeListFromAPI) {
      tempList.push({
        label: ioTypeListFromAPI[index].name,
        value: ioTypeListFromAPI[index]._id,
      });
    }
    setIOTypeList(tempList);
  }

  useEffect(() => {
    getProductList();
    getIOTypeList();
    getCompanyList();
  }, []);

  const handleAddPressed = () => {
    setModalVisible(true);
    setAction('Add');
  };

  const handleEditPressed = (item: ProductItem) => {
    setModalVisible(true);
    setAction('Edit');
    setProduct(item);
    reset({
      brand: item.brand,
      name: item.name,
      price: item.price.toString(),
      description: item.description.toString(),
      discount: item.discount.toString(),
      id_category: item.id_category,
    });
    setImageBase64(item.image);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDeleteVisible(false);
    setProduct(initialProductItem);
    reset(initialProductItem);
    setImageBase64('');
  };

  const handleAddIOProduct = () => {
    console.log(ioProductList);
  };

  const handleSaveProduct = async (info: ProductItem) => {};

  const handleDeleteProduct = async () => {};

  const handleAddIOProductItem = () => {
    setIOProductList([...ioProductList, initialIOProductItem]);
  };

  const handleValueChange = (index: number, value: string, type: string) => {
    switch (type) {
      case 'product': {
        setIOProductList(
          ioProductList.map((item: ioProductItem, itemIndex: number) =>
            itemIndex !== index
              ? item
              : {
                  ...item,
                  id_product: value,
                }
          )
        );
        break;
      }
      case 'company': {
        setIOProductList(
          ioProductList.map((item: ioProductItem, itemIndex: number) =>
            itemIndex !== index
              ? item
              : {
                  ...item,
                  id_company: value,
                }
          )
        );
        break;
      }
      case 'price': {
        setIOProductList(
          ioProductList.map((item: ioProductItem, itemIndex: number) =>
            itemIndex !== index
              ? item
              : {
                  ...item,
                  price: value,
                }
          )
        );
        break;
      }
      case 'quantity': {
        setIOProductList(
          ioProductList.map((item: ioProductItem, itemIndex: number) =>
            itemIndex !== index
              ? item
              : {
                  ...item,
                  quantity: value,
                }
          )
        );
        break;
      }
    }
    console.log(ioProductList);
  };

  const alertBody = () => {
    return (
      <View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={styles}
            onValueChange={(item) => setIO(item)}
            placeholder={{
              label: 'Chọn trạng thái',
              value: '',
            }}
            value={io}
            items={ioTypeList}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <FlatList
          data={ioProductList}
          style={styles.listContainer}
          renderItem={({ item, index }) => (
            <IOProductSelect
              index={index}
              item={item}
              productList={productList}
              companyList={companyList}
              handleValueChange={handleValueChange}
            />
          )}
          keyExtractor={(index) => index}
          extraData={ioProductList}
        />

        <BlueButton title="Thêm chi tiết" pressed={handleAddIOProductItem} />
      </View>
    );
  };

  return (
    <CartLayout
      title="Nhập xuất"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
      <View style={styles.searchContainer}>
        <NormalTextInput
          iconName="search"
          placeholderText="Tìm kiếm..."
          onTextChange={(text) => setSearchText(text)}
          value={searchText}
          editable={true}
        />
        {action === 'Add' ? (
          <AdminAlert
            alertVisible={modalVisible}
            title="Nhập xuất"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleAddIOProduct}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa nhập xuất"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleSaveProduct)}
          >
            {alertBody()}
          </AdminAlert>
        )}
        <CustomAlert
          alertVisible={modalDeleteVisible}
          title="Xóa sản phẩm"
          okTitle="Xóa"
          onCancelPressed={handleCloseModal}
          onOkPressed={handleDeleteProduct}
        />
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      {/* <FlatList
        data={productList.filter(
          (item: ProductItem) =>
            item.name
              .toLowerCase()
              .startsWith(searchText.trim().toLowerCase()) ||
            item.brand.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: ProductItem) => {
          return (
            <ProductRowItemNoCart
              item={item.item}
              onEditPressed={handleEditPressed}
            />
          );
        }}
        keyExtractor={(item: ProductItem) => item._id}
      /> */}
    </CartLayout>
  );
};

export default AdminIOProduct;
