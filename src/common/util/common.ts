import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_url } from "./constant";
import Toast from 'react-native-root-toast';

export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneReg = /((02|09|03|07|08|05)+([0-9]{8,9})\b)/g;

export const showToast=(message: string)=>{
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    animation: true,
    shadow: true,
    containerStyle: {zIndex:1000}
  })
}

export interface UserInterface{
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  id_role: string;
}

export const initialUserInterface: UserInterface={
  email: '',
  password: '',
  name: '',
  phone: '',
  address: '',
  id_role: ''
}

export interface ProductItem{
  _id: string;
  name: string;
  brand: string;
  id_category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  discount: number;
  status:boolean
}

export const initialProductItem: ProductItem={
  _id: '',
  name: '',
  brand: '',
  id_category: '',
  price: 0,
  description: '',
  image: '',
  stock:0,
  discount: 0,
  status:true,
}

export interface JustNameItem{
    _id: string;
    name:string
}

export const initialJustNameItem: JustNameItem = {
  _id: '',
  name: '',
};

export interface CartItem{
  id_product: string;
  price: number;
  discount: number;
  quantity:number
}

export interface UserInfo {
  name: string;
  phone: string;
  address: string;
}

export interface CartInterface{
  productList: [],
  total:number
}

export interface ReceiptInterface{
  _id: string,
  date: string,
  total: number,
  id_user: string,
  id_receiptType: string,
}

export interface ReceiptDetailInterface{
  _id: string,
  discount: number,
  id_product: string,
  id_receipt: string,
  price: number,
  quantity: number
}

export interface SummaryInterface{
  id:string,
  title: string,
  count:number
}

export interface UserItem{
  _id:string,
  email: string,
  id_role:string,
  id_userInfo:string
}

export const initialUserDetailItem : UserDetailItem={
  _id:'',
  name:'',
  phone:'',
  address:'',
  joinDate:''
}

export interface UserDetailItem{
  _id:string,
  name:string,
  phone:string,
  address:string,
  joinDate:string
}



export interface CompanyInterface{
  _id:string,
  name:string,
  phone:string,
  address:string,
  tax_number:string
}

export const initialCompanyItem: CompanyInterface = {
  _id:'',
  name:'',
  phone:'',
  address:'',
  tax_number:''
}

export interface ioProductDetailItem{
  id_product: string,
  id_company: string,
  price: number,
  quantity:number
}

export const initialIOProductDetailItem: ioProductDetailItem = {
  id_product: '',
  id_company: '',
  price: 0,
  quantity:0
}

export interface pickerInterface{
  label: string,
  value:string
}

export const initialPickerItem: pickerInterface = {
  label: '',
  value:''
}

export interface ioProductInterface{
  _id: string,
  date: string,
  id_ioType:string
}

export const initialIOProduct: ioProductInterface = {
  _id: '',
  date: '',
  id_ioType:''
}

export const addCategoryUrl = 'admin/add-category/';
export const editCategoryUrl = 'admin/edit-category/';
export const deleteCategoryUrl = 'admin/delete-category/';
export const addReceiptTypeUrl = 'admin/add-receipt-type/';
export const editReceiptTypeUrl = 'admin/edit-receipt-type/';
export const deleteReceiptTypeUrl = 'admin/delete-receipt-type/';
export const addIOTypeUrl = 'admin/add-io-type/';
export const editIOTypeUrl = 'admin/edit-io-type/';
export const deleteIOTypeUrl = 'admin/delete-io-type/';
export const addRoleUrl = 'admin/add-role/';
export const editRoleUrl = 'admin/edit-role/';
export const deleteRoleUrl = 'admin/delete-role/';
export const getCompanyUrl = 'company/';
export const addCompanyUrl = 'admin/add-company/';
export const editCompanyUrl = 'admin/edit-company/';
export const deleteCompanyUrl = 'admin/delete-company/';
export const addProductUrl = 'admin/add-product/';
export const editProductUrl = 'admin/edit-product/';
export const deleteProductUrl = 'admin/delete-product/';
export const addIOProductUrl = 'admin/add-io/';

export const getCartFromAPI = async ()=>{
  const token = await AsyncStorage.getItem("@token");
  let cart = {} as CartInterface
  if (token) {
    await axios({
      url: 'receipt/get-cart',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        "x-auth-token":token  
        },
      responseType:'json'
    }).then(res => {
      if (res.data['code'] === 200) {
        console.log("Cart")
        cart = res.data['data'];
        console.log(cart)
      }
      else {
        return res.data['message'] as string;
      }
    }).catch(err => {
      return err.response.data['message'] as string
    })
    return cart;
  } else {
    return "No token";
  }
}

export async function addReceiptAPI(cart:CartInterface) {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    await axios({
      url: 'receipt/add-receipt',
      baseURL: `${api_url}`,
      method: 'post',
      headers: {
        "x-auth-token":token  
      },
      data:cart,
      responseType:'json'
    }).then(res => {
      if (res.data['code'] !== 200) {
        return res.data['message'] as string;
      }
    }).catch(err => {
      return err.response.data['message'] as string
    })
  }
}

