import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

import { Home } from "./views/home";
import { Hobby } from "./views/hobby";
import { Preview } from "./views/preview";
import { Login } from "./views/login";
import { SignUp } from "./views/signup";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar1 } from "./component/navbar1";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar1 />
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/" component={Home} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/hobby" component={Hobby} />
						<Route exact path="/preview" component={Preview} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
