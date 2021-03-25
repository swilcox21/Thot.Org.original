import React, { useState, setStore, useEffect, useContext, getState, actions } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Clock from "./clock";
import { Context } from "../store/appContext";

export const Navbar1 = props => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="container-fluid navbar navbar-dark bg-dark py-4">
			<Link to="/">
				<span className="" />
			</Link>
			<Link to="/">
				<span className="greyIcons">
					<i className="fas fa-home" />
				</span>
			</Link>
			<Link to="/preview">
				<span className="greyIcons">
					<i className="fas fa-hotel" />
				</span>
			</Link>
			<Link to="/">
				<span className="" />
			</Link>
			<span />

			{store.email ? (
				<span className="text-primary cursorPointer" onClick={() => actions.logOut()}>
					Log Out
				</span>
			) : (
				<Link to="/login">
					<span className="">Login</span>
				</Link>
			)}
		</nav>
	);
};

Navbar1.propTypes = {
	toggle: PropTypes.func
};
