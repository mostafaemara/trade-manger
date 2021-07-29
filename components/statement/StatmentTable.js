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
  const content =
    status === "succeeded" ? (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan='2'>العميل</th>
            <th colSpan='3'>{statment.client.name}</th>
          </tr>
          <tr>
            <th>الوزن الكلي بالقنطار</th>
            <th>الوزن الصافي</th>
            <th>عدد الشحنات</th>
            <th>عدد الدفعات المالية</th>
            <th>عدد الشحنات الغير مسعرة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{statment.totalKantarWeight.toFixed(3)}</td>
            <td>{statment.totalNetWeight.toFixed(3)}</td>
            <td>{statment.shipments.length}</td>
            <td>{statment.payments.length}</td>
            <td>{statment.notPricedShipments.length}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan='1'> المديونيات (ج.م)</th>
            <th colSpan='2'> المدفوعات (ج.م)</th>
            <th colSpan='2'> المبغ المتبقي (ج.م)</th>
          </tr>
          <tr>
            <td colSpan='1'>{statment.debts.toFixed(3)}</td>
            <td colSpan='2'>{statment.dues.toFixed(3)}</td>
            <td colSpan='2'>{statment.remaining.toFixed(3)}</td>
          </tr>
        </tfoot>
      </Table>
    ) : (
      <div></div>
    );
  return (
    <div>
      {" "}
      {status === "loading" ? (
        <div className='d-flex justify-content-center p-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export default StatmentTable;