export async function getUserItemByIDFromAPI(_id: string) {
  const token = await AsyncStorage.getItem('@token');
    let userInfo = {} as UserItem;
    await axios({
      url: `admin/account/${_id}`,
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          userInfo=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
    return userInfo;
}

export async function getUserInfoFromAPI() {
  const token = await AsyncStorage.getItem('@token');
  if (token) {
    let userInfo = {} as UserInfo;
    await axios({
      url: '/user/me',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          userInfo=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
    return userInfo;
  }
  else {
    const msg = "No token";
    return msg;
  }
}

export async function getUserInfoByIDFromAPI(_id: string) {
  const token = await AsyncStorage.getItem('@token');
    let userInfo = {} as UserDetailItem;
    await axios({
      url: `admin/account-detail/${_id}`,
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          userInfo=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
    return userInfo;
}

export async function getCategoryNameFromAPI(product:ProductItem){
  let categoryName = '';
    await axios({
      url: `category/get-name/${product.id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
    }).then((res) => {
      if (res.data['code'] === 200) {
        categoryName = res.data['data'].name;
      }
      else {
        return categoryName;
      }
    }).catch(err => {
      return categoryName;
    });
  return categoryName;
}

export async function getProductListFromAPI() {
  let productList= [] as any;
  await axios({
      url: `/product/product-list`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
           productList=res.data['data'];
        }
        else {
          return res.data['message'] as string
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string;
      });
  return productList
}

export async function getCategoryListFromAPI() {
  let categoryList = [] as any;
  await axios({
      url: '/category/category-list',
      method: 'get',
      baseURL: `${api_url}`,
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          categoryList = res.data['data'];
        }
        else return res.data['message'] as string
      })
      .catch((err) => {
        return err.response.data['message'] as string
      });
  return categoryList;
}

export async function getProductByCategoryFromAPI(id_category:string) {
  let productList = [] as any;
  await axios({
      url: `/category/get-product-list/${id_category}`,
      baseURL: `${api_url}`,
      method: 'get',
      responseType: 'json',
    })
      .then((res) => {
        if (res.data['code'] === 200) {
          productList=res.data['data']
        }
        else {
          return res.data['message'] as string;
        }
      })
      .catch((err) => {
        return err.response.data['message'] as string;
      });
  return productList;
}

export async function getReceiptListFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let receiptList = [] as any;
  await axios({
    url: 'receipt/receipt-list',
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptList = res.data['data'] as ReceiptInterface;
    }
    else return res.data['message'] as string
  }).catch(err => {
    return err.response.data['message'] as string;
  })

  return receiptList;
}

export async function getReceiptListAdminFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let receiptList = [] as any;
  await axios({
    url: 'admin/receipt-list',
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptList = res.data['data'] as ReceiptInterface;
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return receiptList;
}

export async function getReceiptDetailFromAPI(_id:string){
  const token = await AsyncStorage.getItem("@token");
  let receiptDetailList = [] as any;
  await axios({
    url: `receipt/receipt-detail/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptDetailList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return receiptDetailList;
}

export async function getProductDetailFromAPI(_id:string) {
  let productDetail = {} as ProductItem;
  await axios({
    url: `product/product-detail/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      productDetail = res.data['data'];
    }
    else return res.data['message'] as string;
  }).catch(err => {
    return err.response.data['message'] as string;
  })

  return productDetail;
}

export async function addJustName(url:string, name: string) {
  const token = await AsyncStorage.getItem("@token")
  let code:number=0
  await axios({
    url: `${url}`,
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    data: {
      "name":name
    }
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
}

export async function deleteJustName(url:string, item:JustNameItem) {
  const token = await AsyncStorage.getItem("@token")
  let code:number=0
  await axios({
    url: `${url}${item._id}`,
    baseURL: `${api_url}`,
    method: 'delete',
    headers: {
      "x-auth-token":token
    },
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
}

export async function editJustName(url:string,item: JustNameItem) {
  const token = await AsyncStorage.getItem('@token')
  let code: number = 0
  await axios({
    url: `${url}${item._id}`,
    baseURL: `${api_url}`,
    method: 'put',
    headers: {
      "x-auth-token":token
    },
    data: {
      "name":item.name
    }
  }).then(res => {
    code = res.data['code'] as number;
    return code;
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
}

export async function getReceiptTypeFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let receiptTypeList = [] as any;
  await axios({
    url: `receipt-type/get-list`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptTypeList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return receiptTypeList;
}

export async function getReceiptTypeByIDFromAPI(_id:string) {
  const token = await AsyncStorage.getItem("@token");
  let receiptType = {} as JustNameItem;
  await axios({
    url: `admin/receipt-type/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      receiptType=res.data['data']
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })
  return receiptType
}

export async function getIOTypeFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let IOTypeList = [] as any;
  await axios({
    url: `io-type/get-list`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      IOTypeList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return IOTypeList;
}

export async function getIOTypeByIDFromAPI(_id:string) {
  const token = await AsyncStorage.getItem("@token");
  let ioType = {} as JustNameItem;
  await axios({
    url: `admin/io-type/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      ioType=res.data['data']
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })
  return ioType
}

export async function getRoleFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let roleList = [] as any;
  await axios({
    url: `role/get-list`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      roleList = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return roleList;
}

export async function getRoleInfoFromAPI(_id:string) {
  const token = await AsyncStorage.getItem("@token");
  let roleInfo = {} as JustNameItem
  await axios({
    url: `role/role-info/${_id}`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      roleInfo = res.data['data'];
    }
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
  })

  return roleInfo;
}

export async function getUserListFromAPI() {
  const token = await AsyncStorage.getItem("@token");
  let userList = [] as any;
  await axios({
    url: `admin/account-list`,
    baseURL: `${api_url}`,
    method: 'get',
    headers: {
      "x-auth-token":token
    },
    responseType:'json',
  }).then(res => {
    if (res.data['code'] === 200) {
      userList = res.data['data'];
    }
    else return res.data['message'] as string
  }).catch(err => {
    return err.response.data['message'] as string;
  })

  return userList;
}

export async function addUserToAPI(userInfo:UserInterface) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `admin/add-account`,
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:userInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function editUserAPI(_id:string,userInfo:UserInterface) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `admin/edit-account/${_id}`,
    baseURL: `${api_url}`,
    method: 'put',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:userInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function getCompanyListFromAPI() {
  const token = await AsyncStorage.getItem("@token")
  let companyList=[] as any
  await axios({
    url: 'company/get-list',
    baseURL: `${api_url}`,
    headers: {
      "x-auth-token":token
    },
    responseType:'json'
  }).then(res => {
    if (res.data['code'] = 200)
      companyList = res.data['data']
    else return res.data['message']
  }).catch(err =>{
    return err.response['data']
  })
  return companyList
}

export async function addCompanyToAPI(companyInfo:CompanyInterface) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `${addCompanyUrl}`,
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:companyInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function editCompanyAPI(_id:string,companyInfo:CompanyInterface) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `${editCompanyUrl}${_id}`,
    baseURL: `${api_url}`,
    method: 'put',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:companyInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function deleteCompany(_id:string) {
  const token = await AsyncStorage.getItem("@token")
  let code:number=0
  await axios({
    url: `${deleteCompanyUrl}${_id}`,
    baseURL: `${api_url}`,
    method: 'delete',
    headers: {
      "x-auth-token":token
    },
  }).then(res => {
    code = res.data['code'] as number;
    return code
  })
    .catch(err => {
      code = err.response.data['code'] as number
      return code
    })
  return code
}

export async function addProductAPI(productInfo: ProductItem) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `${addProductUrl}`,
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:productInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function editProductAPI(productInfo: ProductItem,_id:string) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `${editProductUrl}${_id}`,
    baseURL: `${api_url}`,
    method: 'put',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data:productInfo
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function addIOProductAPI(ioProductDetailList: [], id_ioType: string) {
  const token = await AsyncStorage.getItem("@token");
  let code:number=0
  await axios({
    url: `${addIOProductUrl}`,
    baseURL: `${api_url}`,
    method: 'post',
    headers: {
      "x-auth-token":token
    },
    responseType: 'json',
    data: {
      id_ioType: id_ioType,
      productList:ioProductDetailList
    }
  }).then(res => {
    code=res.data['code']
  }).catch(err => {
    code= err.response.data['code'];
  })
  return code
}

export async function getIOProductListFromAPI() {
  const token = await AsyncStorage.getItem("@token")
  let ioProductList=[] as any
  await axios({
    url: 'io-product/io-list',
    baseURL: `${api_url}`,
    headers: {
      "x-auth-token":token
    },
    responseType:'json'
  }).then(res => {
    if (res.data['code'] = 200)
      ioProductList = res.data['data']
    else return res.data['message']
  }).catch(err =>{
    return err.response['data']
  })
  return ioProductList
}

export async function getIOProductDetailFromAPI(ioProductID:string) {
  const token = await AsyncStorage.getItem("@token")
  let ioDetailList=[] as any
  await axios({
    url: `io-detail/${ioProductID}`,
    baseURL: `${api_url}`,
    headers: {
      "x-auth-token":token
    },
    responseType:'json'
  }).then(res => {
    if (res.data['code'] = 200)
      ioDetailList = res.data['data']
    else return res.data['message']
  }).catch(err =>{
    return err.response['data']
  })
  return ioDetailList
}

export async function getCompanyDetailFromAPI(id_company:string) {
  const token = await AsyncStorage.getItem("@token")
  let companyDetail={} as CompanyInterface
  await axios({
    url: `${getCompanyUrl}${id_company}`,
    baseURL: `${api_url}`,
    headers: {
      "x-auth-token":token
    },
    responseType:'json'
  }).then(res => {
    if (res.data['code'] = 200)
      companyDetail = res.data['data']
    else return res.data['message']
  }).catch(err =>{
    return err.response['data']
  })
  return companyDetail
}