import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentsThunk } from "../../redux/store/payments-slice";
import "bootstrap/dist/css/bootstrap.css";

import PaymentsPaginationBar from "../../components/payments/PaymentsPaginationBar";
import PaymentsBar from "../../components/payments/PaymentsBar";
import PaymentsStatusAlert from "../../components/payments/PaymentsStatusAlert";

import {
  checkAuth,
  selectToken,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import {
  selectRefresh,
  selectCurrentPage,
  selectFilter,
  selectLimit,
} from "../../redux/store/payments-slice";
import PaymentsModal from "../../components/payments/PaymentsModal";
import PaymentsDeleteModal from "../../components/payments/PaymentsDeleteModal";
import PaymentsTable from "../../components/payments/PaymentsTable";
import WithAuth from "../../components/common/WithAuth";

function PaymentsPage() {
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
        fetchPaymentsThunk({
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
      <title>الدفعات المالية</title>
      <PaymentsModal></PaymentsModal>
      <PaymentsStatusAlert></PaymentsStatusAlert>
      <PaymentsDeleteModal></PaymentsDeleteModal>
      <PaymentsBar></PaymentsBar>

      <PaymentsTable></PaymentsTable>
      <PaymentsPaginationBar></PaymentsPaginationBar>
    </>
  );
}

export default WithAuth(PaymentsPage);
