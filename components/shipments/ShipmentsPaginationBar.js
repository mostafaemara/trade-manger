import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPagination,
  setCurrentPage,
} from "../../redux/store/shipments-slice";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.css";
function ShipmentsPaginationBar() {
  const {
    canPreviousPage,
    previousPage,
    totalPages,
    currentPage,

    canNextPage,
    nextPage,
  } = useSelector(selectPagination);

  function handleNextPage() {
    dispatch(setCurrentPage(nextPage));
  }
  function handlePrevPage() {
    dispatch(setCurrentPage(previousPage));
  }
  function handleGoToPage(index) {
    dispatch(setCurrentPage(index));
  }
  const count = Array.from(Array(totalPages).keys());

  const dispatch = useDispatch();
  return (
    <div>
      <Pagination dir='rtl' size='md'>
        <Pagination.Prev disabled={!canPreviousPage} onClick={handlePrevPage} />

        {count.map((index) => {
          return (
            <Pagination.Item
              activeLabel={false}
              key={index}
              active={currentPage == index}
              onClick={() => {
                handleGoToPage(index);
              }}>
              {index + 1}
            </Pagination.Item>
          );
        })}

        <Pagination.Next disabled={!canNextPage} onClick={handleNextPage} />
      </Pagination>
    </div>
  );
}

export default ShipmentsPaginationBar;
