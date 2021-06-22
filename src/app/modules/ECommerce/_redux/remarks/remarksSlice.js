import {createSlice} from "@reduxjs/toolkit";

const initialRemarksState = {
  //Action
  actionStatus: 0,
  actionsLoading: false,
  remarkForEdit: undefined,
  //List
  listLoading: false,
  entities: null,
  totalCount: 0,
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

export const remarksSlice = createSlice({
  name: "remarks",
  initialState: initialRemarksState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
        state.status = 0;
        state.actionStatus = 0;
      } else {
        state.actionsLoading = false;
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
        state.actionsLoading = true;
        state.status = 0;
        state.actionStatus = 0;
      }
    },
    // findRemarks
    remarksFetched: (state, action) => {
      const gridResponse = action.payload.gridResponse;
      const status = gridResponse.status;
      state.listLoading = false;
      state.actionsLoading = null;
      state.error = null;
      state.totalCount = gridResponse.data.totalCount === undefined? 0 : gridResponse.data.totalCount;
      state.status = status;
      state.statusText = gridResponse.statusText;
      state.statusName = 'Lista de plan de cuentas ';
      if(status === 200) {
        state.entities = gridResponse.data.entities;
      }
      if(status === 204) {
        state.entities = null;
      }
    },
    // getRemarkById
    remarkFetched: (state, action) => {
      state.actionsLoading = false;
      state.remarkForEdit = action.payload.remarkForEdit;
      state.error = null;
    },
    // createRemark
    remarkCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.remark);
    },
    // updateRemark
    remarkUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.remark.id) {
          return action.payload.remark;
        }
        return entity;
      });
    },
    // deleteRemark
    remarkDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteRemarks
    remarksDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // remarksUpdateState
    remarksStatusUpdated: (state, action) => {
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
