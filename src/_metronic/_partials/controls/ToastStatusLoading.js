import React from "react";
import { ToastStatusUtil } from "./ToastStatusUtil"

export function ToastStatusLoading({ getStatus, getLoading, getActionLoading, getText }) {
  
  const statusFetched = (status, loading, actionLoading, text) => {
    if(status !== 0 && loading === false && actionLoading === null) {
      switch (status) {
        case 200:
          return ToastStatusUtil.success(text + 'OK');
        case 204:
          return ToastStatusUtil.success(text + 'Vacía');
        case 400:
          return ToastStatusUtil.warning('Ocurrió un error al cargar los datos, por favor consulte con el administrador');
        case 404:
          return ToastStatusUtil.warning('Ocurrió un error al cargar los datos, por favor vuelva a intentarlo');
        case 500:
          return ToastStatusUtil.error('Error del servidor, por favor consulte con el administrador');
        case 0:
          return ToastStatusUtil.error('Error de conexión, por favor verifique su conexion a internet');
        default:
          return ToastStatusUtil.error('Error no administrado, por favor consulte con el administrador');
      }
    } else return '';
  };

  return (
    <>
    {statusFetched(getStatus, getLoading, getActionLoading, getText)}
    </>
  );
}
