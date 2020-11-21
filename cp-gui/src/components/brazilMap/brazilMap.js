import React from 'react'
import { SizeMe } from 'react-sizeme'
import { MapBrazil } from 'react-brazil-map'

import styles from './brazilMap.module.scss'

import StateStats from '../stateStats/stateStats'

export default class BrazilMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { district: "" };
    }

    render() {
        const { district } = this.state

        return (
            <SizeMe>
                {({ size }) =>
                    <div className={district ? styles.brazilMap : styles.brazilMapEntire}>
                        <MapBrazil
                            width={district ? size.width / 3 - 10 : size.width}
                            fill="#F9AA33"
                            onChange={newDistrict => this.setState({ district: newDistrict })}
                        />
                        {this.state.district &&
                            <StateStats district={district} />}
                    </div>
                }
            </SizeMe>
        )
    }
}