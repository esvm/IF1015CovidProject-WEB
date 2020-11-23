import React from 'react'
import { useParams } from 'react-router-dom'

import styles from './home.module.scss'

import Header from '../header/header'
import BrazilPage from '../brazilPage/brazilPage'
import { SocketManager } from '../../contexts/generalContext'

export class Home extends React.Component {
  render() {
    return (
      <SocketManager>
        {renderHome()}
      </SocketManager>
    )
  }
}

export class DemoHome extends React.Component {
  render() {
    return (
      <SocketManager useDemo={true}>
        {renderHome()}
      </SocketManager>
    )
  }
}
function renderHome() {
  return <div className={styles.home}>
    <Header text="Situação Nacional" />
    <div className={styles.home__content}>
      <BrazilPage />
    </div>
  </div>
}

