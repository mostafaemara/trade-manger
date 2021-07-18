import React, { useEffect } from "react";
import PrivatePage from "../../components/common/protect-route";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchShipmentsThunk,
  selectFilter,
} from "../../redux/store/shipments-slice";
import "bootstrap/dist/css/bootstrap.css";

import ShipmentsPaginationBar from "../../components/shipments/ShipmentsPaginationBar";
import ShipmentsBar from "../../components/shipments/ShipmentsBar";
import ShipmentsStatusAlert from "../../components/shipments/ShipmentsStatusAlert";

import {
  selectToken,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import {
  selectCurrentPage,
  selectLimit,
  selectPagination,
} from "../../redux/store/shipments-slice";
import ShipmentModal from "../../components/shipments/ShipmentModal";
import ShipmentsDeleteModal from "../../components/shipments/ShipmentsDeleteModal";
import ShipmentsTable from "../../components/shipments/ShipmentsTable";

function ShipmentsPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const token = useSelector(selectToken);
  const isAuthnticated = useSelector(selectIsAuthnticated);

  const limit = useSelector(selectLimit);
  const currentPage = useSelector(selectCurrentPage);
  useEffect(() => {
    if (isAuthnticated) {
      console.log("Currnet page", currentPage);
      console.log("limit", limit);
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
  }, [currentPage, limit, dispatch, token, filter]);

  return (
    <PrivatePage>
      <title>Shipments</title>
      <ShipmentModal></ShipmentModal>
      <ShipmentsStatusAlert></ShipmentsStatusAlert>
      <ShipmentsDeleteModal></ShipmentsDeleteModal>
      <ShipmentsBar></ShipmentsBar>

      <ShipmentsTable></ShipmentsTable>
      <ShipmentsPaginationBar></ShipmentsPaginationBar>
    </PrivatePage>
  );
}

export default ShipmentsPage;
