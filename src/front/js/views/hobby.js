import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Prio from "../component/prio";
import TextareaAutosize from "react-textarea-autosize";
import ReactDatePicker from "react-datepicker";
import { WorkNavbar } from "../component/worknavbar";
import { TodoWidget } from "../component/todowidget";
import { Spring, Transition, animated } from "react-spring/renderprops";
import Clock from "../component/clock";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import timeZone from "dayjs-ext/plugin/timeZone";
import utc from "dayjs/plugin/utc";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Dropdown } from "semantic-ui-react";

dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.extend(isToday);
export class Hobby extends React.Component {
	constructor() {
		super();
		this.state = {
			archives: false,
			color: "black",
			currentDate: dayjs().tz("America/New_York"),
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
			forum: false,
			showTodoIndex: false,
			task: null,
			taskDate: null,
			todo: "",
			wow: false
		};
	}

	toggle = () => this.setState({ showWorkNavbar: !this.state.showWorkNavbar });

	handleshowTodoIndex = index => this.setState({ showTodoIndex: index });

	addToHobby = todo => {
		this.setState({
			hobby: [...this.state.hobby, todo]
		});
	};
	// this.state.currentDate, this.state.currentDate.add(24, "hour")
	componentDidMount() {
		this.context.actions.getUser();
		// .then(console.log("timezoooone", this.context.store.folder))
		// .then(this.setState({ currentDate: dayjs().tz(this.context.store.time_zone.toString()), time_zone: this.context.store.time_zone.toString() }));
		this.context.actions.getAllTasks(
			this.state.currentDate,
			this.state.currentDate.add(24, "hour"),
			this.state.currentDate.isToday()
		);
		this.context.actions.getNotes().then(() => {
			if (Array.isArray(this.context.store.notes) && this.context.store.notes.length > 0)
				this.setState({ notes: this.context.store.notes[0].notes });
		});
	}

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
		// this.setState({ folder: "tasks" });
		this.setState({ folderValue: "" });
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

	// toggle noneDate thots from view
	toggleIdeas = ideas => {
		this.setState({ ideas: !ideas });
	};
	toggleIssues = issues => {
		this.setState({ issues: !issues });
	};
	toggleWow = wow => {
		this.setState({ wow: !wow });
	};
	togglegThots = gThots => {
		this.setState({ gThots: !gThots });
	};
	toggleArchives = archives => {
		this.setState({ archives: !archives });
	};

