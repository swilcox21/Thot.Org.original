import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import editMeeting from "../../img/editMeeting.gif";

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

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			archives: false,
			color: "black",
			currentDate: dayjs(),
			delta: 0,
			gThots: false,
			hobby: [],
			ideas: false,
			issues: false,
			notes: "",
			folderValue: "",
			folder: "tasks",
			newFolder: "tasks",
			status: {
				color: "success",
				message: ""
			},
			showTodoIndex: false,
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
			taskDate: dayjs(),
			todo: "",
			wow: false,
			email: "",
			password: "",
			errors: {
				email: " ",
				password: " "
			}
		};
	}

	componentDidMount() {
		this.context.actions.getNotes().then(() => {
			if (Array.isArray(this.context.store.notes) && this.context.store.notes.length > 0)
				this.setState({ notes: this.context.store.notes[0].notes });
		});
	}

	handleChange = event => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case "email":
				errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
				break;
			case "password":
				errors.password = value.length < 8 ? "Password must be atleast 8 characters long!" : "";
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
							<div className="container col-lg-3 col-md-6 col-9 mt-5 mt-md-3" id="loginBox">
								<div className="row">
									<div className="col-12 mx-auto">
										<div id="first">
											<div className="myform form ">
												<div className="logo mb-3">
													<div className="col-md-12 mt-4 mt-md-5 text-center">
														<h1>Login</h1>
													</div>
												</div>
												<form onSubmit={this.handleChange} noValidate>
													<div className="email">
														<label htmlFor="email">Email address</label>
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
													<div className="password">
														<label htmlFor="password">Password</label>
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
															<span className="error">{errors.password}</span>
														)}
													</div>
													<br />
													{store.errors === "invalid user name or password" && (
														<div className="text-center text-danger mb-2">
															<small>invalid user name or password</small>
														</div>
													)}
													{validateForm(this.state.errors) && (
														<div className="col-md-12 text-center ">
															<button
																onClick={() =>
																	actions.logging(
																		this.state.email,
																		this.state.password
																	)
																}
																type="submit"
																className="p-2 px-3 tx-tfm">
																LOGIN
															</button>
														</div>
													)}
													<br />
													<div className="mt-md-5 mt-2 " id="loginDivBackground">
														<h5 className="text-center">Dont have an account?</h5>
													</div>
												</form>
											</div>
											<Link to={"/signup"}>
												<div className="col-md-12 text-center mt-1 mb-2">
													<button type="submit" className="p-2 px-3 tx-tfm">
														Sign Up
													</button>
												</div>
											</Link>
											<div className="col-md-12 text-center mt-1 mb-5">
												<Link to={"/preview"}>
													<small>just visiting?</small>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<br />
							<br />
						</div>

						{/* the div below is just for show =P */}
						{/* the div below is just for show =P */}
						{/* the div below is just for show =P */}

						<div className="container col-8 Absolute" id="shadowHobbyView">
							<img src={editMeeting} />
						</div>
					</>
				)}
			</Context.Consumer>
		);
	}
}

Login.contextType = Context;
