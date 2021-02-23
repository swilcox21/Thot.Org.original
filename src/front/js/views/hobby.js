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
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
			taskDate: dayjs(),
			currentDate: dayjs(),
			color: "black",
			priority: 3,
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
		this.context.actions.getAllTasks(this.state.currentDate, this.state.currentDate);
		this.context.actions.getNotes().then(() => {
			console.log(this.state.currentDate);
			this.setState({ notes: this.context.store.notes[0].notes });
		});
		// this.context.store.notes != null && this.setState({ notes: "maybe this is wrong" });
		// console.log("notes:", this.context.store.notes);
	}

	// componentDidUpdate() {
	// 	this.context.actions.getAllTasks(this.state.currentDate, this.state.currentDate);
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
		this.setState({ priority: 3 });
		this.setState({ taskDate: dayjs() });
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
						<button
							className="toggleButton mt-1"
							onDoubleClick={() => {
								this.setState({ currentDate: dayjs() });
								this.setState({ taskDate: dayjs() });
								actions.getAllTasks(dayjs(), dayjs());
							}}
							onClick={() => this.toggle()}>
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
										<WorkNavbar
											toggle={this.toggle}
											onChange={date => {
												this.setState({ currentDate: date });
												this.setState({ taskDate: date });
												actions.getAllTasks(date, date);
												this.toggle();
											}}
										/>
									</animated.div>
								))
							}
						</Transition>
						<div className="container text-left ml-5 mt-1 clock">
							{this.state.currentDate.format("dddd  M/DD/YYYY")}
							<Clock />
						</div>
						<div className="text-center">
							<Prio1 />
						</div>
						<div className="row">
							<div className="col-md-7">
								<div className="todaysTasks my-2">Today:</div>
								<Prio2 />
								<Prio3 />
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
								<div className="mb-3 mt-2 col-12 d-flex justify-content-between">
									<input
										value={this.state.priority}
										onChange={e => {
											this.setState({ priority: e.target.value });
										}}
										className="inputTypeNumber text-center mr-2"
										type="number"
										min="1"
										max="5"
									/>
									<div />
									<div />
									<button
										onClick={() => {
											let todo = {
												label: this.state.todo,
												date: this.state.taskDate ? this.state.taskDate : dayjs(),
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
									<div className="newTaskDatePicker">
										<ReactDatePicker
											selected={this.state.taskDate.toDate()}
											onChange={date => this.setState({ taskDate: dayjs(date) })}
											minDate={dayjs().toDate()}
										/>
									</div>
								</div>
								<div className="todaysTasks mt-3 mb-2">Weekly:</div>
								<Prio4 />
								<div className="todaysTasks mt-3 mb-2">Long Term:</div>
								<Prio5 />
							</div>
							<div className="col-md-5">
								<CopyToClipboard text={this.state.notes}>
									<button>Copy to clipboard</button>
								</CopyToClipboard>
								<textarea
									className="p-2 mt-3 col-12 notes"
									placeholder="NOTES"
									type="text"
									value={this.state.notes}
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
