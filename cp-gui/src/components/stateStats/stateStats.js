import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'

import styles from './stateStats.module.scss'


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

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.district !== this.props.district) {
            this.getData();
        }
    }

    getData() {
        this.setState({ loading: true });

        fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${this.props.district.toLowerCase()}`, {
            "method": "GET"
        })
            .then((resp) => resp.json())
            .then(data => this.setState({ data, loading: false }))
            .catch(error => this.setState({ error }));
    }

    render() {
        const { data, loading, isOpen, selectedDate } = this.state
        return (
            <div className={styles.stateStats}>
                {loading || !data ?
                    (<span>Loading...</span>) :
                    (<div className={styles.stateStats__content}>
                        <h2>{data.state}</h2>
                        {!isOpen && renderData(data)}
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