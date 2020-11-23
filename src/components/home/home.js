import React from 'react'

import styles from './home.module.scss'

import Header from '../header/header'
import BrazilPage from '../brazilPage/brazilPage'
import { SocketManager } from '../../contexts/generalContext'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mapView: false };
  }

  render() {
    return (
      <SocketManager>
        <div className={styles.home}>
          <Header text="Situação Nacional" />
          <div className={styles.home__content}>
            <BrazilPage />
          </div>
        </div>
      </SocketManager>
    )
  }
}
