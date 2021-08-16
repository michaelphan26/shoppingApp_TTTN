import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_url } from "./constant";

export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneReg = /((09|03|07|08|05)+([0-9]{8})\b)/g;

export interface RegisterInfo {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
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
  stock: number;
    image: string;
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
  stock: 0,
    image: '',
    discount: 0,
    status:true,
}

export interface JustNameItem{
    _id: string;
    name:string
}

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
  email: string,
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

export const initialJustNameItem: JustNameItem = {
  _id: '',
  name: '',
};

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

export const addCategoryUrl = 'category/add-category/';
export const editCategoryUrl = 'category/edit-category/';
export const deleteCategoryUrl = 'category/delete-category/';
export const addReceiptTypeUrl = 'receipt-type/add-receipt-type/';
export const editReceiptTypeUrl = 'receipt-type/edit-receipt-type/';
export const deleteReceiptTypeUrl = 'receipt-type/delete-receipt-type/';
export const addIOTypeUrl = 'io-type/add-io-type/';
export const editIOTypeUrl = 'io-type/edit-io-type/';
export const deleteIOTypeUrl = 'io-type/delete-io-type/';
export const addRoleUrl = 'role/add-role/';
export const editRoleUrl = 'role/edit-role/';
export const deleteRoleUrl = 'role/delete-role/';
export const addCompanyUrl = 'company/add-company/';
export const editCompanyUrl = 'company/edit-company/';
export const deleteCompanyUrl = 'company/delete-company/';

export const getCartFromAPI = async ()=>{
  const token = await AsyncStorage.getItem("@token");
  let cart = {} as CartInterface
  if (token) {
    axios({
      url: 'receipt/get-cart',
      baseURL: `${api_url}`,
      method: 'get',
      headers: {
        "x-auth-token":token  
        },
      responseType:'json'
    }).then(res => {
      if (res.data['code'] === 200) {
        cart = res.data['data'];
      }
      else {
        return res.data['message'] as string;
      }
    }).catch(err => {
      return err.response.data['message'] as string
    })
    return cart
  } else {
    return "No token";
  }
}

export async function addReceiptAPI(cart:CartInterface) {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    axios({
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
          return res.data['message']
        }
      })
      .catch((err) => {
        return err.response.data['message'];
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
        else { return res.data['message'] }
      })
      .catch((err) => {
        return err.response.data['message']
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
          return res.data['message'];
        }
      })
      .catch((err) => {
        return err.response.data['message'];
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
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
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
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
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
    else return res.data['message']
  }).catch(err => {
    return err.response.data['message'];
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
    console.log(res.data)
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
    console.log(res.data)
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
    console.log(res.data)
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
    console.log(res.data)
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