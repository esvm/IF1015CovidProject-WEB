import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

import styles from './genericTable.module.scss';

const PAGE_SIZE = 20;

function Table({
  columns,
  data,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
      initialState: { pageSize: PAGE_SIZE },
    },
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <div className={styles.genericTable}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <AiOutlineDown />
                        : <AiOutlineUp />
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page
            .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
            .map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className={styles.pagination}>
        <span>
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <div className={styles.pagination__buttons}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}

function GenericTable(props) {
  const { data: givenData, columns } = props;

  return (
    <Table
      columns={columns}
      data={givenData}
      pageCount={Math.ceil(givenData.length / PAGE_SIZE)}
    />
  );
}

export default GenericTable;
