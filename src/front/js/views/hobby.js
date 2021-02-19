import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Prio1 } from "../component/prio1";
import { Prio2 } from "../component/prio2";
import { Prio3 } from "../component/prio3";
import { Prio4 } from "../component/prio4";
import { Prio5 } from "../component/prio5";
import ReactDatePicker from "react-datepicker";
import { WorkNavbar } from "../component/worknavbar";
import { Spring, Transition, animated } from "react-spring/renderprops";
import Clock from "../component/clock";

export class Hobby extends React.Component {
	constructor() {
		super();
		this.state = {
			showTodoIndex: false,
			hobby: [],
			delta: 0,
			notes: "",
			status: {
				color: "success",
				message: ""
			},
			todo: "",
			selectedDate: new Date(),
			color: "black",
			priority: 2,
			task: null
		};
	}

	toggle = () => this.setState({ showWorkNavbar: !this.state.showWorkNavbar });

	handleshowTodoIndex = index => this.setState({ showTodoIndex: index });

	addToHobby = todo => {
		this.setState({
			hobby: [...this.state.hobby, todo]
		});
	};

	componentDidMount() {
		this.context.actions.getAllTasks();
		this.context.actions.getNotes();
		// this.context.store.hobby &&
		// 	this.context.store.hobby != this.state.hobby &&
		// 	this.setState({ hobby: this.context.store.hobby });
	}

	// componentDidUpdate() {
	// 	this.context.store.hobby &&
	// 		this.context.store.hobby != this.state.hobby &&
	// 		this.setState({ hobby: this.context.store.hobby });
	// }

	handleChange = e => {
		this.setState({
			todo: e.target.value
		});
	};

	handleChangeNotes = e => {
		this.setState({
			notes: e.target.value
		});
	};

	resetTextArea = () => {
		this.setState({ todo: "" });
		this.setState({ priority: 2 });
		this.setState({ selectedDate: new Date() });
	};

	resetTask = () => {
		this.setState({ task: null });
	};

	handleComplete = () => {
		if (this.state.hobby.complete === false) {
			return "pl-2 col-10 mt-1 activeTodo";
		} else {
			return "pl-2 col-10 mt-1 activeTodo done done2";
		}
	};

	render() {
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<div className="container-fluid">
						<button className="toggleButton mt-1" onClick={() => this.toggle()}>
							<i className="far fa-calendar-alt" />
						</button>
						<Transition
							native
							items={this.state.showWorkNavbar}
							from={{ marginLeft: -900 }}
							enter={{ marginLeft: -15 }}
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
						<div className="container text-left ml-5 mt-1 clock">
							{new Date().toLocaleString("en-us", { weekday: "long" })}
							<Clock />
						</div>
						<div className="text-center">
							<Prio1 />
						</div>
						<ReactDatePicker
							selected={this.state.selectedDate}
							onChange={date => this.setState({ selectedDate: date })}
							minDate={new Date()}
						/>
						<div className="row">
							<div className="col-md-7">
								<textarea
									className="pt-4 pl-2 mt-3 col-12 text-center"
									placeholder="Stop being lazy and JUST DO IT!"
									type="text"
									value={this.state.todo}
									onChange={e => this.handleChange(e)}
								/>
								{this.state.status.message !== "" && (
									<div className={`alert alert-${this.state.status.color}`}>
										{this.state.status.message}
									</div>
								)}
								<div className="mb-3 mt-2 col-11 text-center">
									<input
										value={this.state.priority}
										onChange={e => {
											this.setState({ priority: e.target.value });
										}}
										className="inputTypeNumber inputTypeNumber2 text-center mr-2"
										type="number"
										min="1"
										max="5"
									/>
									<button
										onClick={() => {
											let todo = {
												label: this.state.todo,
												date: this.state.selectedDate ? this.state.selectedDate : new Date(),
												completed: false,
												priority: this.state.priority
											};
											actions
												.addNewTask(todo)
												.then(() => {
													this.resetTextArea();
												})
												.catch(error => {
													this.setState({
														status: { color: "danger", message: error.message }
													});
												});
											// this.resetTextArea();
										}}>
										SUBMIT
									</button>
								</div>
								<Prio2 />
								<Prio3 />
								<br />
								<Prio4 />
								<br />
								<Prio5 />
							</div>
							<div className="col-md-5">
								<textarea
									className="p-2 mt-3 col-12 notes"
									placeholder="NOTES"
									type="text"
									defaultValue={this.state.notes}
									onChange={e => this.handleChangeNotes(e)}
									onFocus={e => this.handleChangeNotes(e)}
									onBlur={() => actions.handleChangeNotes(this.state.notes)}
								/>
							</div>
						</div>
					</div>
				)}
			</Context.Consumer>
		);
	}
}

Hobby.contextType = Context;
