import React from 'react'

import BrazilStatsComponent from './brazilStats.component'

import { SocketContext } from '../../contexts/generalContext'

export default class BrazilStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, selectedDate: '2020-02-01' };
    }
    render() {
        return (
            <SocketContext.Consumer>
                {({ countriesData }) =>
                    <BrazilStatsComponent data={countriesData.get("Brazil")} />
                }
            </SocketContext.Consumer>
        )
    }
}