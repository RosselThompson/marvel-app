import React from "react";
import {useHistory} from 'react-router-dom'
import { makeStyles, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	img: {
		marginTop: "10%",
		marginLeft: "25%",

		"& img": {
			width: "50vw",
			heigth: "50vh",
		},
	},
	buttonContained: {
		display: "flex",
		justifyContent: "center",
		marginTop: "5vh",
    },
    button:{
        backgroundColor: "var(--primary-color)",
        color:'var(--white-color)',
        '&:hover':{
            color:"var(--secondary-color)"
        }
    }
}));

export const NotFound = () => {
    const classes = useStyles();
    const history = useHistory();

	return (
		<>
			<div className={classes.img}>
				<img src='/assets/not_found.svg' alt='not_found'></img>
			</div>
			<Grid container className={classes.buttonContained}>
				<Grid item>
					<Button className={classes.button} variant='contained' size="large" onClick={()=> history.replace('/') }> Back to Home </Button>
				</Grid>
			</Grid>
		</>
	);
};

export default NotFound;
