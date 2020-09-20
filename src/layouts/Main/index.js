import React from "react";
import { Navbar } from "./Navbar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	content: {
		height: "100%",
        padding: "3vh",
        paddingTop: "80px"
	}
}));

export const Index = ({ children }) => {
	const classes = useStyles();
	return (
		<>
			<Navbar />
			<main className={classes.content}>{children}</main>
		</>
	);
};

export default Index;
