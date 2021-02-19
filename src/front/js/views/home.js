import "../../styles/home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { Hobby } from "./hobby";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<div className="container">
				<Hobby />
			</div>
		);
	}
}
// export default Home;
