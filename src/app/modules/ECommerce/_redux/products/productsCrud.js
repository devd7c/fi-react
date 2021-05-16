import axios from "axios";

const headers = {
  'Content-Type': 'application/json',
  Authorization: ''
};

export const PRODUCTS_URL = "api/products";
export const FIND_ALL = `${process.env.REACT_APP_API_URL}/voucher/find_all`;
export const GET_ID = `${process.env.REACT_APP_API_URL}/voucher/read`;
export const FIND_TYPES_BY_CONCEPT_CODE = `${process.env.REACT_APP_API_URL}/voucher/find_types_by_concept_code`;

// CREATE =>  POST: add a new product to the server
export function createProduct(product) {
  return axios.post(PRODUCTS_URL, { product });
}

// READ
export function getAllProducts() {
  return axios.get(PRODUCTS_URL);
}

export function getProductById(productId) {
  //return axios.get(`${PRODUCTS_URL}/${productId}`);
  return axios({
    method: 'get',
    url: `${GET_ID}/${productId}`,
    headers: headers
  });
}

// Method from server should return QueryResultsModel(items: any[])
export function findLsVoucherTypeByConceptCode(conceptCode) {
  return axios({
    method: 'get',
    url: `${FIND_TYPES_BY_CONCEPT_CODE}/${conceptCode}`,
    headers: headers
  });
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProducts(queryParams) {
  //return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
  return axios({
    method: 'post',
    url: FIND_ALL,
    data: queryParams,
    headers: headers
  });
}

// UPDATE => PUT: update the procuct on the server
export function updateProduct(product) {
  return axios.put(`${PRODUCTS_URL}/${product.id}`, { product });
}

// UPDATE Status
export function updateStatusForProducts(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForProducts`, {
    ids,
    status
  });
}

// DELETE => delete the product from the server
export function deleteProduct(productId) {
  return axios.delete(`${PRODUCTS_URL}/${productId}`);
}

// DELETE Products by ids
export function deleteProducts(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteProducts`, { ids });
}
