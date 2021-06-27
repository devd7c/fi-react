// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/vouchers/vouchersActions";
import * as uiHelpers from "../VouchersUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useVouchersUIContext } from "../VouchersUIContext";
//
import { ToastErrorLoading } from "../../../../../../_metronic/_partials/controls";
import { ToastStatusLoading } from "../../../../../../_metronic/_partials/controls";

export function VouchersTable() {
  // Managing async state for dispatch (default = false)
  const mounted = useRef(false);
  // vouchers UI Context
  const vouchersUIContext = useVouchersUIContext();
  const vouchersUIProps = useMemo(() => {
    return {
      ids: vouchersUIContext.ids,
      setIds: vouchersUIContext.setIds,
      queryParams: vouchersUIContext.queryParams,
      setQueryParams: vouchersUIContext.setQueryParams,
      openEditProductPage: vouchersUIContext.openEditProductPage,
      openDeleteProductDialog: vouchersUIContext.openDeleteProductDialog,
    };
  }, [vouchersUIContext]);

  // Getting current state of vouchers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.vouchers }),
    shallowEqual
  );
  const { totalCount, entities, listLoading, actionLoading, status, statusName, error } = currentState;
  // vouchers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    vouchersUIProps.setIds([]);
    // Managing async when is dispatch
    mounted.current = true;
    // server call by queryParams
    dispatch(actions.fetchProducts(vouchersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vouchersUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      hidden: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "voucherNumber",
      text: "Codigo",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "voucherType.name",
      text: "Tipo Comprobante",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "description",
      text: "Descripcion",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "voucherDate",
      text: "Fecha",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.VoucherDateColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductPage: vouchersUIProps.openEditProductPage,
        openDeleteProductDialog: vouchersUIProps.openDeleteProductDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: vouchersUIProps.queryParams.pageSize,
    page: vouchersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  vouchersUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: vouchersUIProps.ids,
                  setIds: vouchersUIProps.setIds,
                })}
                {...paginationTableProps}
              >
              </BootstrapTable>
              {mounted.current === true? <ToastStatusLoading getStatus={status} getLoading={listLoading} getActionLoading={actionLoading} getText={statusName} />:''}
              <NoRecordsFoundMessage entities={entities} />
              <ToastErrorLoading isError={error==null? false: true}  text="Ocurrió un problema en cargar los datos, por favor inténtelo de nuevo ..." />
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
