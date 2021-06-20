import {createSlice} from "@reduxjs/toolkit";
import { toastStatus } from "../../../../../_metronic/_partials/controls/ToastStatusUtil"

const initialProductsState = {
  listLoading: false,
  entities: null,
  totalCount: 0,
  status: null,
  statusText: null,
  actionsLoading: false,
  productForEdit: undefined,
  lsType: null,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getProductById
    productFetched: (state, action) => {
      state.actionsLoading = false;
      state.productForEdit = action.payload.productForEdit;
      state.error = null;
    },
    // getVoucherTypeByConceptCode
    lsTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.lsType = action.payload.lsType;;
    },
    // findProducts
    productsFetched: (state, action) => {
      const gridResponse = action.payload.gridResponse;
      state.listLoading = false;
      state.error = null;
      toastStatus.success(gridResponse.statusText);
      state.totalCount = gridResponse.data.totalCount;
      state.entities = gridResponse.data.entities;
      state.status = gridResponse.status;
      state.statusText = gridResponse.statusText;
    },
    // createProduct
    productCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.product);
    },
    // updateProduct
    productUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.product.id) {
          return action.payload.product;
        }
        return entity;
      });
    },
    // deleteProduct
    productDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteProducts
    productsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // productsUpdateState
    productsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
