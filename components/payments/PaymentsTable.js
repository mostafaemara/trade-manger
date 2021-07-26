import React from "react";
import Table from "../../components/common/Table";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { Spinner } from "react-bootstrap";
import PaymentsCellActionButtons from "../../components/payments/PaymentsCellActionButtons";

import { selectStatus, selectPayments } from "../../redux/store/payments-slice";
function PaymentsTable() {
  const payments = useSelector(selectPayments);

  const data = React.useMemo(
    () =>
      payments.map((payment) => {
        return {
          client: payment.client.name,
          date: new Date(payment.date).toLocaleString("ar-EG"),

          recipient: payment.recipient,
          cash: payment.cash,
          creator: payment.creator.name,
          action: payment,
        };
      }),

    [payments]
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
        Header: "المبلغ",
        accessor: "cash",
      },
      {
        Header: "المستلم",
        accessor: "recipient",
      },

      {
        Header: "بواسطة",
        accessor: "creator",
      },
      {
        Header: "تعديل/حزف",
        accessor: "action",
        Cell: function CellComponents({ cell }) {
          return <PaymentsCellActionButtons payment={cell.value} />;
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
  const paymentsStatus = useSelector(selectStatus);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

  return (
    <div>
      {" "}
      {paymentsStatus === "loading" ? (
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

export default PaymentsTable;
