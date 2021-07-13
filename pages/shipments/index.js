import React, { useEffect } from "react";
import PrivatePage from "../../components/wrapper/protect-route";
import { useTable, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipmentsThunk } from "../../redux/store/shipments-slice";
import "bootstrap/dist/css/bootstrap.css";
import ShipmentsBar from "../../components/ShipmentsBar";
import { Spinner, ButtonToolbar, Button } from "react-bootstrap";
import PaginationBar from "../../components/tables/PaginationBar";
import Table from "../../components/tables/Table";
import {
  netWeightPerKg,
  netWeightPerKantar,
  calculateNetPrice,
} from "../../utils/shipment-helper";
import { selectUser, selectToken } from "../../redux/store/auth-slice";
import {
  selectStatus,
  selectCurrentPage,
  selectTotalPages,
  selectTotalItems,
  selectShipments,
} from "../../redux/store/shipments-slice";
function ShipmentsPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const totalPages = useSelector(selectTotalPages);

  const shipments = useSelector(selectShipments);
  const shipmentsStatus = useSelector(selectStatus);

  const data = React.useMemo(
    () =>
      shipments.map((shipment) => {
        const netweightPerKg = netWeightPerKg(
          shipment.weight,
          shipment.bags,
          shipment.gauge,
          shipment.extraBags,
          shipment.extraGauge
        ).toFixed(2);
        const netweightPerKantar =
          netWeightPerKantar(netweightPerKg).toFixed(2);
        const netPrice = calculateNetPrice(
          shipment.pricePerKantar,
          netweightPerKantar,
          shipment.expenses
        ).toFixed(2);

        return {
          client: shipment.client.name,
          date: new Date(shipment.date).toLocaleString("en-US"),
          weight: shipment.weight,
          bags: shipment.bags,
          extraBags: shipment.extraBags,
          gauge: shipment.gauge,
          extraGauge: shipment.extraGauge,
          expenses: shipment.expenses,
          pricePerKantar: shipment.pricePerKantar,
          isPriced: shipment.isPriced ? "Priced" : "Not Priced",
          creator: shipment.creator.name,
          action: shipment._id,
          netweightPerKg,
          netweightPerKantar,
          netPrice,
        };
      }),

    [shipments]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Client",
        accessor: "client", // accessor is the "key" in the data
      },
      {
        id: "timestamp",
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "Net Weight(KG)",
        accessor: "netweightPerKg",
      },
      {
        Header: "Net Weight (Kantar)",
        accessor: "netweightPerKantar",
      },
      {
        Header: "Bags",
        accessor: "bags",
      },
      {
        Header: "Extra Bags",
        accessor: "extraBags",
      },
      {
        Header: "Gauge",
        accessor: "gauge",
      },
      {
        Header: "Extra Gauge",
        accessor: "extraGauge",
      },
      {
        Header: "Expenses",
        accessor: "expenses",
      },
      {
        Header: "Price (kantar)",
        accessor: "pricePerKantar",
      },
      {
        Header: "Net Price",
        accessor: "netPrice",
      },
      {
        Header: "Is Priced",
        accessor: "isPriced",
      },
      {
        Header: "Creator",
        accessor: "creator",
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: (cell) => {
          return (
            <ButtonToolbar>
              <Button
                className='m-2'
                variant='warning'
                disabled={!(user.authority >= 3)}>
                Edite
              </Button>
              <Button
                className='m-2'
                variant='danger'
                disabled={!(user.authority >= 4)}>
                Delete
              </Button>
            </ButtonToolbar>
          );
        },
      },
    ],
    []
  );
  const table = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: totalPages,
    },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = table;

  useEffect(() => {
    dispatch(
      fetchShipmentsThunk({
        size: pageSize,
        page: pageIndex + 1,
        token: token,
      })
    );
  }, [fetchShipmentsThunk, pageIndex, pageSize]);
  return (
    <PrivatePage>
      <title>Shipments</title>

      <ShipmentsBar></ShipmentsBar>

      {shipmentsStatus === "loading" ? (
        <div className='d-flex justify-content-center p-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <Table
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}></Table>
      )}
      <PaginationBar
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        pageOptions={pageOptions}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        canNextPage={canNextPage}
        nextPage={nextPage}></PaginationBar>
    </PrivatePage>
  );
}

export default ShipmentsPage;
