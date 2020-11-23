import React from 'react'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField'
import { BsArrowLeft } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

import styles from './stateStats.module.scss'

import { districts } from '../../utils/data'
import { formatDate } from '../../utils/dateUtils'

const renderData = ({ cases, suspects, deaths }) =>
    <div className={styles.stateStats__data}>
        <span>Casos confirmados:</span> <span>{new Intl.NumberFormat().format(cases)}</span>
        <span>Suspeitas:</span> <span>{new Intl.NumberFormat().format(suspects)}</span>
        <span>Mortes:</span> <span>{new Intl.NumberFormat().format(deaths)}</span>
    </div>

export default class StateStatsComponent extends React.Component {
    render() {
        const { data, district, selectedDate, onChangeDate, usingAPI, returnToContext, returnToBrazil } = this.props;

        const renderDatePicker = () =>
            <form className={styles.stateStats__form}>
                <TextField
                    type="date"
                    label="Dados do dia:"
                    className={styles.stateStats__form__date}
                    value={formatDate(new Date(_.get(data, "datetime")) || selectedDate)}
                    onChange={onChangeDate}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                {usingAPI &&
                    <FaTimes onClick={returnToContext} className={styles.stateStats__clearDateButton} />
                }
            </form>

        return (
            <div className={styles.stateStats}>
                <div className={styles.stateStats__content}>
                    <div className={styles.stateStats__header}>
                        <h2>{_.find(districts, ({ uf }) => uf === district).nome}</h2>
                    </div>
                    {!data ?
                        (<span>Ainda não temos dados desse dia :(</span>) :
                        renderData(data)
                    }
                    {renderDatePicker()}
                    <span className={styles.stateStats__return} onClick={returnToBrazil}>
                        <BsArrowLeft />
                            Voltar para informações do Brasil
                        </span>
                </div>
            </div>
        )
    }
}