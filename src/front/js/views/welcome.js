import "../../styles/home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { Hobby } from "./hobby";

export class Welcome extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<div className="container-fluid">
				<h1 className="text-center mt-5">
					Mind racing? Who&apos;s isn&apos;t... <br /> Let&apos;s get those thoughts organized!
				</h1>
			</div>
		);
	}
}
