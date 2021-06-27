import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
import { VouchersPage } from "./vouchers/VouchersPage";
import { VoucherEdit } from "./vouchers/voucher-edit/VoucherEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/e-commerce"
            to="/e-commerce/customers"
          />
        }
        <ContentRoute path="/e-commerce/customers" component={CustomersPage} />
        <ContentRoute path="/e-commerce/vouchers/new" component={VoucherEdit} />
        <ContentRoute
          path="/e-commerce/vouchers/:id/edit"
          component={VoucherEdit}
        />

        <ContentRoute path="/e-commerce/vouchers" component={VouchersPage} />
      </Switch>
    </Suspense>
  );
}
