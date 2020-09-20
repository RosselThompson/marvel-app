import React from "react";
import { Grid, Typography, makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { FilterList, SortByAlpha } from "@material-ui/icons";

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
    
    const { data, handleSort, filters, setOpen } = props;
    const classes= useStyles();

	return (
		<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
			<div className={classes.options}>
				<div>
					<Typography variant='overline' className={classes.title}>
						Comics
					</Typography>
					<Typography variant='caption' className={classes.caption}>
						{data.total} Results
					</Typography>
				</div>

				<div>
					<Tooltip title='Sort issueNumber A-Z'>
						<IconButton onClick={handleSort}>
							<SortByAlpha
								style={{
									color:
										filters.order === "issueNumber"
											? "var(--primary-color)"
											: "var(--secondary-color)",
								}}
							/>
						</IconButton>
					</Tooltip>
					<Tooltip title='Filters'>
						<IconButton className={classes.filterButton} onClick={setOpen}>
							<FilterList 
							style={{
								color:
									filters.format || filters.title || filters.issueNumber 
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
