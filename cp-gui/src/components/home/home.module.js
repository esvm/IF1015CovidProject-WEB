import React from 'react';
import propTypes from "prop-types";
import { MapBrazil } from 'react-brazil-map'

import styles from './home.module.scss'

import Header from "../header/header"



const HomeModule = props => (
    <div className={styles.home}>
        <Header text="COVID_WATCHER" />
        <MapBrazil height={500} fill="#F9AA33" />
    </div>
);

HomeModule.propTypes = {
    data: propTypes.object
}

export default HomeModule;