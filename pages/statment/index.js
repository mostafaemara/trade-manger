import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchStatmentThunk } from "../../redux/store/statment-slice";
import "bootstrap/dist/css/bootstrap.css";

import StatmentBar from "../../components/statement/StatmentBar";
import StatmentStatusAlert from "../../components/statement/StatmentStatusAlert";

import {
  checkAuth,
  selectToken,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import { selectFilter } from "../../redux/store/statment-slice";

import StatmentTable from "../../components/statement/StatmentTable";
import WithAuth from "../../components/common/WithAuth";

function StatmentPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const token = useSelector(selectToken);
  const isAuthnticated = useSelector(selectIsAuthnticated);

  useEffect(() => {
    if (isAuthnticated) {
      dispatch(checkAuth());
      dispatch(
        fetchStatmentThunk({
          id: filter.client,

          token: token,
        })
      );
    }
  }, [dispatch, token, filter]);

  return (
    <>
      <title>Statment</title>

      <StatmentStatusAlert></StatmentStatusAlert>

      <StatmentBar></StatmentBar>

      <StatmentTable></StatmentTable>
    </>
  );
}

export default WithAuth(StatmentPage);
