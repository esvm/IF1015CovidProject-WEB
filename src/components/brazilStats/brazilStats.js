import React from 'react'

import BrazilStatsComponent from './brazilStats.component'

import { SocketContext } from '../../contexts/generalContext'
import { addDays, formatDate } from '../../utils/dateUtils'

const INITIAL_DATE = formatDate(addDays(new Date(), -7));

export default class BrazilStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: INITIAL_DATE };
    }
    render() {
        const { selectedDate } = this.state

        return (
            <SocketContext.Consumer>
                {({ countries }) =>
                    <BrazilStatsComponent data={countries.get("Brazil")} selectedDate={selectedDate} />
                }
            </SocketContext.Consumer>
        )
    }
}