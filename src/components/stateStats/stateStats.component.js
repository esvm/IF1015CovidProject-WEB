import React from 'react'
import TextField from '@material-ui/core/TextField'
import { BsArrowLeft } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

import styles from './stateStats.module.scss'

import { addDays, formatDate } from '../../utils/dateUtils'

const INITIAL_DATE = formatDate(addDays(new Date(), -7));

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
        const { data: propsData, returnToBrazil } = this.props
        const data = useDataFromAPI ? stateData : propsData

        const fetchBrazilCasesByDate = (e) => {
            var date = e.target.value;
            this.setState({ selectedDate: date });
            var currentBrazilState = this.props.data.state;

            console.log(date);
            const apiUrl = `https://if1015covidreports-api.herokuapp.com/reports/brazil/${date}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((d) => {
                    console.log(d);
                    var brazilStateData = d.find(x => x.state === currentBrazilState);
                    console.log(brazilStateData);
                    this.setState({ useDataFromAPI: true, data: brazilStateData });
                }).catch(error => console.log('error: ', error));
        }

        const closePickDate = () => {
            this.setState({ useDataFromAPI: false, selectedDate: INITIAL_DATE });
        }

        const renderDatePicker = () =>
            <form className={styles.stateStats__form}>
                <TextField
                    type="date"
                    label="Dados coletados a partir de:"
                    className={styles.stateStats__form__date}
                    value={selectedDate}
                    onChange={fetchBrazilCasesByDate}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                {useDataFromAPI &&
                    <button onClick={closePickDate}>
                        <FaTimes />
                    </button>
                }
            </form>

        return (
            <div className={styles.stateStats}>
                {!data ?
                    (<span>Loading...</span>) :
                    (<div className={styles.stateStats__content}>
                        <div className={styles.stateStats__header}>
                            <h2>{data.state}</h2>
                        </div>
                        {renderData(data)}
                        {renderDatePicker()}
                        <span className={styles.stateStats__return} onClick={returnToBrazil}>
                            <BsArrowLeft />
                            Voltar para informações do Brasil
                        </span>
                    </div>)
                }
            </div>
        )
    }
}