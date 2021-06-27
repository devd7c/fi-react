import React from "react";
import { Route } from "react-router-dom";
import { VoucherDeleteDialog } from "./voucher-delete-dialog/VoucherDeleteDialog";
import { VouchersDeleteDialog } from "./vouchers-delete-dialog/VouchersDeleteDialog";
import { VouchersCard } from "./VouchersCard";
import { VouchersUIProvider } from "./VouchersUIContext";
import { VouchersLoadingDialog } from "./vouchers-loading-dialog/VouchersLoadingDialog";

export function VouchersPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/e-commerce/vouchers/new");
    },
    openEditProductPage: (id) => {
      history.push(`/e-commerce/vouchers/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/e-commerce/vouchers/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/e-commerce/vouchers/deleteProducts`);
    },
  };

  return (
    <VouchersUIProvider productsUIEvents={productsUIEvents}>
      <VouchersLoadingDialog />
      <Route path="/e-commerce/vouchers/deleteProducts">
        {({ history, match }) => (
          <VouchersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/vouchers");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/vouchers/:id/delete">
        {({ history, match }) => (
          <VoucherDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/vouchers");
            }}
          />
        )}
      </Route>
      <VouchersCard />
    </VouchersUIProvider>
  );
}
