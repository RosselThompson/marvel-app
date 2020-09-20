import React from "react";
import { Grid, Typography, makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { SortByAlpha } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: "15px",
	},
	caption: {
		marginLeft: theme.spacing(1),
		color: "var(--dark-gray-color)",
		fontSize: "12px",
	},
	filterButton: {
		marginLeft: theme.spacing(1),
		color: "var(--secondary-color)",
	},
	options:{
		display:'flex',
		justifyContent:'space-between'
	}
}));

const TitleScreen = (props) => {
    
    const { data, handleSort, filters } = props;
    const classes= useStyles();

	return (
		<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
			<div className={classes.options}>
				<div>
					<Typography variant='overline' className={classes.title}>
						Stories
					</Typography>
					<Typography variant='caption' className={classes.caption}>
						{data.total} Results
					</Typography>
				</div>

				<div>
					<Tooltip title='Sort Id A-Z'>
						<IconButton onClick={handleSort}>
							<SortByAlpha
								style={{
									color:
										filters.order === "id"
											? "var(--primary-color)"
											: "var(--secondary-color)",
								}}
							/>
						</IconButton>
					</Tooltip>
				</div>
			</div>
			<hr />
		</Grid>
	);
};

export default TitleScreen;