	render() {
		const time_zone = "America/New_York";
		const dashboardThots = Array.isArray(this.context.store.hobby)
			? this.context.store.hobby.filter(todo => todo.dashboard === true)
			: [];
		const _newFolder = Array.isArray(this.context.store.folder)
			? this.context.store.folder.filter(folder => folder.folder === this.state.newFolder)
			: [];
		// const meetingsFunc = Array.isArray(this.context.store.hobby)
		// 	? this.context.store.hobby.filter(hobby => hobby.folder === "meetings")
		// 	: [];
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<>
						<div className="row">
							<div className="col-12 col-md-2 bg-dark text-light">
								this div will be a togglable navbar with all the extra folders or something idk exactly
								what to do with it yet
							</div>
							<div className="container col-12 col-md-8 ml-3">
								<div className="toggleButton mt-1 mr-3">
									<button
										id="addDayButtons"
										onClick={() => {
											this.setState({
												currentDate: dayjs(this.state.currentDate)
													.tz(time_zone)
													.subtract(24, "hour")
											});
											this.state.folder === "meetings"
												? this.setState({
														taskDate: dayjs(this.state.currentDate)
															.tz(time_zone)
															.subtract(24, "hour")
												  })
												: this.setState({ taskDate: null });
											actions.getAllTasks(
												dayjs(this.state.currentDate)
													.tz(time_zone)
													.subtract(24, "hour"),
												this.state.currentDate,
												this.state.currentDate
													.tz(time_zone)
													.subtract(24, "hour")
													.isToday()
											);
										}}>
										<i className="fas fa-chevron-left" />
									</button>
									<button
										className="mx-1"
										onDoubleClick={() => {
											console.log("timezoneflag:", time_zone);
											this.setState({ currentDate: dayjs().tz(time_zone) });
											this.state.folder === "meetings"
												? this.setState({ taskDate: dayjs().tz(time_zone) })
												: this.setState({ taskDate: null });
											actions.getAllTasks(
												dayjs().tz(time_zone),
												dayjs()
													.tz(time_zone)
													.add(24, "hour"),
												true
											);
										}}
										onClick={() => this.toggle()}>
										<i className="far fa-calendar-alt" />
									</button>
									<button
										id="addDayButtons"
										onClick={() => {
											this.setState({
												currentDate: dayjs(this.state.currentDate)
													.tz(time_zone)
													.add(24, "hour")
											});
											this.state.folder === "meetings"
												? this.setState({
														taskDate: dayjs(this.state.currentDate)
															.tz(time_zone)
															.add(24, "hour")
												  })
												: this.setState({ taskDate: null });
											actions.getAllTasks(
												this.state.currentDate.tz(time_zone).add(24, "hour"),
												this.state.currentDate.tz(time_zone).add(48, "hour"),
												this.state.currentDate
													.tz(time_zone)
													.add(24, "hour")
													.isToday()
											);
										}}>
										<i className="fas fa-chevron-right" />
									</button>
								</div>
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

														this.state.folder === "meetings"
															? this.setState({ taskDate: date })
															: this.setState({ taskDate: null });
														actions.getAllTasks(
															date,
															dayjs(date)
																.tz(time_zone)
																.add(24, "hour"),
															date.tz(time_zone).isToday()
														);
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
								{dashboardThots.length > 0 && (
									<div className="mb-5 col-md-10 mt-3 mx-auto">
										<span className="toggleOpen">DashBoard:</span>
										<Prio tasks={dashboardThots} autoSize={true} />
										<br />
										<br />
										<br />
									</div>
								)}
								<div className="d-flex flex-wrap justify-content-between mt-5">
									<div className="col-md-6">
										<div className="d-flex mt-3 mx-auto mb-3">
											<input
												onBlur={() => this.setState({ folderValue: "" })}
												className="borderBottomRight col-3 col-md-3"
												placeholder={this.state.folder}
												value={this.state.folderValue}
												onChange={e => {
													this.setState({ folder: e.target.value });
													this.setState({ folderValue: e.target.value });
													this.setState({ newFolder: e.target.value });
													e.target.value != "meetings"
														? this.setState({ taskDate: null })
														: this.state.taskDate === null &&
														  this.setState({ taskDate: this.state.currentDate });
												}}
												list="folders"
												name="folder"
												id="folder"
											/>
											<datalist id="folders">
												{store.folder.map(folder => (
													<div key={folder.id}>
														<option value={folder.folder} />
													</div>
												))}
											</datalist>
											<TextareaAutosize
												className="pl-2 col-md-11 activeTodo onfucus addNew py-3"
												placeholder="Just type what ya thinking about"
												type="text"
												value={this.state.todo}
												onChange={e => this.handleChange(e)}
											/>
										</div>
										{/* {this.state.status.message !== "" && (
							<div className={`alert alert-${this.state.status.color}`}>{this.state.status.message}</div>
						)} */}
										<div className="d-flex justify-content-center col-md-12 text-center">
											<button
												onClick={() => {
													let todo = {
														label: this.state.todo,
														date: this.state.taskDate ? this.state.taskDate : null,
														dashboard: false,
														folder: this.state.folder
													};
													actions
														.addNewTask(
															todo,
															this.state.currentDate,
															this.state.currentDate.add(24, "hour"),
															this.state.currentDate.isToday()
														)
														.then(() => {
															this.resetTextArea();
														})
														.catch(error => {
															this.setState({
																status: { color: "danger", message: error.message }
															});
														});
													_newFolder.length === 0 &&
														actions.addNewFolder(this.state.newFolder);
													// this.resetTextArea();
												}}>
												SUBMIT
											</button>
											<div className="newTaskDatePicker ml-5">
												<ReactDatePicker
													selected={this.state.taskDate ? this.state.taskDate.toDate() : null}
													onChange={date =>
														this.setState({ taskDate: dayjs(date).tz(time_zone) })
													}
													minDate={dayjs()
														.tz(time_zone)
														.toDate()}
												/>
											</div>
										</div>
									</div>
									<div className="col-md-5 ">
										<div className="">
											<TodoWidget
												folder={"meetings"}
												tasks={store.hobby}
												type={"meetings"}
												collapse={false}
											/>
										</div>
									</div>
									{/* PUT MAP FUNC HERE -- learn how to generate components like these dynamically so users can add more as they need to */}
									<div className="col-md-6">
										<div className="mt-3">
											<TodoWidget
												folder={"tasks"}
												tasks={store.hobby}
												type={"Tasks"}
												collapse={false}
												className="mt-3"
											/>
										</div>

										<small
											onClick={() => this.setState({ forum: !this.state.forum })}
											className="toggleOpen mt-5">
											open line of communication between all users
											{this.state.forum === true ? (
												<i className="fas fa-sort-down" />
											) : (
												<i className="fas fa-caret-left" />
											)}
										</small>
										{this.state.forum === true && (
											<>
												<br />
												<small>
													Please feel free to give any feedback or tips to improve the app in
													the shared text area below
												</small>
												<br />
												<small>
													** DISCLAIMER: all users of this app can see and modify this section
													PLEASE BE CONSIDERATE **
												</small>
												<textarea
													className="p-2 mt-3 mb-3 col-12 notes"
													placeholder="NOTES"
													type="text"
													value={this.state.notes}
													onChange={e => this.handleChangeNotes(e)}
													onFocus={e => this.handleChangeNotes(e)}
													onBlur={() => actions.handleChangeNotes(this.state.notes)}
												/>
											</>
											// add things to bottom left of website in here but note that they will push all other folders down
											// if its not inside the collapseable notes widget
										)}
									</div>
									<div className="col-md-6">
										{store.folder
											.filter(
												folder => (folder.folder != "tasks") & (folder.folder != "meetings")
											)
											.map(folder => (
												<div key={folder.id}>
													<TodoWidget
														folder={folder.folder}
														id={folder.id}
														tasks={store.hobby}
														collapse={true}
													/>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</Context.Consumer>
		);
	}
}

Hobby.contextType = Context;
