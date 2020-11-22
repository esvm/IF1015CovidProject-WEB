import React from "react";
import _ from "lodash";
import { connect } from 'react-redux';

export const SocketContext = React.createContext({});

export const useWebsocket = () => React.useContext(SocketContext);

export class WrappedSocketManager extends React.Component {

  state = {
    statesData: new Map(),
    countriesData: new Map()
  }

  socket = null;

  constructor(props) {
    super(props);

    const connection = new WebSocket('wss://if1015covidproject-consumers.herokuapp.com/requests');

    connection.onopen = () => {
      console.log('connected to requests server');
    };

    connection.onclose = () => {
      console.log('connection closed');
    };

    connection.onmessage = e => {
      const data = JSON.parse(e.data);
      const { countriesData: countriesDataJSON, brazilData: brazilDataJSON } = data;

      if (this.state.brazilDataJSON !== brazilDataJSON) {
        const statesData = new Map();

        _.forEach(JSON.parse(brazilDataJSON).data, item => statesData.set(item.uf, item));
        this.setState({ brazilDataJSON, statesData });
      }

      if (this.state.countriesDataJSON !== countriesDataJSON) {
        const countriesData = new Map();

        _.forEach(JSON.parse(countriesDataJSON).data, item => countriesData.set(item.country, item));
        this.setState({ countriesDataJSON, countriesData });
      }

    };
  }

  componentWillUnmount() {
    try {
      this.socket !== null && this.socket.disconnect();
    } catch (e) {
      // socket not connected
    }
  }

  render() {
    const { statesData, countriesData } = this.state;

    console.log({ statesData, countriesData })

    return (
      <SocketContext.Provider value={{
        statesData,
        countriesData
      }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export const SocketManager = connect(
  null
)(WrappedSocketManager);

export default SocketManager;