import React, { useState } from 'react';
import _ from 'lodash';

import styles from './countriesTable.module.scss';

import GenericTable from '../GenericTable/genericTable';
import { SocketContext } from '../../contexts/generalContext';

const columns = [
    {
        Header: 'País',
        accessor: 'country',
        width: '40%'
    },
    {
        Header: 'Suspeitas',
        accessor: 'cases',
        width: '20%'
    },
    {
        Header: 'Confirmados',
        accessor: 'confirmed',
        width: '20%'
    },
    {
        Header: 'Mortes',
        accessor: 'deaths',
        width: '20%'
    },
];

const CountriesTable = () => {
    const [index, setIndex] = useState(0);
    const [pagination, setPagination] = useState(true);
    const [sortedBy, setSortedBy] = useState({});

    return (
        <SocketContext.Consumer>
            {({ countries }) => (
                <div className={styles.countriesTable}>
                    <GenericTable
                        columns={columns}
                        pageIndex={index}
                        changePage={setIndex}
                        sortedBy={sortedBy}
                        changeSortedBy={setSortedBy}
                        pagination={pagination}
                        changePagination={setPagination}
                        data={_.orderBy(
                            Array.from(countries, ([name, value]) => value),
                            sortedBy.accessor,
                            sortedBy.isSortedAsc ? 'asc' : 'desc'
                        )}
                    />
                </div>
            )}
        </SocketContext.Consumer>
    );
};

export default CountriesTable;
