import React, { useMemo } from "react";
import { useVouchersUIContext } from "../VouchersUIContext";

export function VouchersGrouping() {
  // vouchers UI Context
  const vouchersUIContext = useVouchersUIContext();
  const vouchersUIProps = useMemo(() => {
    return {
      ids: vouchersUIContext.ids,
      setIds: vouchersUIContext.setIds,
      openDeleteProductsDialog: vouchersUIContext.openDeleteProductsDialog,
      openFetchProductsDialog: vouchersUIContext.openFetchProductsDialog,
      openUpdateProductsStatusDialog:
        vouchersUIContext.openUpdateProductsStatusDialog,
    };
  }, [vouchersUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{vouchersUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={vouchersUIProps.openDeleteProductsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
