import React, { useState } from "react";
import { List, TablePagination } from "@material-ui/core";
import PropTypes from "prop-types";

const PaginatedList = ({
  items,
  renderItem,
  filter = () => true,
  pagination = true,
  rowsPerPageOptions = [10, 25, 50, 100]
}) => {
  const [page, setPage] = useState(0);
  const [maxRowsPerPage, setMaxRowsPerPage] = useState(rowsPerPageOptions[0]);

  const onPageChange = (e, newPage) => setPage(newPage);
  const onMaxRowsPerPageChange = event => {
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
          onChangePage={onPageChange}
        />
      )}
    </React.Fragment>
  );
};

PaginatedList.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  filter: PropTypes.func,
  pagination: PropTypes.bool,
  rowsPerPageOptions: PropTypes.array
};

export default PaginatedList;
