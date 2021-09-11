import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AdminAlert } from '../../../common/ui/base/admin-alert';
import CartLayout from '../../../common/ui/layout/cart-layout';
import {
  addIOProductAPI,
  getCompanyListFromAPI,
  getIOProductDetailFromAPI,
  getIOProductListFromAPI,
  getIOTypeFromAPI,
  getProductListAdminFromAPI,
  getProductListFromAPI,
  initialIOProductDetailItem,
  ioProductDetailItem,
  ioProductInterface,
  showToast,
} from '../../../common/util/common';
import { Color } from '../../../common/util/enum';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { BlueButton } from '../../../common/ui/base/button';
import IOProductSelect from './components/ioProductSelect';
import NumberTextInput from '../../../common/ui/base/textInput/numberTextInput';
import IOProductRow from './components/ioProductRow';
import DetailAlert from '../../../common/ui/base/admin-alert/detailAlert';

interface Props {}
const AdminIOProduct = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [action, setAction] = useState<string>('Add');

  const [ioType, setIOType] = useState<string>('');
  const [ioProductDetailList, setIOProductDetailList] = useState([] as any);

  const [ioProductList, setIOProductList] = useState([] as any);
  const [ioTypeList, setIOTypeList] = useState([] as any);
  const [productList, setProductList] = useState([] as any);
  const [companyList, setCompanyList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');

  async function getCompanyList() {
    const companyListFromAPI = await getCompanyListFromAPI();
    if (typeof companyListFromAPI !== 'string') {
      let tempList = [] as any;
      for (const index in companyListFromAPI) {
        tempList.push({
          label: companyListFromAPI[index].name,
          value: companyListFromAPI[index]._id,
        });
      }
      setCompanyList(tempList);
    } else {
      showToast('Không thể lấy danh sách đối tác');
    }
  }

  async function getProductList() {
    const productListFromAPI = await getProductListAdminFromAPI();
    if (typeof productListFromAPI !== 'string') {
      let tempList = [] as any;
      for (const index in productListFromAPI) {
        tempList.push({
          label: productListFromAPI[index].name,
          value: productListFromAPI[index]._id,
        });
      }
      setProductList(tempList);
    } else {
      showToast('Không thể lấy danh sách sản phẩm');
    }
  }

  async function getIOTypeList() {
    const ioTypeListFromAPI = await getIOTypeFromAPI();
    if (typeof ioTypeListFromAPI !== 'string') {
      let tempList = [] as any;
      for (const index in ioTypeListFromAPI) {
        tempList.push({
          label: ioTypeListFromAPI[index].name,
          value: ioTypeListFromAPI[index]._id,
        });
      }
      setIOTypeList(tempList);
    } else {
      showToast('Không thể lấy danh sách loại nhập xuất');
    }
  }

  async function getIOProductList() {
    const ioProductListFromAPI = await getIOProductListFromAPI();
    if (typeof ioProductListFromAPI !== 'string') {
      setIOProductList(ioProductListFromAPI);
    } else {
      showToast('Không thể lấy danh sách nhập xuất');
    }
  }

  useEffect(() => {
    getProductList();
    getIOTypeList();
    getCompanyList();
    getIOProductList();
  }, []);

  const handleAddPressed = () => {
    setAction('Add');
    setIOType('');
    setIOProductDetailList([]);
    setModalVisible(true);
  };

  const handleDetailPressed = async (item: ioProductInterface) => {
    setAction('View');
    const ioProductDetailFromAPI = await getIOProductDetailFromAPI(item._id);
    if (typeof ioProductDetailFromAPI !== 'string') {
      Actions.push('adminIOProductDetail', {
        ioProductDetailList: ioProductDetailFromAPI,
        id_ioType: item.id_ioType,
        date: item.date,
      });
    } else {
      showToast('Không thể lấy chi tiết nhập xuất');
    }
  };

  const handleCloseModal = () => {
    setIOType('');
    setIOProductDetailList([]);
    setModalVisible(false);
  };

  const handleAddIOProduct = async () => {
    if (ioType === '') {
      showToast('Chưa chọn trạng thái');
    } else if (ioProductDetailList.length !== 0) {
      console.log(ioProductDetailList);
      let check = true;
      for (const index in ioProductDetailList) {
        if (
          ioProductDetailList[index].id_product === '' ||
          ioProductDetailList[index].id_company === '' ||
          parseInt(ioProductDetailList[index].price) < 1001 ||
          parseInt(ioProductDetailList[index].quantity) < 1
        ) {
          check = false;
          break;
        }
      }
      if (check) {
        const code = await addIOProductAPI(ioProductDetailList, ioType);
        //Toast
        if (code === 200) {
          handleCloseModal();
          Actions.refresh({ key: Math.random() });
          showToast('Thêm nhập xuất thành công');
        } else {
          showToast('Không thể thêm nhập xuất');
        }
      } else {
        showToast('Danh sách không hợp lệ');
      }
    } else {
      showToast('Danh sách sản phẩm không được để trống');
    }
  };

  const handleAddIOProductItem = () => {
    setIOProductDetailList([
      ...ioProductDetailList,
      initialIOProductDetailItem,
    ]);
  };

  const handleValueChange = (index: number, value: string, type: string) => {
    switch (type) {
      case 'product': {
        setIOProductDetailList(
          ioProductDetailList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
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
        setIOProductDetailList(
          ioProductDetailList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
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
        setIOProductDetailList(
          ioProductDetailList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
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
        setIOProductDetailList(
          ioProductDetailList.map(
            (item: ioProductDetailItem, itemIndex: number) =>
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
  };

  const alertBody = () => {
    return (
      <View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={styles}
            onValueChange={(value) => {
              setIOType(value);
            }}
            placeholder={{
              label: 'Chọn trạng thái',
              value: '',
            }}
            value={ioType}
            items={ioTypeList}
            disabled={action === 'View' ? true : false}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <FlatList
          data={ioProductDetailList}
          style={styles.listContainer}
          renderItem={({ item, index }) => (
            <IOProductSelect
              key={item.id_product.toString() + item.id_company.toString()}
              index={index}
              item={item}
              productList={productList}
              companyList={companyList}
              handleValueChange={handleValueChange}
              disable={action === 'View' ? true : false}
            />
          )}
          keyExtractor={(item) =>
            item.id_product.toString() + item.id_company.toString()
          }
          extraData={ioProductDetailList}
        />

        {action === 'View' ? (
          <Text></Text>
        ) : (
          <BlueButton title="Thêm chi tiết" pressed={handleAddIOProductItem} />
        )}
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
        <NumberTextInput
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
          <DetailAlert
            alertVisible={modalVisible}
            title="Thông tin nhập xuất"
            onCancelPressed={handleCloseModal}
          >
            {alertBody()}
          </DetailAlert>
        )}
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={ioProductList.filter((item: ioProductInterface) =>
          item.date.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: ioProductInterface) => {
          return (
            <IOProductRow
              item={item.item}
              onDetailPressed={handleDetailPressed}
            />
          );
        }}
        keyExtractor={(item: ioProductInterface) => item._id}
      />
    </CartLayout>
  );
};

export default AdminIOProduct;
