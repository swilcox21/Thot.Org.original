import "../../styles/home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { Hobby } from "./hobby";
import addMeeting from "../../img/thot.org_addMeeting.gif";
import tripleDownArrows from "../../img/triple-down-arrows.gif";

export class Welcome extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<>
				<div className="container-fluid text-center" id="loginBackground">
					<br />
					<br />
					<br />
					<br />
					<span className="mx-auto">
						<span id="welcomespan">Mind racing? Who&apos;s isn&apos;t... </span>
						<br />
						<br />
						<span id="welcomespan">Let&apos;s get those thoughts organized!</span>
					</span>
					<div className="text-center mt-5">
						<img src={tripleDownArrows} />
						<br />
						<Link to={"/login"}>
							<button className="p-2">Get Started</button>
						</Link>
						<br />
						<Link to={"/preview"}>
							<small>Recruiter? &nbsp; </small>
						</Link>
						<Link to={"/preview"}>
							<small> &nbsp; Just Visiting?</small>
						</Link>
					</div>
				</div>
				<div className="container col-8 Absolute" id="shadowHobbyView">
					<img src={addMeeting} />
				</div>
			</>
		);
	}
}
