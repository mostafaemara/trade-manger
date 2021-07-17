import React, { useEffect } from "react";
import Table from "../../components/common/Table";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import { Spinner } from "react-bootstrap";
import ShipmentCellActionButtons from "../../components/shipments/ShipmentCellActionButtons";
import {
  netWeightPerKg,
  netWeightPerKantar,
  calculateNetPrice,
} from "../../utils/shipment-helper";
import {
  setPagination,
  selectStatus,
  selectTotalPages,
  selectShipments,
} from "../../redux/store/shipments-slice";
function ShipmentsTable() {
  const totalPages = useSelector(selectTotalPages);
  const shipments = useSelector(selectShipments);
  const dispatch = useDispatch();
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
          return <ShipmentCellActionButtons shipment={cell.value} />;
        },
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 50 },
  });
  const shipmentsStatus = useSelector(selectStatus);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

  return (
    <div>
      {" "}
      {shipmentsStatus === "loading" ? (
        <div className='d-flex justify-content-center p-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <Table
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={rows}
          prepareRow={prepareRow}></Table>
      )}
    </div>
  );
}

export default ShipmentsTable;
