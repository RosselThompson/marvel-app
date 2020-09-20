import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Widgets } from "../../../helpers/Widgets";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
	content: {
		marginTop: theme.spacing(2),
	},
	pagination: {
		marginTop: theme.spacing(3),
	},
}));

const ListScreen = (props) => {
	const classes = useStyles();
	const { data, page, handlePagination } = props;
	return (
		<>
			<div className={classes.content}>
				<Grid container spacing={2}>
					{
						data.results?.map(e=>
							<Widgets key={e.id} data={e} type='comics' />
						)
					}
				</Grid>
			</div>
			<Grid
				item
				xs={12}
				sm={12}
				md={12}
				lg={12}
				xl={12}
				className={classes.pagination}
			>
				<Pagination
					count={Math.ceil(data.total / 20)}
					page={page}
					onChange={handlePagination}
				/>
			</Grid>
		</>
	);
};
export default ListScreen
