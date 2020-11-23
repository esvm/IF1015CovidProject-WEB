import React from 'react'

import BrazilStatsComponent from './brazilStats.component'

import { SocketContext } from '../../contexts/generalContext'
import { formatDate } from '../../utils/dateUtils'
import _ from 'lodash'

const INITIAL_DATE = formatDate(new Date());

export default class BrazilStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: INITIAL_DATE };
    }
    render() {
        const { useDataFromAPI, apiData, noData } = this.state

        const fetchBrazilCasesByDate = (e) => {
            var date = e.target.value;
            this.setState({ selectedDate: date });

            const apiUrl = `https://if1015covidreports-api.herokuapp.com/reports/brazil/${date}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((d) => {
                    var brasilCasesInDate = {
                        date: date,
                        confirmed: 0,
                        deaths: 0,
                        suspects: 0
                    }
                    if(_.isEmpty(d)) this.setState({noData: true})

                    _.forEach(d.filter(x => x.datetime.split('T')[0] === date), (s) => {
                        brasilCasesInDate.confirmed += s.cases;
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
                        noData={noData}
                        selectedDate={this.state.selectedDate} 
                        onChangeData={fetchBrazilCasesByDate}
                        usingAPI={useDataFromAPI}
                        returnToContext={returnToContext} />
                }
            </SocketContext.Consumer>
        )
    }
}