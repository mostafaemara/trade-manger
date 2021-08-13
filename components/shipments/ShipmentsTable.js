import React from "react";
import Table from "../../components/common/Table";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { Spinner, Alert } from "react-bootstrap";
import ShipmentCellActionButtons from "../../components/shipments/ShipmentCellActionButtons";
import {
  netWeightPerKg,
  netWeightPerKantar,
  calculateNetPrice,
} from "../../utils/shipment-helper";
import {
  selectStatus,
  selectShipments,
} from "../../redux/store/shipments-slice";
function ShipmentsTable() {
  const shipments = useSelector(selectShipments);

  const data = React.useMemo(
    () =>
      shipments.map((shipment) => {
        const netweightPerKg = netWeightPerKg(
          shipment.weight,
          shipment.bags,
          shipment.gauge,
          shipment.extraBags,
          shipment.extraGauge
        ).toFixed(3);
        const netweightPerKantar =
          netWeightPerKantar(netweightPerKg).toFixed(3);
        const netPrice = calculateNetPrice(
          shipment.pricePerKantar,
          netweightPerKantar,
          shipment.expenses
        ).toFixed(3);

        return {
          client: shipment.client.name,
          date: new Date(shipment.date).toLocaleString("ar-EG"),
          weight: shipment.weight,
          bags: shipment.bags,
          extraBags: shipment.extraBags,
          gauge: shipment.gauge,
          extraGauge: shipment.extraGauge,
          expenses: shipment.expenses,
          pricePerKantar: shipment.pricePerKantar,
          isPriced: shipment.isPriced ? "مسعر" : "غير مسعر",
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
        Header: "العميل",
        accessor: "client", // accessor is the "key" in the data
      },
      {
        id: "timestamp",
        Header: "التاريخ",
        accessor: "date",
      },
      {
        Header: "الوزن",
        accessor: "weight",
      },
      {
        Header: "الوزن الصافي  (ك.ج)",
        accessor: "netweightPerKg",
      },
      {
        Header: "الوزن الصافي (قنطار)",
        accessor: "netweightPerKantar",
      },
      {
        Header: "عدد الاكياس",
        accessor: "bags",
      },
      {
        Header: "عدد الشكاير",
        accessor: "extraBags",
      },
      {
        Header: "عيار الكيس",
        accessor: "gauge",
      },
      {
        Header: "عيار الشكاره",
        accessor: "extraGauge",
      },
      {
        Header: "المصاريف",
        accessor: "expenses",
      },
      {
        Header: "سعر القنطار",
        accessor: "pricePerKantar",
      },
      {
        Header: "المبلغ صافي",
        accessor: "netPrice",
      },
      {
        Header: "مسعر",
        accessor: "isPriced",
      },
      {
        Header: "بواسطة",
        accessor: "creator",
      },
      {
        Header: "تعديل/حزف",
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
  const content =
    shipments.length === 0 ? (
      <Alert variant='warning' show>
        <p>!لا يوجد شحنات </p>
      </Alert>
    ) : (
      <Table
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        page={rows}
        prepareRow={prepareRow}></Table>
    );
  return (
    <div>
      {" "}
      {shipmentsStatus === "loading" ? (
        <div className='d-flex justify-content-center p-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export default ShipmentsTable;
