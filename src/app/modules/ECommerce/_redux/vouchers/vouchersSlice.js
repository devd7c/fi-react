import {createSlice} from "@reduxjs/toolkit";
import { ToastStatusUtil } from "../../../../../_metronic/_partials/controls/ToastStatusUtil"

const initialProductsState = {
  //Action
  actionStatus: 0,
  actionLoading: false,
  entityForEdit: undefined,
  //List
  listLoading: false,
  entities: null,
  totalCount: 0,
  //List Types
  lsType: null,
  //General
  status: 0,
  statusText: null,
  error:null,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const vouchersSlice = createSlice({
  name: "vouchers",
  initialState: initialProductsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
        state.status = 0;
        state.actionStatus = 0;
      } else {
        state.actionLoading = false;
        state.status = 0;
        state.actionStatus = 0;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
        state.status = 0;
        state.actionStatus = 0;
      } else {
        state.actionLoading = true;
        state.status = 0;
        state.actionStatus = 0;
      }
    },    
    // findProducts
    productsFetched: (state, action) => {
      const gridResponse = action.payload.gridResponse;
      const status = gridResponse.status;
      state.listLoading = false;
      state.actionLoading = null;
      state.error = null;
      state.totalCount = gridResponse.data.totalCount === undefined? 0 : gridResponse.data.totalCount;
      state.status = status;
      state.statusText = gridResponse.statusText;
      state.statusName = 'Lista de comprobantes ';
      if(status === 200) {
        state.entities = gridResponse.data.entities;
      }
      if(status === 204) {
        state.entities = null;
      }
    },
    // get find voucher by id
    productFetched: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      state.actionLoading = false;
      state.error = null;
      if(entityResponse === undefined) {
        state.entityForEdit = undefined;
      } else {
        const status = entityResponse.status;
        state.status = status;
        state.statusText = entityResponse.statusText;
        if(status === 200) {
          state.entityForEdit = entityResponse.data;
        }
      }
    },
    // createProduct
    productCreated: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionLoading = false;
      state.error = null;
      state.status = status;
      state.statusText = entityResponse.statusText;
      //state.entities.push(entityResponse.data);
      switch (status) {
        case 200:
          return ToastStatusUtil.success('Se guardo correctamente');
        case 400:
          return ToastStatusUtil.warning('Ocurrió un error al guardar los datos, por favor consulte con el administrador');
        case 404:
          return ToastStatusUtil.warning('Ocurrió un error al guardar los datos, por favor vuelva a intentarlo');
        case 500:
          return ToastStatusUtil.error('Error del servidor, por favor consulte con el administrador');
        case 0:
          return ToastStatusUtil.error('Error de conexión, por favor verifique su conexion a internet');
        default:
          return ToastStatusUtil.error('Error no administrado, por favor consulte con el administrador');
      }
    },
    // updateProduct
    productUpdated: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionLoading = false;
      state.error = null;
      state.status = status;
      state.statusText = entityResponse.statusText;
      /*state.entities = state.entities.map(entity => {
        if (entity.id === entityResponse.data.id) {
          return entityResponse.data;
        }
        return entity;
      });*/
      switch (status) {
        case 200:
          return ToastStatusUtil.success('Se actualizo correctamente');
        case 400:
          return ToastStatusUtil.warning('Ocurrió un error al actualizar los datos, por favor consulte con el administrador');
        case 404:
          return ToastStatusUtil.warning('Ocurrió un error al actualizar los datos, por favor vuelva a intentarlo');
        case 500:
          return ToastStatusUtil.error('Error del servidor, por favor consulte con el administrador');
        case 0:
          return ToastStatusUtil.error('Error de conexión, por favor verifique su conexion a internet');
        default:
          return ToastStatusUtil.error('Error no administrado, por favor consulte con el administrador');
      }
    },
    // deleteProduct
    productDeleted: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionLoading = false;
      state.error = null;
      state.status = 0;
      state.actionStatus = status;
      state.statusText = entityResponse.statusText;
      //state.entities = state.entities.filter(el => el.id !== entityResponse.id);
      switch (status) {
        case 200:
          return ToastStatusUtil.success('Se elimino correctamente');
        case 400:
          return ToastStatusUtil.warning('Ocurrió un error al eliminar los datos, por favor consulte con el administrador');
        case 404:
          return ToastStatusUtil.warning('Ocurrió un error al eliminar los datos, por favor vuelva a intentarlo');
        case 500:
          return ToastStatusUtil.error('Error del servidor, por favor consulte con el administrador');
        case 0:
          return ToastStatusUtil.error('Error de conexión, por favor verifique su conexion a internet');
        default:
          return ToastStatusUtil.error('Error no administrado, por favor consulte con el administrador');
      }
    },
    // deleteProducts
    productsDeleted: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionLoading = false;
      state.error = null;
      state.status = 0;
      state.actionStatus = status;
      state.statusText = entityResponse.statusText;
      /*state.entities = state.entities.filter(
        el => !entityResponse.ids.includes(el.id)
      );*/
      switch (status) {
        case 200:
          return ToastStatusUtil.success('Se elimino correctamente');
        case 400:
          return ToastStatusUtil.warning('Ocurrió un error al eliminar los datos, por favor consulte con el administrador');
        case 404:
          return ToastStatusUtil.warning('Ocurrió un error al eliminar los datos, por favor vuelva a intentarlo');
        case 500:
          return ToastStatusUtil.error('Error del servidor, por favor consulte con el administrador');
        case 0:
          return ToastStatusUtil.error('Error de conexión, por favor verifique su conexion a internet');
        default:
          return ToastStatusUtil.error('Error no administrado, por favor consulte con el administrador');
      }
    },
    // getVoucherTypeByConceptCode
    lsTypeFetched: (state, action) => {
      const entityResponse = action.payload.entityResponse;
      const status = entityResponse.status;
      state.actionLoading = false;
      state.error = null;
      state.status = status;
      state.statusText = entityResponse.statusText;
      if(status === 200) {
        state.lsType = entityResponse.data;
      }
    },
    // productsUpdateState
    productsStatusUpdated: (state, action) => {
      state.actionLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
    // set reset actionsLoading (true or false)
    resetActionsLoading: (state, action) => {
      const { status } = action.payload;
      state.actionLoading = status;
    }
  }
});
