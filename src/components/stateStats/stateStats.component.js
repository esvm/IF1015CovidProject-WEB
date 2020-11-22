import React from 'react'
import TextField from '@material-ui/core/TextField'

import styles from './stateStats.module.scss'
import {FaTimes} from 'react-icons/fa'

const INITIAL_DATE = '2020-02-01';

const renderData = ({ cases, suspects, deaths }) =>
    <div className={styles.stateStats__data}>
        <span>Casos confirmados:</span> <span>{cases}</span>
        <span>Suspeitas:</span> <span>{suspects}</span>
        <span>Mortes:</span> <span>{deaths}</span>
    </div>

export default class StateStatsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: INITIAL_DATE };
    }

    render() {
        const { selectedDate, data: stateData, useDataFromAPI } = this.state
        const { data: propsData } = this.props
        const data = useDataFromAPI ? stateData : propsData

        const fetchBrazilCasesByDate = (e) => {
            var date = e.target.value;
            this.setState({ selectedDate: date });
            var currentBrazilState = this.props.data.state;

            console.log(date);
            const apiUrl = `https://if1015covidreports-api.herokuapp.com/reports/brazil/${date}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((d) => {
                    console.log(d);
                    var brazilStateData = d.find(x => x.state === currentBrazilState);
                    console.log(brazilStateData);
                    this.setState({ useDataFromAPI: true, data: brazilStateData });
                }).catch(error => console.log('error: ', error));
        }

        const closePickDate = () => {
            this.setState({useDataFromAPI: false, selectedDate: INITIAL_DATE});
        }
        
        return (
            <div className={styles.stateStats}>
                {!data ?
                    (<span>Loading...</span>) :
                    (<div className={styles.stateStats__content}>
                        <h2>{data.state}</h2>
                        {renderData(data)}
                        <form className={styles.stateStats__form}>
                            <TextField
                                label="Dados a partir do dia:"
                                type="date"
                                className={styles.stateStats__form__date}
                                //defaultValue={selectedDate}
                                value={selectedDate}
                                onChange={fetchBrazilCasesByDate}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                            {useDataFromAPI &&
                                <button onClick={closePickDate}> 
                                    <FaTimes/>
                                </button>
                            }
                        </form>
                    </div>)
                }
            </div>
        )
    }
}