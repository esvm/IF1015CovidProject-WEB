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

            <div className={district ? styles.brazilMap : styles.brazilMapEntire}>
                <div className={styles.brazilMap__map}>
                    <SizeMe>
                        {({ size }) =>
                            <MapBrazil
                                width={size.width}
                                fill="#F9AA33"
                                onChange={newDistrict => this.setState({ district: newDistrict })}
                            />
                        }
                    </SizeMe>
                </div>
                {this.state.district &&
                    <StateStats district={district} />}
            </div>
        )
    }
}