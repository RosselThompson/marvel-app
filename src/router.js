import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { Characters, Comics, Stories, Details, Favorites } from "./components";
import { NotFound } from "./views";
import { Main } from "./layouts";

const LayoutRouter = ({ layout, component, ...rest }) => {
	const renderFn = (Layout, Component) => (props) => (
		<Layout>
			<Component {...props} />
		</Layout>
	);
	return <Route {...rest} render={renderFn(layout, component)} />;
};

export const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from='/' to='/characters' />
				<LayoutRouter exact layout={Main} path='/characters' component={Characters}/>
				<LayoutRouter exact layout={Main} path='/characters/:id' component={Details}/>
				<LayoutRouter exact layout={Main} path='/comics' component={Comics} />
				<LayoutRouter exact layout={Main} path='/comics/:id' component={Details}/>
				<LayoutRouter exact layout={Main} path='/stories' component={Stories} />
				<LayoutRouter exact layout={Main} path='/stories/:id' component={Details}/>
				<LayoutRouter exact layout={Main} path='/favorites' component={Favorites}/>
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};
