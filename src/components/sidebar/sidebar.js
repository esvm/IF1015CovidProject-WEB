import React from 'react';
import { GiBrazil, /*GiInfo,*/ GiWorld } from 'react-icons/gi';


import SidebarItem from "./sidebarItem/sidebarItem";
import styles from './sidebar.module.scss';

const Sidebar = () => (
  <div className={styles.sidebar}>
    <SidebarItem
      title="Brasil"
      link="/"
    >
      <GiBrazil />
    </SidebarItem>

    <SidebarItem
      title="Mundo"
      link="/worldwide"
    >
      <GiWorld />
    </SidebarItem>

    {/* <SidebarItem
      title="Sobre"
      link="/about"
    >
      <GiInfo />
    </SidebarItem> */}
  </div>
);

export default Sidebar;
