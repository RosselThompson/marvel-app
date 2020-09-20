import React from 'react'
import {CircularProgress, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	contained: {
        marginTop: '20%',
		marginLeft: '50%'
    },
    progress:{
        color: 'var(--primary-color)'
    }
}));

export const Loader = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.contained}>
                <CircularProgress className={classes.progress} />
            </div>
        </>
    )
}
