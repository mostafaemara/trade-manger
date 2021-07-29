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
    dispatch(setCurrentPage(index.selected));
  }
  const count = Array.from(Array(totalPages).keys());

  const dispatch = useDispatch();
  return (
    <ReactPaginate
      nextClassName='next'
      previousClassName='prev'
      breakLabel='...'
      containerClassName='pagination'
      pageClassName='page'
      onPageChange={handleGoToPage}
      previousLabel='السابق'
      nextLabel='التالي'
      pageCount={totalPages}
      pageRangeDisplayed={10}
      activeClassName='act'
      pageLinkClassName='link'
      nextLinkClassName='nextprev'
      previousLinkClassName='nextprev'></ReactPaginate>
  );
}

export default ShipmentsPaginationBar;
