import React from 'react'
import { SizeMe } from 'react-sizeme'
import { MapBrazil } from 'react-brazil-map'

import styles from './brazilPage.module.scss'

import StateStats from '../stateStats/stateStats'
import BrazilStats from '../brazilStats/brazilStats'

export default class BrazilPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { district: "" };
    }

    render() {
        const { district } = this.state

        return (
            <SizeMe>
                {({ size }) =>
                    <div className={styles.brazilPage}>
                        <div className={styles.brazilPage__map}>
                            <MapBrazil
                                width={size.width/2}
                                height={500}
                                fill={district ? "#F9AA33" : "rgb(141, 141, 141)"}
                                onChange={newDistrict => this.setState({ district: newDistrict })}
                            />

                        </div>
                        {this.state.district ?
                            <StateStats district={district} returnToBrazil={() => this.setState({ district: '' })} /> :
                            <BrazilStats />}
                    </div>
                }
            </SizeMe>
        )
    }
}