import React from 'react'
import TextField from '@material-ui/core/TextField'

import styles from './brazilStats.module.scss'


const renderData = ({ cases, suspects, deaths }) =>
    <div className={styles.brazilStats__data}>
        <span>Casos confirmados:</span> <span>{cases}</span>
        <span>Mortes:</span> <span>{deaths}</span>
    </div>

export default class BrazilStatsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { selectedDate, data } = this.props

        return (
            <div className={styles.brazilStats}>
                {!data ?
                    (<span>Loading...</span>) :
                    (<div className={styles.brazilStats__content}>
                        <h2>Brasil</h2>
                        {renderData(data)}
                        <form className={styles.brazilStats__form}>
                            <TextField
                                label="Dados a partir do dia:"
                                type="date"
                                className={styles.brazilStats__form__date}
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