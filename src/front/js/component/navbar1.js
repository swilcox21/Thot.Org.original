import React from "react";
import { Link } from "react-router-dom";

export const Navbar1 = () => {
	return (
		<nav className="container navbar navbar-dark bg-dark py-4">
			<Link to="/">
				<span className="greyIcons">
					<i className="fas fa-home" />
				</span>
			</Link>
			<Link to="/calendar">
				<span className="greyIcons">
					<i className="far fa-calendar-alt" />
				</span>
			</Link>
			<Link to="/hobby">
				<span className="" />
			</Link>
			<Link to="/goals">
				<span className="" />
			</Link>
		</nav>
	);
};
