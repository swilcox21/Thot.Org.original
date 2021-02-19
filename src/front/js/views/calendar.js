import "../../styles/home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WorkNavbar } from "../component/worknavbar";
import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { Spring, Transition, animated } from "react-spring/renderprops";
import ReactCalendar from "../component/calender";

export class Calendar extends React.Component {
	constructor() {
		super();
		this.state = {
			todo: "",
			showWorkNavbar: false
		};
	}

	toggle = () => this.setState({ showWorkNavbar: !this.state.showWorkNavbar });

	handleChange = e => {
		this.setState({
			todo: e.target.value
		});
	};

	resetTextArea = () => {
		this.setState({ todo: "" });
	};

	render() {
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<div className="container">
						<Transition
							native
							items={this.state.showWorkNavbar}
							from={{ marginTop: -900 }}
							enter={{ marginTop: 0 }}
							leave={{ marginLeft: -900 }}>
							{show =>
								show &&
								(props => (
									<animated.div style={props}>
										<WorkNavbar toggle={this.toggle} />
									</animated.div>
								))
							}
						</Transition>
						<button className="toggleButton mt-1" onClick={() => this.toggle()}>
							<i className="fas fa-list" />
						</button>
						<div className="container text-center clock">
							{new Date().toLocaleString("en-us", { weekday: "long" })}
							<Clock />
						</div>
						<div className="col-xs-12 col-md-8 col-lg-6 text-center calender">
							<ReactCalendar />
						</div>
					</div>
				)}
			</Context.Consumer>
		);
	}
}
