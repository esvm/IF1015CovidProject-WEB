import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'

import styles from './stateStats.module.scss'

import { SocketContext } from '../../contexts/socketManager'


const renderData = ({ cases, suspects, deaths }) =>
    <div className={styles.stateStats__data}>
        <span>Casos confirmados:</span> <span>{cases}</span>
        <span>Suspeitas:</span> <span>{suspects}</span>
        <span>Mortes:</span> <span>{deaths}</span>
    </div>

export default class StateStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, selectedDate: '2020-02-01' };
    }
    render() {
        const { loading, isOpen, selectedDate } = this.state
        const { district } = this.props

        return (
            <SocketContext>
                {({ statesData: data }) =>
                    <div className={styles.stateStats}>
                        {loading || !data.get(district) ?
                            (<span>Loading...</span>) :
                            (<div className={styles.stateStats__content}>
                                <h2>{data.get(district).state}</h2>
                                {!isOpen && renderData(data.get(district))}
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
                }
            </SocketContext>
        )
    }
}