import React from "react";
import Table from "../../components/common/Table";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { Spinner, Alert } from "react-bootstrap";
import ClientsCellActionButtons from "../../components/clients/ClientsCellActionButtons";

import { selectStatus, selectClients } from "../../redux/store/clients-slice";
function ClientsTable() {
  const clients = useSelector(selectClients);

  const data = React.useMemo(
    () =>
      clients.map((client) => {
        return {
          name: client.name,
          phoneNumber: client.phoneNumber,
          action: client,
        };
      }),

    [clients]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "العميل",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "رقم الهاتف",
        accessor: "phoneNumber",
      },

      {
        Header: "تعديل/حزف",
        accessor: "action",
        Cell: function CellComponents({ cell }) {
          return <ClientsCellActionButtons client={cell.value} />;
        },
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data,
  });
  const clientsStatus = useSelector(selectStatus);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;
  const content =
    clients.length === 0 ? (
      <Alert variant='warning' show>
        <p>!لا يوجد عملاء لم يتم اضافة عملاء بعد</p>
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
      {clientsStatus === "loading" ? (
        <div className='d-flex justify-content-center p-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export default ClientsTable;
