import React from 'react';
import propTypes from 'prop-types';

import styles from './header.module.scss';

const Header = props => (
  <div className={styles.header}>
    <h1 className={styles.header__text}>COVID_WATCHER</h1>
    <p className={styles.header__subtext}>{props.text}</p>
  </div>
);

Header.propTypes = {
  text: propTypes.string
}

export default Header;
