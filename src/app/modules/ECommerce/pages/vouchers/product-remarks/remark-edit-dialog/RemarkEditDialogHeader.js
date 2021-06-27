/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../_metronic/_partials/controls";

export function RemarkEditDialogHeader({ id }) {
  const [title, setTitle] = useState("");
  // Remarks Redux state
  const { remarkForEdit, actionsLoading } = useSelector(
    (state) => ({
      remarkForEdit: state.remarks.remarkForEdit,
      actionsLoading: state.remarks.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "Nuevo plan de cuentas";
    if (remarkForEdit && id) {
      _title = "Plan de cuentas";
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [remarkForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
