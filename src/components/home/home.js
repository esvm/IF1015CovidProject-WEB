import React from 'react'
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import styles from './home.module.scss'

import Header from '../header/header'
import BrazilPage from '../brazilPage/brazilPage'
import { SocketManager } from '../../contexts/generalContext'

const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: "#F9AA33",
    },
    '&$checked + $track': {
      backgroundColor: "#F9AA33",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mapView: false };
  }

  render() {
    return (
      <SocketManager>
        <div className={styles.home}>
          <Header text="COVID_WATCHER" />
          <div className={styles.home__content}>
            {this.state.mapView ? <BrazilPage /> : <span>eai</span>}
          </div>
          <div className={styles.home__footer}>
            <CustomSwitch
              onChange={
                (event) =>
                  this.setState({ mapView: event.target.checked })
              }
            />
            <span>Ver situação por estado</span>
          </div>
        </div>
      </SocketManager>
    )
  }
}
