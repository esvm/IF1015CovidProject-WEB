import React, { useState } from 'react';
import _ from 'lodash';

import styles from './statesTable.module.scss';

import GenericTable from '../GenericTable/genericTable';
import { SocketContext } from '../../contexts/generalContext';

const columns = [
    {
        Header: 'Estado',
        accessor: 'state',
        width: '40%'
    },
    {
        Header: 'Suspeitas',
        accessor: 'suspects',
        width: '20%'
    },
    {
        Header: 'Confirmados',
        accessor: 'cases',
        width: '20%'
    },
    {
        Header: 'Mortes',
        accessor: 'deaths',
        width: '20%'
    },
];

const StatesTable = () => {
    const [sortedBy, setSortedBy] = useState({});

    return (
        <SocketContext.Consumer>
            {({ states }) => (
                <div className={styles.statesTable}>
                    <GenericTable
                        columns={columns}
                        sortedBy={sortedBy}
                        changeSortedBy={setSortedBy}
                        pagination={false}
                        data={_.orderBy(
                            Array.from(states, ([name, value]) => value),
                            sortedBy.accessor,
                            sortedBy.isSortedAsc ? 'asc' : 'desc'
                        )}
                    />
                </div>
            )}
        </SocketContext.Consumer>
    );
};

export default StatesTable;
