import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { VouchersFilter } from "./vouchers-filter/VouchersFilter";
import { VouchersTable } from "./vouchers-table/VouchersTable";
import { VouchersGrouping } from "./vouchers-grouping/VouchersGrouping";
import { useVouchersUIContext } from "./VouchersUIContext";

export function VouchersCard() {
  const vouchersUIContext = useVouchersUIContext();
  const vouchersUIProps = useMemo(() => {
    return {
      ids: vouchersUIContext.ids,
      queryParams: vouchersUIContext.queryParams,
      setQueryParams: vouchersUIContext.setQueryParams,
      newProductButtonClick: vouchersUIContext.newProductButtonClick,
      openDeleteProductsDialog: vouchersUIContext.openDeleteProductsDialog,
      openEditProductPage: vouchersUIContext.openEditProductPage,
      openUpdateProductsStatusDialog:
      vouchersUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: vouchersUIContext.openFetchProductsDialog,
    };
  }, [vouchersUIContext]);

  return (
    <Card>
      <CardHeader title="Vouchers list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={vouchersUIProps.newProductButtonClick}
          >
            Nuevo Comprobante
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <VouchersFilter />
        {vouchersUIProps.ids.length > 0 && (
          <>
            <VouchersGrouping />
          </>
        )}
        <VouchersTable />
      </CardBody>
    </Card>
  );
}
