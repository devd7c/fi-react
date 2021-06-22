import * as requestFromServer from "./productsCrud";
import {productsSlice, callTypes} from "./productsSlice";

const {actions} = productsSlice;

export const fetchProducts = queryParams => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  try {
    const response = await requestFromServer
      .findProducts(queryParams);
    dispatch(actions.productsFetched({ gridResponse: response }));
  } catch (error) {
    error.clientMessage = "Can't find products";
    dispatch(actions.catchError({ error, callType: callTypes.list }));
  }
};

export const fetchProduct = id => dispatch => {
  if (!id) {
    return dispatch(actions.productFetched({ entityResponse: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductById(id)
    .then(response => {
      dispatch(actions.productFetched({ entityResponse: response }));
    })
    .catch(error => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProduct = productForCreation => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer
      .createProduct(productForCreation);
    dispatch(actions.productCreated({ entityResponse: response }));
  } catch (error) {
    error.clientMessage = "Can't create product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const updateProduct = product => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer
      .updateProduct(product);
    dispatch(actions.productUpdated({ entityResponse: response }));
  } catch (error) {
    error.clientMessage = "Can't update product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const deleteProduct = id => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer
      .deleteProduct(id, 'admin');
    const res = {
      id: id,
      status: response.status,
      statusText: response.statusText
    };
    dispatch(actions.productDeleted({ entityResponse: res }));
  } catch (error) {
    error.clientMessage = "Can't delete product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const deleteProducts = ids => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer
      .deleteProducts(ids, 'admin');
    const res = {
      ids: ids,
      status: response.status,
      statusText: response.statusText
    };
    dispatch(actions.productsDeleted({ entityResponse: res }));
  } catch (error) {
    error.clientMessage = "Can't update product";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const fetchLsVoucherTypeByConceptCode = conceptCode => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  try {
    const response = await requestFromServer
      .findLsVoucherTypeByConceptCode(conceptCode);
    dispatch(actions.lsTypeFetched({ entityResponse: response }));
  } catch (error) {
    error.clientMessage = "Can't find concepts";
    dispatch(actions.catchError({ error, callType: callTypes.list }));
  }
};

export const updateProductsStatus = (ids, status) => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    await requestFromServer
      .updateStatusForProducts(ids, status);
    dispatch(actions.productsStatusUpdated({ ids, status }));
  } catch (error) {
    error.clientMessage = "Can't update products status";
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const resetActionsLoading = option => dispatch => {
  dispatch(actions.resetActionsLoading({ status: option }));
};
