import React, { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import {
  getCompanyListFromAPI,
  phoneReg,
  initialCompanyItem,
  CompanyInterface,
  addCompanyToAPI,
  editCompanyAPI,
  deleteCompany,
} from '../../../common/util/common';
import styles from '../category/style';
import { Entypo } from 'react-native-vector-icons';
import { Color } from '../../../common/util/enum';
import { AdminAlert, CustomAlert } from '../../../common/ui/base/admin-alert';
import { Controller, useForm } from 'react-hook-form';
import { SmallText } from '../../../common/ui/base/errorText';
import CompanyRow from './companyRow';
import Toast from 'react-native-root-toast';

interface Props {}
const AdminCompany = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [companyList, setCompanyList] = useState([] as any);
  const [searchText, setSearchText] = useState<string>('');
  const [action, setAction] = useState<string>('Add');
  const [company, setCompany] = useState<CompanyInterface>(initialCompanyItem);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  async function getCompanyList() {
    const companyListFromAPI = await getCompanyListFromAPI();
    if (typeof companyListFromAPI != 'string') {
      setCompanyList(companyListFromAPI);
    } else {
      //Toast
      Toast.show('Không thể lấy danh sách đối tác', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  useEffect(() => {
    getCompanyList();
  }, []);

  const handleAddPressed = () => {
    setAction('Add');
    setModalVisible(true);
  };

  const handleEditPressed = (companyItem: CompanyInterface) => {
    setAction('Edit');
    const editCompany = {
      _id: companyItem._id,
      name: companyItem.name,
      phone: companyItem.phone,
      address: companyItem.address,
      tax_number: companyItem.tax_number,
    };
    reset(editCompany);
    setCompany(editCompany);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    reset(initialCompanyItem);
    setCompany(initialCompanyItem);
    setModalVisible(false);
    setModalDeleteVisible(false);
  };

  const handleAddCompany = async (info: CompanyInterface) => {
    delete info._id;
    const code = await addCompanyToAPI(info);
    if (code === 200) {
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
      Toast.show('Không thể thêm đối tác', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else {
      Toast.show('Không thể thêm đối tác', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  const handleSaveCompany = async (info: CompanyInterface) => {
    delete info._id;
    const code = await editCompanyAPI(company._id, info);
    if (code === 200) {
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
      Toast.show('Chỉnh sửa thông tin đối tác thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
    //Toast code
    Toast.show('Không thể chỉnh sửa thông tin đối tác', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
    });
  };

  const handleDeletePressed = (companyItem: CompanyInterface) => {
    setModalDeleteVisible(true);
    setCompany(companyItem);
  };

  const handleDeleteCompany = async () => {
    const code = await deleteCompany(company._id);
    //Toast
    if (code === 200) {
      handleCloseModal();
      Actions.refresh({ key: Math.random() });
      Toast.show('Xóa đối tác thành công', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else {
      Toast.show('Không thể xóa đối tác', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      setModalDeleteVisible(false);
    }
  };

  const alertBody = () => {
    return (
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Tên công ty"
              iconName="at"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true }}
          defaultValue={action === 'Add' ? '' : company.name}
          name="name"
        />
        {errors.name && <SmallText title="Tên không được để trống" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="SĐT"
              iconName="phone"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: phoneReg,
          }}
          name="phone"
          defaultValue={action === 'Add' ? '' : company.phone}
        />
        {errors.phone && <SmallText title="SĐT không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Địa chỉ"
              iconName="home"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 100 }}
          name="address"
          defaultValue={action === 'Add' ? '' : company.address}
        />
        {errors.address && <SmallText title="Địa chỉ không đúng" />}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              placeholderText="Mã số thuế"
              iconName="receipt"
              onTextChange={onChange}
              value={value}
              editable={true}
            />
          )}
          rules={{ required: true, minLength: 5, maxLength: 100 }}
          name="tax_number"
          defaultValue={action === 'Add' ? '' : company.tax_number}
        />
        {errors.tax_number && <SmallText title="Mã số thuế không đúng" />}
      </View>
    );
  };

  return (
    <CartLayout
      title="Danh sách đối tác"
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
            title="Thêm đối tác"
            okTitle="Thêm"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleAddCompany)}
          >
            {alertBody()}
          </AdminAlert>
        ) : (
          <AdminAlert
            alertVisible={modalVisible}
            title="Chỉnh sửa đối tác"
            okTitle="Lưu"
            onCancelPressed={handleCloseModal}
            onOkPressed={handleSubmit(handleSaveCompany)}
          >
            {alertBody()}
          </AdminAlert>
        )}
        <CustomAlert
          alertVisible={modalDeleteVisible}
          title="Xóa danh mục"
          okTitle="Xóa"
          onCancelPressed={handleCloseModal}
          onOkPressed={handleDeleteCompany}
        />
        <TouchableWithoutFeedback onPress={handleAddPressed}>
          <Entypo name="plus" size={30} color={Color.black} />
        </TouchableWithoutFeedback>
      </View>

      <FlatList
        data={companyList.filter((item: CompanyInterface) =>
          item.name.toLowerCase().startsWith(searchText.trim().toLowerCase())
        )}
        style={styles.listContainer}
        renderItem={(item: CompanyInterface) => {
          return (
            <CompanyRow
              item={item.item}
              onEditPressed={handleEditPressed}
              onDeletePressed={handleDeletePressed}
            />
          );
        }}
        keyExtractor={(item: CompanyInterface) => item._id}
      />
    </CartLayout>
  );
};

export default AdminCompany;
