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
			<Context.Consumer>
				{({ actions, store }) => (
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
								<br />
								<small
									id="visiting"
									className="mt-5 text-primary"
									onClick={() => actions.logging("visitor@gmail.com", "password")}>
									Recruiter? &nbsp;{" "}
								</small>
								<small
									id="visiting"
									className="mt-5 text-primary"
									onClick={() => actions.logging("visitor@gmail.com", "password")}>
									&nbsp; Just Visiting?
								</small>
							</div>
						</div>
						<div className="container col-8 Absolute" id="shadowHobbyView">
							<img src={addMeeting} />
						</div>
					</>
				)}
			</Context.Consumer>
		);
	}
}
