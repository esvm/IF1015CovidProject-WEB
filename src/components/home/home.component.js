import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import styles from './home.module.scss';

import Header from '../header/header';
import StatesTable from '../statesTable/statesTable';
import BrazilPage from '../brazilPage/brazilPage';

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seeTable: false };
  }

  render() {
    const { seeTable } = this.state;

    return (
      <div className={styles.home}>
        <Header text="Situação Nacional" />
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