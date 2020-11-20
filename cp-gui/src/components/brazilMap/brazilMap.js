import React from 'react'
import { SizeMe } from 'react-sizeme'
import { MapBrazil } from 'react-brazil-map'

import styles from './brazilMap.module.scss'

export default class BrazilMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { district: "" };
    }

    render() {
        return (
            <SizeMe>
                {({ size }) =>
                    <div className={styles.brazilMap}>
                        <MapBrazil
                            width={size.width/3}
                            fill="#F9AA33"
                            onChange={district => this.setState({ district })}
                        />
                    </div>
                }
            </SizeMe>
        )
    }
}