/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/products/productsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
import { Specifications } from "../product-specifications/Specifications";
import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
import { Remarks } from "../product-remarks/Remarks";

const initProduct = {
  id: undefined,
  model: "",
  manufacture: "Pontiac",
  modelYear: 2020,
  mileage: 0,
  description: "",
  color: "Red",
  price: 10000,
  condition: 1,
  status: 0,
  VINCode: "",
};

export function ProductEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, productForEdit, lsVoucherType } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForEdit: state.products.productForEdit,
      lsVoucherType: state.products.lsType,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchProduct(id));
    dispatch(actions.fetchLsVoucherTypeByConceptCode('TCP'));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Product";
    if (productForEdit && id) {
      _title = `Editar Comprobante [${productForEdit.voucherNumber}]`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, lsVoucherType, id]);

  const selectedTypes = (types) => {
    const _types = [];
    if(lsVoucherType) {
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

  const backToProductsList = () => {
    history.push(`/e-commerce/products`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProductClick}
          >
            Save
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
              Basic info
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
                  Product remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  Product specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <ProductEditForm
              actionsLoading={actionsLoading}
              lsVoucherType={selectedTypes(lsVoucherType)}
              product={productForEdit || initProduct}
              btnRef={btnRef}
              saveProduct={saveProduct}
            />
          )}
          {tab === "remarks" && id && (
            <RemarksUIProvider currentProductId={id}>
              <Remarks />
            </RemarksUIProvider>
          )}
          {tab === "specs" && id && (
            <SpecificationsUIProvider currentProductId={id}>
              <Specifications />
            </SpecificationsUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
