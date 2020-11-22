import React from 'react'

import StateStatsComponent from './stateStats.component'

import { SocketContext } from '../../contexts/generalContext'

export default class StateStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, selectedDate: '2020-02-01' };
    }
    render() {
        const { district, returnToBrazil } = this.props

        return (
            <SocketContext.Consumer>
                {({ states }) =>
                    <StateStatsComponent
                        data={states.get(district)}
                        returnToBrazil={returnToBrazil}
                    />
                }
            </SocketContext.Consumer>
        )
    }
}