import React from 'react'
import MuiAccordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import styles from './searchByDate.module.scss'

const Accordion = withStyles({
    root: {
        width: '100%',
        background: 'rgba(0, 0, 0, .075)',
        border: 'none',
        boxShadow: 'none',
        color: 'white !important'
    },
    expanded: {
        width: '100%',
        minHeight: '0px'
    },
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        margin: '0',
        minHeight: '24px',
        color: 'white'
    },
    content: {
        margin: '0'
    },
    expandIcon: {
        padding: '0 10px'
    }
})(MuiAccordionSummary);

export default class SearchByDate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, onClick } = this.props

        return (
            <div className={styles.searchByDate}>
                <Accordion expanded={isOpen} onChange={(event, isExpanded) => onClick(isExpanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        Ver informação por data
               </AccordionSummary>
                </Accordion>
            </div>
        )
    }
}