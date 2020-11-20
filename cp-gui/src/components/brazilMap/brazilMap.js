import React from 'react'
import { MapBrazil } from 'react-brazil-map'

import styles from './brazilMap.module.scss'

export default class BrazilMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { district: "" };
    }

    render() {
        return (
            <div className={styles.brazilMap}>
                <MapBrazil
                    height={500}
                    fill="#F9AA33"
                    onChange={district => this.setState({ district })}
                />
            </div>
        )
    }
}