import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactCalendar from "../component/calender";

export const WorkNavbar = props => {
	return (
		<nav className="container col-sm-8 col-md-8 col-xl-5 col-12 sideBar">
			<ReactCalendar onChange={props.onChange} />
		</nav>
	);
};

WorkNavbar.propTypes = {
	toggle: PropTypes.func,
	onChange: PropTypes.func
};
