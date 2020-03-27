import React, { useState } from "react";
import { List, TablePagination } from "@material-ui/core";
import PropTypes from "prop-types";

const PaginatedList = ({
  items,
  renderItem,
  filter,
  pagination,
  currentPage,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onChangeRowsPerPage
}) => {
  rowsPerPage = rowsPerPage || rowsPerPageOptions[0];

  const [page, setPage] = useState(currentPage);
  const [maxRowsPerPage, setMaxRowsPerPage] = useState(rowsPerPage);

  const handlePageChange = (e, newPage) => {
    onPageChange && onPageChange(newPage);
    setPage(newPage);
  };

  const onMaxRowsPerPageChange = event => {
    onChangeRowsPerPage && onChangeRowsPerPage(event.target.value);
    onPageChange && onPageChange(0);
    setMaxRowsPerPage(event.target.value);
    setPage(0);
  };

  const filteredItems = items.filter(filter);
  const itemsToRender = pagination
    ? filteredItems.slice(page * maxRowsPerPage, (page + 1) * maxRowsPerPage)
    : filteredItems;
  const itemsList = itemsToRender.map(renderItem);

  return (
    <React.Fragment>
      <List>{itemsList}</List>
      {pagination && (
        <TablePagination
          component="div"
          count={filteredItems.length}
          rowsPerPage={maxRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangeRowsPerPage={onMaxRowsPerPageChange}
          page={page}
          onChangePage={handlePageChange}
        />
      )}
    </React.Fragment>
  );
};

PaginatedList.defaultProps = {
  filter: () => true,
  pagination: true,
  currentPage: 0,
  rowsPerPageOptions: [10, 25, 50, 100]
};

PaginatedList.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  filter: PropTypes.func,
  pagination: PropTypes.bool,
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  onPageChange: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func
};

export default PaginatedList;
