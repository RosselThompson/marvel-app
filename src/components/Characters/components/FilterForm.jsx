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
	MenuItem
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
	button:{
        color: 'var(--primary-color)'
    }
}));

const FilterForm = (props) => {
	const { open, setOpen, handleInputChange, comicsData, storiesData, formValues, applyFilter } = props;
	const classes = useStyles();
    const comics = comicsData.results || [];
    const stories = storiesData.results || [];
	return (
		<Dialog fullWidth open={open} onClose={setOpen}>
			<DialogTitle>Characters Filter Form</DialogTitle>
			<DialogContent>
				<div className={classes.input}>
					<InputLabel> Name </InputLabel>
					<TextField
						name='name'
						value={formValues.name}
						onChange={handleInputChange}
						fullWidth
					/>
				</div>

				<div className={classes.input}>
					<InputLabel> Comics </InputLabel>
					<Select
						name='comics'
						multiple
						value={formValues.comics}
						onChange={handleInputChange}
						fullWidth
						MenuProps={MenuProps}
					>
                        {
                            comics.map(e=>
                                <MenuItem key={e.id} value={e}>
                                    {e.title}
                                </MenuItem>
                            )
                        }
                    </Select>
				</div>

				<div className={classes.input}>
					<InputLabel> Stories </InputLabel>
					<Select
						name='stories'
						multiple
						value={formValues.stories}
						onChange={handleInputChange}
						fullWidth
						MenuProps={MenuProps}
					>
                        {
                            stories.map(e=>
                                <MenuItem key={e.id} value={e}>
                                    {e.title}
                                </MenuItem>
                            )
                        }
                    </Select>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={setOpen}>
					Cancel
				</Button>
				<Button className={classes.button} onClick={applyFilter}>Apply</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FilterForm;
