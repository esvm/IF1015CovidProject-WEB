import React from "react";
import _ from "lodash";
import { connect } from 'react-redux';

export const SocketContext = React.createContext({
  prices: {}
});

export const useWebsocket = () => React.useContext(SocketContext);

export class WrappedSocketManager extends React.Component {

  state = {
    statesData: {}
  }

  socket = null;

  constructor(props) {
    super(props);

    const connection = new WebSocket('ws://if1015covidproject-consumers.herokuapp.com/requests');

    connection.onopen = () => {
      console.log('connected to requests server');
    };

    connection.onclose = () => {
      console.log('connection closed');
    };

    connection.onmessage = e => {
      const data = JSON.parse(e.data);
      const { countriesDataJSON, brazilData: brazilDataJSON } = data;
      const statesData = new Map();

      _.forEach(JSON.parse(brazilDataJSON).data, item => statesData.set(item.uf, item));

      console.log({ data, brazilDataJSON, statesData })

      this.setState({ statesData })
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
    return (
      <SocketContext.Provider value={{
        statesData: this.state.statesData
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