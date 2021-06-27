import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {vouchersSlice} from "../app/modules/ECommerce/_redux/vouchers/vouchersSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  vouchers: vouchersSlice.reducer,
  remarks: remarksSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
