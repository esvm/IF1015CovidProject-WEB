import React from 'react';
import Switch from '@material-ui/core/Switch';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { withStyles } from '@material-ui/core/styles';

import styles from './home.module.scss';

import Header from '../header/header';
import StatesTable from '../statesTable/statesTable';
import BrazilPage from '../brazilPage/brazilPage';
import axios from 'axios';

const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: 'white',
    },
    '&$checked + $track': {
      backgroundColor: 'white',
    },
  },
  checked: {},
  track: {},
})(Switch);

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seeTable: false, loading: false };
  }

  render() {
    const { seeTable, isDemoRunning, loading } = this.state;
    const { useDemo } = this.props;

    const startDemo = () => {
      this.setState({ loading: true });

      const apiUrl =
        'https://if1015covidproject-producers.herokuapp.com/demo-start';
      var date = '2020-04-27';
      axios
        .post(apiUrl, null, { params: { date } })
        .then((res) => {
          console.log(res);
          this.setState({ isDemoRunning: true, loading: false });
        })
        .catch((e) => {
          console.log('error: ', e);
        });
    };

    const stopDemo = () => {
      this.setState({ loading: true });

      const apiUrl =
        'https://if1015covidproject-producers.herokuapp.com/demo-stop';
      axios
        .post(apiUrl)
        .then((res) => {
          console.log(res);
          this.setState({ isDemoRunning: false, loading: false });
        })
        .catch((e) => {
          console.log('error: ', e);
        });
    };

    return (
      <div className={styles.home}>
        <div className={styles.home__header}>
          <Header text="Situação Nacional" />
          <div hidden={!useDemo}>
            Realtime
            <CustomSwitch
              checked={isDemoRunning}
              disabled={loading}
              onChange={(event) =>
                event.target.checked ? startDemo() : stopDemo()
              }
            />
          </div>
        </div>
        <div className={styles.home__content}>
          {seeTable ? <StatesTable /> : <BrazilPage />}
          {this.renderFooter()}
        </div>
      </div>
    );
  }

  renderFooter() {
    const { seeTable } = this.state;

    return (
      <div
        className={
          seeTable ? styles.home__footer__inverse : styles.home__footer
        }
      >
        {seeTable ? (
          <div
            className={styles.home__footer__content}
            onClick={() => this.setState({ seeTable: false })}
          >
            <BsArrowLeft />
            <span>Voltar a ver o mapa</span>
          </div>
        ) : (
          <div
            className={styles.home__footer__content}
            onClick={() => this.setState({ seeTable: true })}
          >
            <span>Ver informações dos estados em tabela</span>
            <BsArrowRight />
          </div>
        )}
      </div>
    );
  }
}
