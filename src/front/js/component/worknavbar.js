import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactCalendar from "../component/calender";

export const WorkNavbar = props => {
	return (
		<nav className="container col-lg-2 col-12 sideBar">
			<ReactCalendar />
		</nav>
	);
};

WorkNavbar.propTypes = {
	toggle: PropTypes.func
};
