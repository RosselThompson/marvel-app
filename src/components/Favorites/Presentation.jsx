import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Loader } from "../../helpers/Loader";
import { Widgets } from "../../helpers/Widgets";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: "15px",
	},
	content: {
        marginTop: theme.spacing(2),
        width:'100%'
	},
	options: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

export const Presentation = (props) => {
	const { status, data } = props;
	const classes = useStyles();

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<div className={classes.options}>
							<div>
								<Typography variant='overline' className={classes.title}>
									Favorites
								</Typography>
							</div>
						</div>
						<hr />
					</Grid>
					<>
						<div className={classes.content}>
							<Grid container spacing={2}>
								{data?.map((e) => (
									<Widgets key={e.id} data={e} type={e.type} />
								))}
							</Grid>
						</div>
					</>
				</Grid>
			)}
		</>
	);
};
