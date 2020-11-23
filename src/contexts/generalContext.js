import React from "react";
import _ from "lodash";
import { connect } from 'react-redux';

export const SocketContext = React.createContext({
  prices: {}
});

export const useWebsocket = () => React.useContext(SocketContext);

export class WrappedSocketManager extends React.Component {

  state = {
    states: new Map(),
    countries: new Map()
  }

  socket = null;

  constructor(props) {
    super(props);

    const { useDemo } = props;

    const connection = new WebSocket('wss://if1015covidproject-consumers.herokuapp.com/requests');

    connection.onopen = () => {
      console.log('connected to requests server');
    };

    connection.onclose = () => {
      console.log('connection closed');
    };

    connection.onmessage = e => {
      const data = JSON.parse(e.data);
      const { countriesData } = data;
      const statesData = useDemo ? data.demoData : data.brazilData
      this.setState({useDemo: useDemo});
      
      if (this.state.statesData !== statesData) {
        console.log(data);
        const states = new Map();

        _.forEach(statesData, item => states.set(item.uf, item));
        this.setState({ statesData, states });
      }

      if (this.state.countriesData !== countriesData) {
        const countries = new Map();

        _.forEach(countriesData, item => countries.set(item.country, item));
        this.setState({ countriesData, countries });
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
    const { states, countries } = this.state;

    return (
      <SocketContext.Provider value={{
        states,
        countries
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