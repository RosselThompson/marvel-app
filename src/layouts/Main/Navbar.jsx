import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Hidden,
	IconButton,
	makeStyles,
	Drawer,
	List,
	ListItem,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	nav: {
		backgroundColor: "var(--secondary-color)",
	},
	menuLink: {
		textDecoration: "none",
		color: "var(--white-color)",
		marginRight: theme.spacing(3),
		"&:hover": {
			transition: ".4s ease-in",
			color: "var(--ligth-gray-color)",
		},
	},
	menuLinkDrawer: {
		textDecoration: "none",
		color: "var(--dark-gray-color)",
	},
	listDrawer:{
		marginTop: theme.spacing(2)
	}
}));

export const Navbar = () => {
	const classes = useStyles();
	const [openDrawer, setopenDrawer] = useState(false);

	return (
		<AppBar variant='outlined' className={classes.nav}>
			<Toolbar>
				<Hidden smUp>
					<IconButton
						edge='start'
						color='inherit'
						className={classes.menuButton}
						onClick={() => setopenDrawer(!openDrawer)}
					>
						<Menu />
					</IconButton>
				</Hidden>
				<Typography variant='h6' className={classes.title}>
					Marvel App
				</Typography>
				<Hidden xsDown>
					<div>
						<NavLink className={classes.menuLink} to='/characters'>
							<Typography variant='overline'>Characters</Typography>
						</NavLink>
						<NavLink className={classes.menuLink} to='/comics'>
							<Typography variant='overline'>Comics</Typography>
						</NavLink>
						<NavLink className={classes.menuLink} to='/stories'>
							<Typography variant='overline'>Stories</Typography>
						</NavLink>
						<NavLink className={classes.menuLink} to='/favorites'>
							<Typography variant='overline'>Favorites</Typography>
						</NavLink>
					</div>
				</Hidden>
			</Toolbar>
			<Drawer
				anchor='left'
				open={openDrawer}
				onClose={() => setopenDrawer(!openDrawer)}
			>
				<div role='presentation' onClick={() => setopenDrawer(!openDrawer)}>
					<List className={classes.listDrawer}>
						<ListItem>
							<NavLink className={classes.menuLinkDrawer} to='/characters'>
								<Typography variant='overline'>Characters</Typography>
							</NavLink>
						</ListItem>
						<ListItem>
							<NavLink className={classes.menuLinkDrawer}  to='/comics'>
								<Typography variant='overline'>Comics</Typography>
							</NavLink>
						</ListItem>
						<ListItem>
							<NavLink className={classes.menuLinkDrawer}  to='/stories'>
								<Typography variant='overline'>Stories</Typography>
							</NavLink>
						</ListItem>
						<ListItem>
							<NavLink className={classes.menuLinkDrawer}  to='/favorites'>
								<Typography variant='overline'>Favorites</Typography>
							</NavLink>
						</ListItem>
					</List>
				</div>
			</Drawer>
		</AppBar>
	);
};
