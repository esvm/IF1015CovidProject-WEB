import React from 'react';
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from './sidebarItem.module.scss';

const SidebarItem = props => (
  <Link to={props.link} className={styles.sidebar_item}>
    <span className={styles.sidebar_item__icon}>
      {props.children}
    </span>
    <span className={styles.sidebar_item__title}>
      {props.title}
    </span>
  </Link>
);

SidebarItem.propTypes = {
  title: propTypes.string,
  link: propTypes.string
}

export default SidebarItem;
