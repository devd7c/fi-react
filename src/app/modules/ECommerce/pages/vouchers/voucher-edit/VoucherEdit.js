/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/vouchers/vouchersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { VoucherEditForm } from "./VoucherEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
import { Remarks } from "../product-remarks/Remarks";

const initVoucher = {
  id: undefined,
  voucherType: {
    id: 0,
    code: ""
  },
  voucherNumber: "",
  voucherDate: "",
  description: "",
  ufv: 0.0000,
  xbase: {
    status: 1,
    userAdmin: "admin",
    societyId: "BO"
  },
};

export function VoucherEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const subheader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionLoading, entityForEdit, lsType } = useSelector(
    (state) => ({
      actionLoading: state.vouchers.actionLoading,
      entityForEdit: state.vouchers.entityForEdit,
      lsType: state.vouchers.lsType,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchProduct(id));
    dispatch(actions.fetchLsVoucherTypeByConceptCode('TCP'));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "Nuevo Comprobante";
    if (entityForEdit && id) {
      _title = `Editar Comprobante [${entityForEdit.voucherNumber}]`;
    }

    setTitle(_title);
    subheader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityForEdit, lsType, id]);

  const selectedTypes = (types) => {
    const _types = [];
    if(lsType) {
      types.forEach((type) => {
        const e = {id: type.id, name: type.name};
        if (_types) {
          _types.push(e);
        }
      });
    }
    return _types;
  };

  const saveProduct = (values) => {
    if (!id) {
      dispatch(actions.createProduct(values)).then(() => backToProductsList());
    } else {
      dispatch(actions.updateProduct(values)).then(() => backToProductsList());
    }
  };

  const btnRef = useRef();  
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const btnRefreshRef = useRef();
  const refreshClick = () => {
    if (btnRefreshRef && btnRefreshRef.current) {
      if (entityForEdit && id) {
        dispatch(actions.fetchProduct(id));
      }
      btnRefreshRef.current.click();
    }
  }

  const backToProductsList = () => {
    history.push(`/e-commerce/vouchers`);
  };

  return (
    <Card>
      {actionLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Atrás
          </button>
          {`  `}
          <button className="btn btn-light ml-2" onClick={refreshClick}>
            <i className="fa fa-redo"></i>
            Refrescar
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProductClick}
          >
            Guardar
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Cabecera
            </a>
          </li>
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("remarks")}>
                <a
                  className={`nav-link ${tab === "remarks" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "remarks").toString()}
                >
                  Detalle
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <VoucherEditForm
              actionLoading={actionLoading}
              lsType={selectedTypes(lsType)}
              voucher={entityForEdit || initVoucher}
              btnRef={btnRef}
              btnRefreshRef={btnRefreshRef}
              saveProduct={saveProduct}
            />
          )}
          {tab === "remarks" && id && (
            <RemarksUIProvider currentProductId={id}>
              <Remarks />
            </RemarksUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
