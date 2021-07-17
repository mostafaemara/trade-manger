import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPagination,
  setCurrentPage,
} from "../../redux/store/shipments-slice";
function PaginationBar() {
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
      <Pagination size='md'>
        <Pagination.Prev disabled={!canPreviousPage} onClick={handlePrevPage} />

        {count.map((index) => {
          if (index <= 10) {
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
          }
        })}

        <Pagination.Next disabled={!canNextPage} onClick={handleNextPage} />
      </Pagination>
    </div>
  );
}

export default PaginationBar;
