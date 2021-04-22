import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import newFolder from "../../img/exampleFolder.gif";

import "../../styles/home.scss";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { TodoInfoModal } from "../component/todoInfoModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Prio } from "../component/prio";
import TextareaAutosize from "react-textarea-autosize";
import ReactDatePicker from "react-datepicker";
import { WorkNavbar } from "../component/worknavbar";
import { TodoWidget } from "../component/todowidget";
import { Spring, Transition, animated } from "react-spring/renderprops";
import Clock from "../component/clock";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import timeZone from "dayjs-ext/plugin/timeZone";
import utc from "dayjs/plugin/utc";
import { Dropdown } from "semantic-ui-react";

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(
		// if we have an error string set valid to false
		val => val.length > 0 && (valid = false)
	);
	return valid;
};

export class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			time_zone: "",
			time_zones: [],
			email: "",
			password: "",
			errors: {
				time_zone: " ",
				email: " ",
				password: " "
			},
			task: [
				{
					label: "",
					dashboard: false,
					date: null,
					folder: "tasks"
				}
			],
			meeting: [
				{
					label: "",
					dashboard: false,
					date: null,
					folder: "meetings"
				}
			],
			notes: null,
			currentDate: dayjs.new(),
			taskDate: dayjs.new()
		};
	}

	componentDidMount() {
		this.context.actions.getTimezones().then(() => {
			this.setState({ time_zones: this.context.store.time_zones });
		});
	}

	handleChange = event => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case "timezone_offset":
				errors.time_zone = value.length < 1 ? "* invalid selection *" : "";
				break;
			case "email":
				errors.email = validEmailRegex.test(value) ? "" : " * Email is not valid! *";
				break;
			case "password":
				errors.password = value.length < 8 ? "* Password must be atleast 8 characters long! *" : "";
				break;
			default:
				break;
		}

		this.setState({ errors, [name]: value });

		event.preventDefault();
		if (validateForm(this.state.errors)) {
			console.info("Valid Form");
		} else {
			console.error("Invalid Form");
		}
	};

	render() {
		const { errors } = this.state;
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<>
						<div className="container-fluid" id="loginBackground">
							<div className="container col-lg-3 col-md-6 col-9 mt-5" id="loginBox">
								<div className="row">
									<div className="col-12 mx-auto">
										<div id="second">
											<div className="myform form ">
												<div className="logo mb-3">
													<div className="col-md-12 text-center mt-4">
														<h1>Sign Up</h1>
														<small>please fill all required * feilds</small>
													</div>
												</div>
												<form onSubmit={this.handleChange} noValidate>
													<div className="firstName">
														<label htmlFor="firstName">First Name</label>
														<input
															type="text"
															name="firstName"
															id="firstName"
															className="form-control"
															aria-describedby="emailHelp"
															placeholder="Enter Firstname"
															onChange={this.handleChange}
															noValidate
														/>
													</div>
													<div className="lastName">
														<label htmlFor="lastName">Last Name</label>
														<input
															type="text"
															name="lastName"
															className="form-control"
															id="lastName"
															aria-describedby="emailHelp"
															placeholder="Enter Lastname"
															onChange={this.handleChange}
														/>
													</div>
													<div>
														<label htmlFor="span5">Time Zone *</label>
														{store.time_zones.length > 0 && (
															<select
																onChange={this.handleChange}
																name="timezone_offset"
																id="timezone-offset"
																className="span5">
																{store.time_zones.map(time_zones => {
																	return (
																		<option
																			key={time_zones.id}
																			value={time_zones.utc[0]}>
																			{time_zones.value}
																		</option>
																	);
																})}
															</select>
														)}
														{errors.time_zone.length > 0 && (
															<span className="error">{errors.time_zone}</span>
														)}
													</div>
													<div className="email">
														<label htmlFor="email">Email address *</label>
														<input
															type="email"
															name="email"
															className="form-control"
															id="email"
															aria-describedby="emailHelp"
															placeholder="Enter email"
															onChange={this.handleChange}
															noValidate
														/>
														{errors.email.length > 0 && (
															<span className="error">{errors.email}</span>
														)}
													</div>
													<div className="password mb-2">
														<label htmlFor="password">Password *</label>
														<input
															type="password"
															name="password"
															id="password"
															className="form-control"
															aria-describedby="emailHelp"
															placeholder="Enter Password"
															onChange={this.handleChange}
															noValidate
														/>
														{errors.password.length > 0 && (
															<small className="error">{errors.password}</small>
														)}
													</div>
													<br />
													{validateForm(this.state.errors) && (
														<div className="col-md-12 text-center mb-3">
															<Link to={"/login"}>
																<button
																	onClick={e => {
																		let user = {
																			firstName: this.state.firstName,
																			lastName: this.state.lastName,
																			time_zone: this.state.timezone_offset,
																			email: this.state.email,
																			password: this.state.password
																		};
																		actions.addUser(user);
																	}}
																	type="button"
																	className="px-3 p-2 tx-tfm mt-2 submit">
																	Sign Up
																</button>
															</Link>
														</div>
													)}
												</form>
											</div>
										</div>
									</div>
								</div>
								<br />
								<Link to={"/login"}>
									<div className="text-center">
										<small>Back to Login</small>
									</div>
								</Link>
								<br />
								<br />
							</div>
						</div>

						{/* below is a background just for show */}
						{/* below is a background just for show */}
						{/* below is a background just for show */}

						<div className="container col-8 Absolute" id="shadowHobbyView">
							<img src={newFolder} />
						</div>
					</>
				)}
			</Context.Consumer>
		);
	}
}

SignUp.contextType = Context;
