import React from 'react';

import styles from './about.module.scss';

import Header from '../header/header';

const About = () => (
  <div className={styles.about}>
    <Header text="ABOUT" />
  </div>
);

export default About;
