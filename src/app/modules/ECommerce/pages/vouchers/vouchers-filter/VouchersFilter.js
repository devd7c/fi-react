import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useVouchersUIContext } from "../VouchersUIContext";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by all fields
  filter.model = searchText;
  if (searchText) {
    filter.description = searchText;
    filter.voucherNumber = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function VouchersFilter({ listLoading }) {
  // vouchers UI Context
  const vouchersUIContext = useVouchersUIContext();
  const vouchersUIProps = useMemo(() => {
    return {
      setQueryParams: vouchersUIContext.setQueryParams,
      queryParams: vouchersUIContext.queryParams,
    };
  }, [vouchersUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(vouchersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, vouchersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      vouchersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-6">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
