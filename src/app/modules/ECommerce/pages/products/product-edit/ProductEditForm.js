// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ProductEditSchema = Yup.object().shape({
  voucherNumber: Yup.number()
    .required("Nro. comprobante es requerido"),
  voucherDate: Yup.mixed()
    .nullable(false)
    .required("Fecha es requerido"),
});

export function ProductEditForm({
  product,
  lsVoucherType,
  btnRef,
  btnRefreshRef,
  saveProduct,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="voucherNumber"
                    component={Input}
                    placeholder="Codigo Comprobante"
                    label="Codigo"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="voucherDate"
                    type="datetime-local"
                    component={Input}
                    placeholder="Fecha Comprobante"
                    label="Fecha"
                  />
                </div>
                <div className="col-lg-4">
                  <Select name="voucherType.id" label="Manufacture">
                      {lsVoucherType.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="form-group">
                <label>Descripción o Razón Social</label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
              <button type="reset" style={{ display: "none" }} ref={btnRefreshRef} className="btn btn-secondary">Reset</button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
