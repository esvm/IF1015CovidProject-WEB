import React from 'react';
import _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import { useTable, useBlockLayout } from 'react-table';
import {
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import { withStyles } from '@material-ui/core/styles';

import styles from './genericTable.module.scss';

const PAGE_SIZE = 10;

const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: '#F9AA33',
    },
    '&$checked + $track': {
      backgroundColor: '#F9AA33',
    },
  },
  checked: {},
  track: {},
})(Switch);

function Table({
  columns,
  data,
  pageIndex,
  pageCount,
  changePage,
  sortedBy,
  changeSortedBy,
  pagination,
  changePagination,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    useBlockLayout,
  });

  return (
    <div className={styles.genericTable}>
      {changePagination && (
        <div className={styles.genericTable__switch}>
          Paginação
          <CustomSwitch
            checked={pagination}
            onChange={(event) => {
              changePagination(event.target.checked);
            }}
          />
        </div>
      )}
      <div className={styles.genericTable__table}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    width={column.width}
                    onClick={() =>
                      changeSortedBy({
                        accessor: column.accessor,
                        isSortedAsc: !sortedBy.isSortedAsc,
                      })
                    }
                    {...column.getHeaderProps()}
                  >
                    <span>
                      <span className={styles.genericTable__headerText}>
                        {column.render('Header')}
                      </span>
                      {/* Add a sort direction indicator */}
                      {_.get(column, 'accessor') === sortedBy.accessor ? (
                        sortedBy.isSortedAsc ? (
                          <AiOutlineUp />
                        ) : (
                          <AiOutlineDown />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <span>{cell.render('Cell')}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {_.isEmpty(data) && (
        <div className={styles.noDataAlert}>
          Essa tabela ainda não recebeu dados. Aguarde mais um pouco ;)
        </div>
      )}
      {pagination && (
        <div className={styles.pagination}>
          <span>
            <strong>
              {pageIndex + 1} de {pageCount}
            </strong>
          </span>

          <div className={styles.pagination__buttons}>
            <AiOutlineLeft
              onClick={() => changePage(Math.max(pageIndex - 1, 0))}
            />
            <AiOutlineRight
              onClick={() => changePage(Math.min(pageIndex + 1, pageCount - 1))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function GenericTable(props) {
  const {
    data: givenData,
    columns,
    pageIndex,
    changePage,
    sortedBy,
    changeSortedBy,
    pagination,
    changePagination,
  } = props;

  const data = pagination
    ? givenData.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
    : givenData;

  return (
    <Table
      columns={columns}
      data={data}
      pageIndex={pageIndex}
      changePage={changePage}
      sortedBy={sortedBy}
      pagination={pagination}
      changePagination={changePagination}
      changeSortedBy={changeSortedBy}
      pageCount={Math.ceil(givenData.length / PAGE_SIZE)}
    />
  );
}

export default GenericTable;
