/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/vouchers/vouchersActions";
import { useVouchersUIContext } from "../VouchersUIContext";

export function VoucherDeleteDialog({ id, show, onHide }) {
  // vouchers UI Context
  const vouchersUIContext = useVouchersUIContext();
  const vouchersUIProps = useMemo(() => {
    return {
      setIds: vouchersUIContext.setIds,
      queryParams: vouchersUIContext.queryParams,
    };
  }, [vouchersUIContext]);

  // vouchers Redux state
  const dispatch = useDispatch();
  const { actionStatus, actionLoading } = useSelector(
    (state) => ({ 
      actionLoading: state.vouchers.actionLoading,
      actionStatus: state.vouchers.actionStatus
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {
    dispatch(actions.resetActionsLoading(false));
  }, [actionStatus, actionLoading, dispatch]);

  const deleteProduct = () => {
    // server request for deleting product by id
    dispatch(actions.deleteProduct(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProducts(vouchersUIProps.queryParams));
      // clear selections list
      vouchersUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {actionLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Eliminar Comprobante
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!actionLoading && (
          <span>Are you sure to permanently delete this product?</span>
        )}
        {actionLoading && <span>Product is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancelar
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteProduct}
            className="btn btn-delete btn-elevate"
          >
            Eliminar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
