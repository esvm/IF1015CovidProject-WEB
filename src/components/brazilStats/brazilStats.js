import React from 'react'

import BrazilStatsComponent from './brazilStats.component'

import { SocketContext } from '../../contexts/generalContext'
import { addDays, formatDate } from '../../utils/dateUtils'
import _ from 'lodash'

const INITIAL_DATE = formatDate(addDays(new Date(), -7));

export default class BrazilStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: INITIAL_DATE };
    }
    render() {
        const { district } = this.props
        const { useDataFromAPI, apiData } = this.state

        const fetchBrazilCasesByDate = (e) => {
            var date = e.target.value;
            this.setState({ selectedDate: date });

            console.log(date);
            const apiUrl = `https://if1015covidreports-api.herokuapp.com/reports/brazil/${date}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((d) => {
                    var brasilCasesInDate = {
                        date: date,
                        cases: 0,
                        deaths: 0,
                        suspects: 0
                    }
                    _.forEach(d.filter(x => x.datetime.split('T')[0] === date), (s) => {
                        brasilCasesInDate.cases += s.cases;
                        brasilCasesInDate.deaths += s.deaths;
                        brasilCasesInDate.suspects += s.suspects;
                    })
                    this.setState({ useDataFromAPI: true, apiData: brasilCasesInDate});
                }).catch(error => console.log('error: ', error));
        }

        const returnToContext = () => {
            this.setState({ useDataFromAPI: false, selectedDate: INITIAL_DATE });
        }

        return (
            <SocketContext.Consumer>
                {({ countries }) =>
                    <BrazilStatsComponent 
                        data={useDataFromAPI ? apiData : countries.get("Brazil")} 
                        selectedDate={this.state.selectedDate} 
                        onChangeData={fetchBrazilCasesByDate}
                        usingAPI={useDataFromAPI}
                        returnToContext={returnToContext} />
                }
            </SocketContext.Consumer>
        )
    }
}