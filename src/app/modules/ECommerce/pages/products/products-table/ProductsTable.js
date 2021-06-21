// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import * as uiHelpers from "../ProductsUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";
//
import { ToastErrorLoading } from "../../../../../../_metronic/_partials/controls";
import { toastStatus } from "../../../../../../_metronic/_partials/controls/ToastStatusUtil"

export function ProductsTable() {
  // Managing async state for dispatch (default = false)
  const mounted = useRef(false);
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditProductPage: productsUIContext.openEditProductPage,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
    };
  }, [productsUIContext]);

  // Getting current state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { totalCount, entities, listLoading, status, error } = currentState;
  // Products Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    productsUIProps.setIds([]);

    // Managing async when is dispatch
    mounted.current = true;
    // server call by queryParams
    dispatch(actions.fetchProducts(productsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUIProps.queryParams, dispatch]);
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
    /*{
      dataField: "color",
      text: "Color",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.ColorColumnFormatter,
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.PriceColumnFormatter,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "condition",
      text: "Condition",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.ConditionColumnFormatter,
    },*/
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductPage: productsUIProps.openEditProductPage,
        openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table status loading
  const statusFetched = (getStatus, getLoading) => {
    if(getLoading === false && mounted.current === true) {
      switch (getStatus) {
        case 200:
          return toastStatus.success('Lista de Comprobantes OK ');
        case 204:
          return toastStatus.success('Lista de Comprobantes Vacía');
        case 400:
          return toastStatus.warning('Ocurrió un error al cargar los datos, por favor consulte con el administrador');
        case 404:
          return toastStatus.warning('Ocurrió un error al cargar los datos, por favor vuelva a intentarlo');
        case 500:
          return toastStatus.error('Error del servidor, por favor consulte con el administrador');
        case 0:
          return toastStatus.error('Error de conexión, por favor verifique su conexion a internet');
        default:
          return toastStatus.error('Error no administrado, por favor consulte con el administrador');
      }
    } else return '';
  };
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: productsUIProps.queryParams.pageSize,
    page: productsUIProps.queryParams.pageNumber,
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
                  productsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: productsUIProps.ids,
                  setIds: productsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
              </BootstrapTable>
              {statusFetched(status, listLoading)}
              <ToastErrorLoading isError={error==null? false: true}  text="Ocurrió un problema en cargar los datos, por favor inténtelo de nuevo ..." />
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
