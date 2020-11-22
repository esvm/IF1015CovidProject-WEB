import React from 'react'
import _ from 'lodash'

import styles from './countriesTable.module.scss'

import GenericTable from '../GenericTable/genericTable'
import { SocketContext } from '../../contexts/generalContext'

const columns = [
    {
        Header: 'País',
        accessor: 'country'
    },
    {
        Header: 'Suspeitas',
        accessor: 'cases'
    },
    {
        Header: 'Confirmados',
        accessor: 'confirmed'
    },
    {
        Header: 'Mortes',
        accessor: 'deaths'
    }
]

const CountriesTable = () => (
    <SocketContext.Consumer>
        {({ countries }) =>
            <div className={styles.countriesTable}>
                <GenericTable
                    columns={columns}
                    data={
                        Array.from(countries, ([name, value]) => value)
                    }
                />
            </div>
        }
    </SocketContext.Consumer>
);

export default CountriesTable;
