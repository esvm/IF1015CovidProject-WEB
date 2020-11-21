import React from 'react'

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
        this.state = {};
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
        console.log(this.props.district);

        fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${this.props.district.toLowerCase()}`, {
            "method": "GET"
        })
            .then((resp) => resp.json())
            .then(data => this.setState({ data, loading: false }))
            .catch(error => this.setState({ error }));
    }

    render() {
        const { data, loading } = this.state
        return (
            <div className={styles.stateStats}>
                {loading || !data ?
                    (<span>Loading...</span>) :
                    (<>
                        <h2>{data.state}</h2>
                        {renderData(data)}
                        <p className={styles.stateStats__dateAlert}>
                            Ver em outros períodos de tempo
                        </p>
                    </>)
                }
            </div>
        )
    }
}