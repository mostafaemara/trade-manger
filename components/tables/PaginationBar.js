import React from 'react'
import { Pagination } from "react-bootstrap";
function PaginationBar(props) {
    return (
        <div>
            <Pagination size="md">

                <Pagination.Prev disabled={!props.canPreviousPage} onClick={props.previousPage} />



                {props.pageOptions.map(index => <Pagination.Item activeLabel={false} key={index} active={props.pageIndex == index} onClick={() => props.gotoPage(index)} >
                    {index + 1}
                </Pagination.Item>)


                }



                <Pagination.Next disabled={!props.canNextPage} onClick={props.nextPage} />


            </Pagination>
        </div>
    )
}

export default PaginationBar
