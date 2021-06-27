import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./VouchersUIHelpers";

const VouchersUIContext = createContext();

export function useVouchersUIContext() {
  return useContext(VouchersUIContext);
}

export const ProductsUIConsumer = VouchersUIContext.Consumer;

export function VouchersUIProvider({ productsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newProductButtonClick: productsUIEvents.newProductButtonClick,
    openEditProductPage: productsUIEvents.openEditProductPage,
    openDeleteProductDialog: productsUIEvents.openDeleteProductDialog,
    openDeleteProductsDialog: productsUIEvents.openDeleteProductsDialog,
    openFetchProductsDialog: productsUIEvents.openFetchProductsDialog,
    openUpdateProductsStatusDialog:
      productsUIEvents.openUpdateProductsStatusDialog,
  };

  return (
    <VouchersUIContext.Provider value={value}>
      {children}
    </VouchersUIContext.Provider>
  );
}
