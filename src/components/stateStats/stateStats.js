import React from 'react'

import StateStatsComponent from './stateStats.component'

import { SocketContext } from '../../contexts/generalContext'

export default class StateStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, selectedDate: '2020-02-01' };
    }
    render() {
        const { district } = this.props

        return (
            <SocketContext.Consumer>
                {({ statesData }) =>
                    <StateStatsComponent data={statesData.get(district)} />
                }
            </SocketContext.Consumer>
        )
    }
}