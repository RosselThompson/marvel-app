import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	InputLabel,
	Select,
	Button,
	makeStyles,
	MenuItem,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const useStyles = makeStyles((theme) => ({
	input: {
		marginBottom: theme.spacing(3),
	},
	button: {
		color: "var(--primary-color)",
	},
}));

const FilterForm = (props) => {
	const {
		open,
		setOpen,
		handleInputChange,
		formValues,
		applyFilter,
		formatData,
	} = props;
	const classes = useStyles();

	return (
		<Dialog fullWidth open={open} onClose={setOpen}>
			<DialogTitle>Comics Filter Form</DialogTitle>
			<DialogContent>
				<div className={classes.input}>
					<InputLabel> Format </InputLabel>
					<Select
						name='format'
						value={formValues.format}
						onChange={handleInputChange}
						fullWidth
						MenuProps={MenuProps}
					>
						{formatData?.map((e) => (
							<MenuItem key={e.id} value={e}>
								{e.name}
							</MenuItem>
						))}
					</Select>
				</div>

				<div className={classes.input}>
					<InputLabel> Title </InputLabel>
					<TextField
						name='title'
						value={formValues.title}
						onChange={handleInputChange}
						fullWidth
					/>
				</div>

				<div className={classes.input}>
					<InputLabel> Issue Number </InputLabel>
					<TextField
						name='issueNumber'
						value={formValues.issueNumber}
						onChange={(e) =>
							handleInputChange({
								target: {
									name: e.target.name,
									value: e.target.value.replace(/[^0-9]/g, ""),
								},
							})
						}
						fullWidth
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={setOpen}>
					Cancel
				</Button>
				<Button className={classes.button} onClick={applyFilter}>
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FilterForm;
