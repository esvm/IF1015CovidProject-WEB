import React from 'react';

import styles from './worldwide.module.scss';

import Header from '../header/header';
import CountriesTable from '../countriesTable/countriesTable'
import { SocketManager } from '../../contexts/generalContext'

const Worldwide = () => (
  <SocketManager>
    <div className={styles.worldwide}>
      <Header text="Situação Mundial" />
      <div className={styles.worldwide__content}>
        <CountriesTable />
      </div>
    </div>
  </SocketManager>
);

export default Worldwide;
