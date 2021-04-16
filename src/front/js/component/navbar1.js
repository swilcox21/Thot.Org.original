import React, { useState, setStore, useEffect, useContext, getState, actions } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Clock from "./clock";
import { Context } from "../store/appContext";

export const Navbar1 = props => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="container-fluid navbar bg-dark py-4">
			<Link to="/">
				<span className="Link" />
			</Link>
			<Link to="/">
				<span className="Link">
					<i className="fas fa-home" />
				</span>
			</Link>
			<Link to="/preview">
				<span className="Link">
					<i className="fas fa-hotel" />
				</span>
			</Link>
			<Link to="/">
				<span className="Link">@</span>
			</Link>

			{store.errorMSG === "Invalid Email or Password" ? (
				<Link to="/login">
					<span className="Link">Login</span>
				</Link>
			) : store.email ? (
				<span className="Link cursorPointer" onClick={() => actions.logOut()}>
					Log Out
				</span>
			) : (
				<Link to="/login">
					<span className="Link">Login</span>
				</Link>
			)}
			<span />
		</nav>
	);
};

Navbar1.propTypes = {
	toggle: PropTypes.func
};
