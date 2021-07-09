import React from 'react'
import { useTable } from "react-table";
import PrivatePage from '../../components/wrapper/protect-route';
import "bootstrap/dist/css/bootstrap.css";
import { SHIPMENTS } from "../../mock-data";
function ShipmentsPage() {
    const shipments = SHIPMENTS;

    const data = React.useMemo(
        () => shipments.map(
            shipment => ({

                client: shipment.client,
                date: new Date(shipment.date).toLocaleString('en-US'),
                weight: shipment.weight,
                bags: shipment.bags,
                extraBags: shipment.extraBags,
                gauge: shipment.gauge,
                extraGauge: shipment.extraGauge,
                expenses: shipment.expenses,
                pricePerKantar: shipment.pricePerKantar,
                isPriced: shipment.isPriced ? "Priced" : "Not Priced",
                creator: shipment.creator


            })
        ),

        shipments
    );
    const columns = React.useMemo(
        () => [
            {
                Header: 'Client',
                accessor: 'client', // accessor is the "key" in the data
            },
            {
                id: "timestamp",
                Header: 'Date',
                accessor: 'date',
            }, {
                Header: 'Weight',
                accessor: 'weight',

            }, {
                Header: 'Bags',
                accessor: 'bags',
            },
            {
                Header: 'Extra Bags',
                accessor: 'extraBags',
            },
            {
                Header: 'Gauge',
                accessor: 'gauge',
            },
            {
                Header: 'Extra Gauge',
                accessor: 'extraGauge',
            },
            {
                Header: 'Expenses',
                accessor: 'expenses',
            },
            {
                Header: 'Price Per kantar',
                accessor: 'pricePerKantar',
            },
            {
                Header: 'Is Priced',
                accessor: 'isPriced',
            },
            {
                Header: 'Creator',
                accessor: 'creator',
            },
        ],
        []
    );
    const table = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
    return (
        <PrivatePage>  <div>
            <title>Shipments</title>

            <table className="table table-bordered" {...getTableProps()}>
                <thead >{
                    headerGroups.map(headerGroup => (<tr className="table-primary" {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (<th {...column.getHeaderProps()}>
                            {
                                column.render("Header")
                            }


                        </th>))}

                    </tr>))
                }




                </thead>
                <tbody {...getTableBodyProps()}>{
                    rows.map(row => {
                        prepareRow(row)
                        return (<tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell => (<td {...cell.getCellProps()}>

                                    {cell.render("Cell")
                                    }
                                </td>))

                            }
                        </tr>)
                    })
                }


                </tbody>
            </table>

        </div></PrivatePage >

    )
}

export default ShipmentsPage
