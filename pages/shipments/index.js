import React, { useEffect } from "react";
import PrivatePage from "../../components/wrapper/protect-route";
import { useTable, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShipmentsThunk,
  selectFilter,
} from "../../redux/store/shipments-slice";
import "bootstrap/dist/css/bootstrap.css";
import ShipmentsBar from "../../components/ShipmentsBar";
import { Spinner } from "react-bootstrap";
import PaginationBar from "../../components/tables/PaginationBar";
import Table from "../../components/tables/Table";
import ShipmentsStatusAlert from "../../components/ShipmentsStatusAlert";
import CellActionButtons from "../../components/CellActionButtons";

import {
  netWeightPerKg,
  netWeightPerKantar,
  calculateNetPrice,
} from "../../utils/shipment-helper";
import {
  selectToken,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import {
  selectStatus,
  selectCurrentPage,
  selectTotalPages,
  selectTotalItems,
  selectShipments,
} from "../../redux/store/shipments-slice";
import ShipmentModal from "../../components/ShipmentModal";
import ShipmentsDeleteModal from "../../components/ShipmentsDeleteModal";

function ShipmentsPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const token = useSelector(selectToken);
  const isAuthnticated = useSelector(selectIsAuthnticated);
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
          action: shipment,
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
        Cell: function CellComponents({ cell }) {
          return <CellActionButtons shipment={cell.value} />;
        },
      },
    ],
    []
  );
  const table = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 },
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
    if (isAuthnticated) {
      dispatch(
        fetchShipmentsThunk({
          client: filter.activeClient ? filter.client : "",
          startDate: filter.activeStartDate ? filter.startDate : "",
          endDate: filter.activeEndDate ? filter.endDate : "",
          limit: pageSize,
          page: pageIndex + 1,
          token: token,
        })
      );
    }
  }, [pageIndex, pageSize, dispatch, token, filter]);

  return (
    <PrivatePage>
      <title>Shipments</title>
      <ShipmentModal></ShipmentModal>
      <ShipmentsStatusAlert></ShipmentsStatusAlert>
      <ShipmentsDeleteModal></ShipmentsDeleteModal>
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
