import React from 'react'

import StateStatsComponent from './stateStats.component'

import { SocketContext } from '../../contexts/generalContext'
import { addDays, formatDate } from '../../utils/dateUtils'

const INITIAL_DATE = formatDate(addDays(new Date(), -7));

export default class StateStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, selectedDate: INITIAL_DATE, useDataFromAPI: false, apiData: {} };
    }


    componentDidUpdate(prevProps){
        if(this.props.district !== prevProps.district){
            this.setState({ useDataFromAPI: false, data: this.props.data })
        }
    }

    render() {
        const { selectedDate, apiData, useDataFromAPI } = this.state
        const { district, returnToBrazil } = this.props

        const fetchBrazilCasesByDate = (e) => {
            var date = e.target.value;
            this.setState({ selectedDate: date });

            const apiUrl = `https://if1015covidreports-api.herokuapp.com/reports/brazil/${date}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((d) => {
                    var brazilStateData = d.find(x => x.uf === this.props.district 
                                                  && x.datetime.split('T')[0] === date);
                                                  
                    this.setState({ useDataFromAPI: true, apiData: brazilStateData });
                }).catch(error => console.log('error: ', error));
        }

        const returnToContext = () => {
            this.setState({ useDataFromAPI: false, selectedDate: INITIAL_DATE });
        }
        
        return (
            <SocketContext.Consumer>
                {({ states }) =>
                    <StateStatsComponent
                        data={useDataFromAPI ? apiData : states.get(district)}
                        returnToBrazil={returnToBrazil}
                        selectedDate={selectedDate}
                        onChangeDate={fetchBrazilCasesByDate}
                        usingAPI={useDataFromAPI}
                        returnToContext={returnToContext}
                    />
                }
            </SocketContext.Consumer>
        )
    }
}