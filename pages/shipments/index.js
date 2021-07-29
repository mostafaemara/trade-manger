import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchShipmentsThunk,
  selectFilter,
  selectRefresh,
} from "../../redux/store/shipments-slice";
import "bootstrap/dist/css/bootstrap.css";

import ShipmentsPaginationBar from "../../components/shipments/ShipmentsPaginationBar";
import ShipmentsBar from "../../components/shipments/ShipmentsBar";
import ShipmentsStatusAlert from "../../components/shipments/ShipmentsStatusAlert";

import {
  checkAuth,
  selectToken,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import {
  selectCurrentPage,
  selectLimit,
} from "../../redux/store/shipments-slice";
import ShipmentModal from "../../components/shipments/ShipmentModal";
import ShipmentsDeleteModal from "../../components/shipments/ShipmentsDeleteModal";
import ShipmentsTable from "../../components/shipments/ShipmentsTable";

import WithAuth from "../../components/common/WithAuth";
function ShipmentsPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const token = useSelector(selectToken);
  const isAuthnticated = useSelector(selectIsAuthnticated);
  const refresh = useSelector(selectRefresh);

  const limit = useSelector(selectLimit);
  const currentPage = useSelector(selectCurrentPage);
  useEffect(() => {
    if (isAuthnticated) {
      dispatch(checkAuth());
      dispatch(
        fetchShipmentsThunk({
          client: filter.activeClient ? filter.client : "",
          startDate: filter.activeStartDate ? filter.startDate : "",
          endDate: filter.activeEndDate ? filter.endDate : "",
          limit: limit,
          page: currentPage + 1,
          token: token,
        })
      );
    }
  }, [currentPage, limit, dispatch, token, filter, refresh]);
  console.log("Refresh", refresh);
  return (
    <>
      <title>الشحنات</title>
      <ShipmentModal></ShipmentModal>
      <ShipmentsStatusAlert></ShipmentsStatusAlert>
      <ShipmentsDeleteModal></ShipmentsDeleteModal>
      <ShipmentsBar></ShipmentsBar>

      <ShipmentsTable></ShipmentsTable>
      <ShipmentsPaginationBar></ShipmentsPaginationBar>
    </>
  );
}

export default WithAuth(ShipmentsPage);
