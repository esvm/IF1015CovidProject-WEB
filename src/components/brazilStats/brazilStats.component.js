import React from 'react'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField'
import { FaTimes } from 'react-icons/fa'
import styles from './brazilStats.module.scss'

import { formatDate } from '../../utils/dateUtils'

const renderData = ({ confirmed, suspects, deaths }) =>
    <div className={styles.brazilStats__data}>
        <span>Casos confirmados:</span> <span>{new Intl.NumberFormat().format(confirmed)}</span>
        <span>Mortes:</span> <span>{new Intl.NumberFormat().format(deaths)}</span>
    </div>

export default class BrazilStatsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { selectedDate, data, onChangeData, usingAPI, returnToContext, noData } = this.props

        return (
            <div className={styles.brazilStats}>
                <div className={styles.brazilStats__content}>
                    <h2>Brasil</h2>
                    {!data || noData ?
                        <span>
                            Ainda não temos dados desse dia :(
                        </span> :
                        renderData(data)
                    }
                    <form className={styles.brazilStats__form}>
                        <TextField
                            label="Dados do dia:"
                            type="date"
                            className={styles.brazilStats__form__date}
                            value={usingAPI ? selectedDate : formatDate(new Date(_.get(data, "updated_at")))}
                            onChange={onChangeData}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        {usingAPI &&
                            <FaTimes onClick={returnToContext} className={styles.brazilStats__clearDateButton} />
                        }
                    </form>
                </div>
            </div>
        )
    }
}