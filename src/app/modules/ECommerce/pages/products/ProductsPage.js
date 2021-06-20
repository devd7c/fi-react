import React from "react";
import { Route } from "react-router-dom";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";

export function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/e-commerce/products/new");
    },
    openEditProductPage: (id) => {
      history.push(`/e-commerce/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/e-commerce/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/e-commerce/products/deleteProducts`);
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path="/e-commerce/products/deleteProducts">
        {({ history, match }) => (
          <ProductsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/products/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/products");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}
