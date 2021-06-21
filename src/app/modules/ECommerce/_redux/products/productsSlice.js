import {createSlice} from "@reduxjs/toolkit";

const initialProductsState = {
  listLoading: false,
  entities: null,
  totalCount: 0,
  status: 0,
  statusText: null,
  actionsLoading: false,
  productForEdit: undefined,
  lsType: null,
  error:null,
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
        state.status = 0;
      } else {
        state.actionsLoading = false;
        state.status = 0;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
        state.status = 0;
      } else {
        state.actionsLoading = true;
        state.status = 0;
      }
    },
    // 
    
    // findProducts
    productsFetched: (state, action) => {
      const gridResponse = action.payload.gridResponse;
      const status = gridResponse.status;
      state.listLoading = false;
      state.error = null;
      state.totalCount = gridResponse.data.totalCount;
      state.status = status;
      state.statusText = gridResponse.statusText;
      state.statusName = 'Lista de comprobantes OK'
      if(status === 200) {
        state.entities = gridResponse.data.entities;
      }
    },
    // get find voucher by id
    productFetched: (state, action) => {
      const entityId = action.payload.id;
      state.actionsLoading = false;
      state.error = null;
      if(entityId !== 0) {
        const entityResponse = action.payload.entityResponse;
        const status = entityResponse.status;
        state.status = status;
        state.statusText = entityResponse.statusText;
        if(status === 200) {
          state.productForEdit = entityResponse.data;
        }
      }
    },
    // getVoucherTypeByConceptCode
    lsTypeFetched: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionsLoading = false;
      state.error = null;
      state.status = status;
      state.statusText = entityResponse.statusText;
      if(status === 200) {
        state.lsType = entityResponse.data;
      }
    },
    // createProduct
    productCreated: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionsLoading = false;
      state.error = null;
      state.status = status;
      state.statusText = entityResponse.statusText;
      if(status === 200) {
        state.entities.push(entityResponse.data);
      }
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
