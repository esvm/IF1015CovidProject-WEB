import React from 'react';

import HomeComponent from './home.component'
import { SocketManager } from '../../contexts/generalContext';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seeTable: false };
  }

  render() {
    return (
      <SocketManager>
        <HomeComponent />
      </SocketManager>
    );
  }
}

export class DemoHome extends React.Component {
  render() {
    return (
      <SocketManager useDemo={true}>
        <HomeComponent useDemo={true}/>
      </SocketManager>
    );
  }
}