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
			time_zone: "Eastern Time",
			email: "",
			password: "",
			errors: {
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
			currentDate: dayjs(),
			taskDate: dayjs()
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
			// case "firstName":
			// 	errors.firstName = value.length < 1 ? "This field is required *" : "";
			// 	break;
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
														{/* {errors.firstName.length > 0 && (
															<span className="error">{errors.firstName}</span>
														)} */}
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
														<label htmlFor="span5">Time Zone</label>
														<select
															onChange={e => this.setState({ time_zone: e.target.value })}
															name="timezone_offset"
															id="timezone-offset"
															className="span5">
															<option value="Eniwetok, Kwajalein">
																(GMT -12:00) Eniwetok, Kwajalein
															</option>
															<option value="Midway Island, Samoa">
																(GMT -11:00) Midway Island, Samoa
															</option>
															<option value="Hawaii">(GMT -10:00) Hawaii</option>
															<option value="Taiohae">(GMT -9:30) Taiohae</option>
															<option value="Alaska">(GMT -9:00) Alaska</option>
															<option value="Pacific Time">
																(GMT -8:00) Pacific Time (US &amp; Canada)
															</option>
															<option value="Mountain Time">
																(GMT -7:00) Mountain Time (US &amp; Canada)
															</option>
															<option value="Central Time">
																(GMT -6:00) Central Time (US &amp; Canada), Mexico City
															</option>
															<option value="Eastern Time" selected="selected">
																(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
															</option>
															<option value="Caracas">(GMT -4:30) Caracas</option>
															<option value="Atlantic Time">
																(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
															</option>
															<option value="Newfoundland">
																(GMT -3:30) Newfoundland
															</option>
															<option value="Brazil">
																(GMT -3:00) Brazil, Buenos Aires, Georgetown
															</option>
															<option value="Mid-Atlantic">
																(GMT -2:00) Mid-Atlantic
															</option>
															<option value="Azores">
																(GMT -1:00) Azores, Cape Verde Islands
															</option>
															<option value="Western Europe Time">
																(GMT) Western Europe Time, London, Lisbon, Casablanca
															</option>
															<option value="Brussels">
																(GMT +1:00) Brussels, Copenhagen, Madrid, Paris
															</option>
															<option value="Kaliningrad">
																(GMT +2:00) Kaliningrad, South Africa
															</option>
															<option value="Baghdad">
																(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
															</option>
															<option value="Tehran">(GMT +3:30) Tehran</option>
															<option value="Abu Dhabi">
																(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
															</option>
															<option value="Kabul">(GMT +4:30) Kabul</option>
															<option value="Ekaterinburg">
																(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
															</option>
															<option value="Bombay">
																(GMT +5:30) Bombay, Calcutta, Madras, New Delhi
															</option>
															<option value="Kathmandu">
																(GMT +5:45) Kathmandu, Pokhara
															</option>
															<option value="Almaty">
																(GMT +6:00) Almaty, Dhaka, Colombo
															</option>
															<option value="Yangon">(GMT +6:30) Yangon, Mandalay</option>
															<option value="Bangkok">
																(GMT +7:00) Bangkok, Hanoi, Jakarta
															</option>
															<option value="Beijing">
																(GMT +8:00) Beijing, Perth, Singapore, Hong Kong
															</option>
															<option value="Eucla">(GMT +8:45) Eucla</option>
															<option value="Tokyo">
																(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
															</option>
															<option value="Adelaide">
																(GMT +9:30) Adelaide, Darwin
															</option>
															<option value="Eastern Australia">
																(GMT +10:00) Eastern Australia, Guam, Vladivostok
															</option>
															<option value="Lord Howe Island">
																(GMT +10:30) Lord Howe Island
															</option>
															<option value="Magadan">
																(GMT +11:00) Magadan, Solomon Islands, New Caledonia
															</option>
															<option value="Norfolk Island">
																(GMT +11:30) Norfolk Island
															</option>
															<option value="Auckland">
																(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
															</option>
															<option value="Chatham Islands">
																(GMT +12:45) Chatham Islands
															</option>
															<option value="Apia">(GMT +13:00) Apia, Nukualofa</option>
															<option value="Line Islands">
																(GMT +14:00) Line Islands, Tokelau
															</option>
														</select>
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
