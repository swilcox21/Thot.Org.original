import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Prio } from "../component/prio";
import TextareaAutosize from "react-textarea-autosize";
import ReactDatePicker from "react-datepicker";
import { WorkNavbar } from "../component/worknavbar";
import { Spring, Transition, animated } from "react-spring/renderprops";
import Clock from "../component/clock";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import timeZone from "dayjs-ext/plugin/timeZone";
import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);
// dayjs.extend(timeZone);
// dayjs.tz.setDefault("America/New_York");

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
		this.setState({ priority: 2 });
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
						<div className="text-center mb-5 col-10 mt-3 mx-auto">
							<Prio priority={1} />
						</div>
						<div className="d-flex flex-wrap mt-5">
							<div className="col-md-6">
								<div className="col-md-12 d-flex justify-content-between mb-3">
									<input
										value={this.state.priority}
										onChange={e => {
											this.setState({ priority: e.target.value });
										}}
										className="inputTypeNumber2 inputTypeNumber text-center"
										type="number"
										min="1"
										max="5"
									/>
									<TextareaAutosize
										className="pl-2 col-11 activeTodo onfucus addNew py-3"
										placeholder="Stop being lazy and JUST DO IT!"
										type="text"
										value={this.state.todo}
										onChange={e => this.handleChange(e)}
									/>
								</div>
								{this.state.status.message !== "" && (
									<div className={`alert alert-${this.state.status.color}`}>
										{this.state.status.message}
									</div>
								)}
								<div className="d-flex justify-content-around col-md-12 text-center">
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
								<div className="todaysTasks mt-3">Tasks:</div>
								<Prio priority={2} />
							</div>
							<div className="col-md-6">
								<div className="todaysTasks mt-3">Meetings:</div>
								<Prio priority={3} />
								{/* </div> */}
								{/* <div className="col-md-6"> */}
								<div className="todaysTasks mt-3 ">ideas:</div>
								<Prio priority={4} />
								{/* </div> */}
								{/* <div className="col-md-6"> */}
								<div className="todaysTasks mt-3 ">issues:</div>
								<Prio priority={5} />
							</div>
							{/* </div> */}
						</div>
						<div className="col-12">
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
				)}
			</Context.Consumer>
		);
	}
}

Hobby.contextType = Context;
