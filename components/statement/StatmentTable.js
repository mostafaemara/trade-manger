import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { Spinner, Alert } from "react-bootstrap";

import { selectStatus, selectStatment } from "../../redux/store/statment-slice";
function StatmentTable() {
  const statment = useSelector(selectStatment);
  console.log("statmentssssss", statment);
  const status = useSelector(selectStatus);

  return (
    <div>
      {" "}
      {status === "loading" ? (
        <div className='d-flex justify-content-center p-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>العميل</th>
              <th>{statment.client}</th>
            </tr>
          </thead>
        </Table>
      )}
    </div>
  );
}

export default StatmentTable;
