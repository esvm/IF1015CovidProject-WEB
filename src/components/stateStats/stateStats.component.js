import React from 'react'
import TextField from '@material-ui/core/TextField'
import { BsArrowLeft } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

import styles from './stateStats.module.scss'

const renderData = ({ cases, suspects, deaths }) =>
    <div className={styles.stateStats__data}>
        <span>Casos confirmados:</span> <span>{cases}</span>
        <span>Suspeitas:</span> <span>{suspects}</span>
        <span>Mortes:</span> <span>{deaths}</span>
    </div>

export default class StateStatsComponent extends React.Component {
    render() {
        const {data, selectedDate, onChangeDate, usingAPI, returnToContext, returnToBrazil} = this.props;

        const renderDatePicker = () =>
            <form className={styles.stateStats__form}>
                <TextField
                    type="date"
                    label="Dados coletados a partir de:"
                    className={styles.stateStats__form__date}
                    value={selectedDate}
                    onChange={onChangeDate}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                {usingAPI &&
                    <FaTimes onClick={returnToContext} className={styles.stateStats__clearDateButton}/>
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