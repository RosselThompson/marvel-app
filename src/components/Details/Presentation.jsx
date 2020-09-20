import React from "react";
import { Loader } from "../../helpers/Loader";
import {
	Grid,
	Card,
	CardMedia,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { Widgets } from "../../helpers/Widgets";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: "15px",
	},
	media: {
		height: 0,
		paddingTop: "80%", // 16:9
	},
	text: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	info: {
		marginTop: theme.spacing(5),
	},
	list: {
		display: "flex",
		flexDirection: "column",
	},
	item2: {
		marginTop: theme.spacing(5),
	},
}));

const defaultValue = {
	thumbnail: "",
	extension: "",
	name: "",
	description: "",
};

export const Presentation = (props) => {
	const classes = useStyles();
	const { status, data, dataItem1, dataItem2, type, infoType } = props;
	const e = data.results ? data.results[0] : defaultValue;

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
							<Card>
								<CardMedia
									className={classes.media}
									image={
										e.thumbnail
											? `${e.thumbnail?.path}.${e.thumbnail?.extension}`
											: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
									}
									title={e.name}
								/>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={6} lg={7} xl={8}>
							<div className={classes.text}>
								<Typography align='center' variant='h5'>
									{type === "characters"
										? e.name
										: type === "comics"
										? e.title
										: e.title}
								</Typography>
								<Typography align='center' variant='subtitle1'>
									{e.description}
								</Typography>
							</div>
						</Grid>
					</Grid>
					<div className={classes.info}>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
							<div>
								<Typography variant='overline' className={classes.title}>
									{infoType[0]}
								</Typography>
								<hr />
								<div className={classes.list}>
									<Grid container spacing={2}>
										{dataItem1.results?.map((e) => (
											<Widgets
												key={e.id}
												data={e}
												type={infoType[0]}
												redirect={false}
												favorite={false}
											/>
										))}
									</Grid>
								</div>
							</div>
						</Grid>

						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							className={classes.item2}
						>
							<div>
								<Typography variant='overline' className={classes.title}>
									{infoType[1]}
								</Typography>
								<hr />
								<div className={classes.list}>
									<Grid container spacing={2}>
										{dataItem2.results?.map((e) => (
											<Widgets
												key={e.id}
												data={e}
												type={infoType[1]}
												redirect={false}
												favorite={false}
											/>
										))}
									</Grid>
								</div>
							</div>
						</Grid>
					</div>
				</>
			)}
		</>
	);
};
