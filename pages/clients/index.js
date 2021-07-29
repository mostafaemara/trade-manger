import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchClientsThunk } from "../../redux/store/clients-slice";
import "bootstrap/dist/css/bootstrap.css";

import ClientsBar from "../../components/clients/ClientsBar";
import ClientsStatusAlert from "../../components/clients/ClientsStatusAlert";

import {
  checkAuth,
  selectToken,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import { selectRefresh } from "../../redux/store/clients-slice";
import ClientsModal from "../../components/clients/ClientsModal";
import ClientsDeleteModal from "../../components/clients/ClientsDeleteModal";
import ClientsTable from "../../components/clients/ClientsTable";
import WithAuth from "../../components/common/WithAuth";

function ClientsPage() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const isAuthnticated = useSelector(selectIsAuthnticated);
  const refresh = useSelector(selectRefresh);

  useEffect(() => {
    if (isAuthnticated) {
      dispatch(checkAuth());
      dispatch(
        fetchClientsThunk({
          token: token,
        })
      );
    }
  }, [dispatch, token, refresh]);

  return (
    <>
      <title>العملاء</title>
      <ClientsModal></ClientsModal>
      <ClientsStatusAlert></ClientsStatusAlert>
      <ClientsDeleteModal></ClientsDeleteModal>
      <ClientsBar></ClientsBar>

      <ClientsTable></ClientsTable>
    </>
  );
}

export default WithAuth(ClientsPage);
