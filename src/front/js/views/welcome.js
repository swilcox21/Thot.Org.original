import "../../styles/home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { Hobby } from "./hobby";
import addMeeting from "../../img/thought.org_addMeeting.gif";
import redHead from "../../img/studious_redhead_nobg.png";
import tripleDownArrows from "../../img/looping-down-arrows.gif";

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
						{/* <div className="row">
							<div className="col-2 col-s-4 col-md-12 textOpacity" id="loginBackground">
								hi
							</div>
							<div className="col-2 col-s-4 col-md-12 textOpacity" id="loginBackground">
								hi
							</div>
							<div className="col-2 col-s-4 col-md-12 textOpacity" id="loginBackground">
								hi
							</div>
							<div className="col-2 col-s-4 col-md-12 textOpacity" id="loginBackground">
								hi
							</div>
							<div className="col-2 col-s-4 col-md-12 textOpacity" id="loginBackground">
								hi
							</div>
							<div className="col-2 col-s-4 col-md-12 textOpacity" id="loginBackground">
								hi
							</div>
						</div> */}
						<div className="row justify-content-center pt-md-5" id="loginBackground">
							<div className="text-center  mt-md-5 col-md-6 ">
								<div className="col-10 mx-auto" id="welcomespan">
									Mind racing? Who&apos;s isn&apos;t...
								</div>
								<br />
								<div className="" id="welcomespan2">
									Let&apos;s get those thoughts organized!
								</div>
								<img src={tripleDownArrows} />
								<br />
								<Link to={"/login"}>
									<button className="p-2 mb-md-3">Get Started</button>
								</Link>
								<br />
								<small
									id="visiting"
									className="text-primary"
									onClick={() => actions.logging("visitor@gmail.com", "password")}>
									Recruiter? Just Visiting?
								</small>
							</div>
							<div className="col-md-4 col-12">
								<img style={{ maxHeight: 400 }} src={redHead} />
							</div>
						</div>
						<div className="Absolute " id="shadowHobbyView">
							<img style={{ maxWidth: "100%" }} src={addMeeting} />
						</div>
					</>
				)}
			</Context.Consumer>
		);
	}
}
