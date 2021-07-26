import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  selectPagination,
  setCurrentPage,
} from "../../redux/store/payments-slice";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.css";
function PaymentsPaginationBar() {
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

export default PaymentsPaginationBar;
