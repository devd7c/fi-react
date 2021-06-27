/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/vouchers/vouchersActions";
import { useVouchersUIContext } from "../VouchersUIContext";

export function VouchersDeleteDialog({ show, onHide }) {
  // vouchers UI Context
  const vouchersUIContext = useVouchersUIContext();
  const vouchersUIProps = useMemo(() => {
    return {
      ids: vouchersUIContext.ids,
      setIds: vouchersUIContext.setIds,
      queryParams: vouchersUIContext.queryParams,
    };
  }, [vouchersUIContext]);

  // vouchers Redux state
  const dispatch = useDispatch();
  const { actionLoading, actionStatus } = useSelector(
    (state) => ({ 
      actionLoading: state.vouchers.actionLoading,
      actionStatus: state.vouchers.actionStatus
    }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [actionLoading, actionStatus, dispatch]);

  // if there weren't selected vouchers we should close modal
  useEffect(() => {
    if (!vouchersUIProps.ids || vouchersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vouchersUIProps.ids]);

  const deleteProducts = () => {
    // server request for deleting product by selected ids
    dispatch(actions.deleteProducts(vouchersUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProducts(vouchersUIProps.queryParams)).then(() => {
        // clear selections list
        vouchersUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {actionLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Eliminar Comprobantes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!actionLoading && (
          <span>Esta seguro de eliminar los Comprobantes seleccionados?</span>
        )}
        {actionLoading && <span>Eliminando comprobantes...</span>}
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
            onClick={deleteProducts}
            className="btn btn-primary btn-elevate"
          >
            Eliminar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
