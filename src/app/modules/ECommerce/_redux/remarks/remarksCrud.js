import axios from "axios";

const headers = {
  'Content-Type': 'application/json',
  Authorization: ''
};

export const REMARKS_URL = "api/remarks";

export const FIND_ALL_DETAIL_BY_ID = `${process.env.REACT_APP_API_URL}/voucher/detail/find_all`;
export const GET_DETAIL_BY_ID = `${process.env.REACT_APP_API_URL}/voucher/detail/read`;

// CREATE =>  POST: add a new remark to the server
export function createRemark(remark) {
  return axios.post(REMARKS_URL, { remark });
}

// READ
// Server should return filtered remarks by productId
export function getAllProductRemarksByProductId(productId) {
  return axios.get(`${REMARKS_URL}?productId=${productId}`);
}

export function getDetailVoucherById(voucherId) {
  //return axios.get(`${REMARKS_URL}/${remarkId}`);
  return axios({
    method: 'get',
    url: `${GET_DETAIL_BY_ID}/${voucherId}`,
    headers: headers
  });
}

// Server should return sorted/filtered remarks and merge with items from state
// TODO: Change your URL to REAL API, right now URL is 'api/remarksfind/{productId}'. Should be 'api/remarks/find/{productId}'!!!
export function findRemarks(queryParams, productId) {
  //return axios.post(`${REMARKS_URL}find/${productId}`, { queryParams });
  return axios({
    method: 'post',
    url: `${FIND_ALL_DETAIL_BY_ID}/${productId}`,
    data: queryParams,
    headers: headers
  });
}

// UPDATE => PUT: update the remark
export function updateRemark(remark) {
  return axios.put(`${REMARKS_URL}/${remark.id}`, { remark });
}

// DELETE => delete the remark
export function deleteRemark(remarkId) {
  return axios.delete(`${REMARKS_URL}/${remarkId}`);
}

// DELETE Remarks by ids
export function deleteRemarks(ids) {
  return axios.post(`${REMARKS_URL}/deleteRemarks`, { ids });
}
