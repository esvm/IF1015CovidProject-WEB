import React from 'react'
import TextField from '@material-ui/core/TextField'

import styles from './stateStats.module.scss'


const renderData = ({ cases, suspects, deaths }) =>
    <div className={styles.stateStats__data}>
        <span>Casos confirmados:</span> <span>{cases}</span>
        <span>Suspeitas:</span> <span>{suspects}</span>
        <span>Mortes:</span> <span>{deaths}</span>
    </div>

export default class StateStatsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedDate: '2020-02-01' };
    }
    render() {
        const { selectedDate } = this.state
        const { data } = this.props

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
                                defaultValue={selectedDate}
                                onChange={console.log}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </form>
                    </div>)
                }
            </div>
        )
    }
}