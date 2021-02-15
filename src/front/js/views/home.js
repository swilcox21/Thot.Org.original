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
			<div className="container text-center">
				<div className="text-center mt-3">Hello Sam</div>
				<Hobby />
				<div className="container text-center mt-3 clock">
					{new Date().toLocaleString("en-us", { weekday: "long" })}
					<Clock />
				</div>
			</div>
		);
	}
}
// export default Home;
