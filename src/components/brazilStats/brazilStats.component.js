import React from 'react'
import TextField from '@material-ui/core/TextField'
import { FaTimes } from 'react-icons/fa'
import styles from './brazilStats.module.scss'


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
        const { selectedDate, data, onChangeData, usingAPI, returnToContext } = this.props

        return (
            <div className={styles.brazilStats}>
                {!data ?
                    (<span>Loading...</span>) :
                    (<div className={styles.brazilStats__content}>
                        <h2>Brasil</h2>
                        {renderData(data)}
                        <form className={styles.brazilStats__form}>
                            <TextField
                                label="Dados no dia:"
                                type="date"
                                className={styles.brazilStats__form__date}
                                defaultValue={selectedDate}
                                onChange={onChangeData}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                            {usingAPI &&
                                <FaTimes onClick={returnToContext} className={styles.brazilStats__clearDateButton}/>
                            }
                        </form>
                    </div>)
                }
            </div>
        )
    }
}