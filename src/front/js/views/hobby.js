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
import { TodoWidget } from "../component/todowidget";
import { Spring, Transition, animated } from "react-spring/renderprops";
import Clock from "../component/clock";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import timeZone from "dayjs-ext/plugin/timeZone";
import utc from "dayjs/plugin/utc";
import { Dropdown } from "semantic-ui-react";

// dayjs.extend(utc);
// dayjs.extend(timeZone);
// dayjs.tz.setDefault("America/New_York");

export class Hobby extends React.Component {
	constructor() {
		super();
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
			task: null,
			taskDate: dayjs(),
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

	componentDidMount() {
		this.context.actions.getAllTasks(this.state.currentDate, this.state.currentDate.add(24, "hour"));
		this.context.actions.getNotes().then(() => {
			if (Array.isArray(this.context.store.notes) && this.context.store.notes.length > 0)
				this.setState({ notes: this.context.store.notes[0].notes });
		});
		console.log("THIS IS MY FLAGDSAFEWF", this.context.store.folder);
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
		this.setState({ folder: "tasks" });
		this.setState({ folderValue: "" });
		this.setState({ taskDate: this.state.currentDate });
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
		const dashboardThots = Array.isArray(this.context.store.hobby)
			? this.context.store.hobby.filter(todo => todo.dashboard === true)
			: [];
		const _newFolder = Array.isArray(this.context.store.folder)
			? this.context.store.folder.filter(folder => folder === this.state.newFolder)
			: [];
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<div className="container-fluid">
						<button
							className="toggleButton mt-1"
							onDoubleClick={() => {
								this.setState({ currentDate: dayjs() });
								this.setState({ taskDate: dayjs() });
								this.setState({ folder: "tasks" });
								actions.getAllTasks(dayjs(), dayjs().add(24, "hour"));
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
												this.setState({ folder: "tasks" });
												actions.getAllTasks(date, dayjs(date).add(24, "hour"));
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
						<div className="d-flex mt-5 mx-auto mb-3 col-md-6">
							<input
								onBlur={() => this.setState({ folderValue: "" })}
								className="borderBottomRight"
								placeholder={this.state.folder}
								value={this.state.folderValue}
								onChange={e => {
									this.setState({ folder: e.target.value });
									this.setState({ folderValue: e.target.value });
									this.setState({ newFolder: e.target.value });
									// e.target.value != "tasks", "meetings" && (() => this.setState({ taskDate: null }));
								}}
								list="folders"
								name="folder"
								id="folder"
							/>
							<datalist id="folders">
								{store.folder.map(folder => (
									<div key={folder.id}>
										<option value={folder} />
									</div>
								))}
							</datalist>
							{_newFolder.length === 0 && (
								<button onClick={() => actions.addNewFolder(this.state.newFolder)}>create</button>
							)}
							<TextareaAutosize
								className="pl-2 col-md-11 activeTodo onfucus addNew py-3"
								placeholder="Stop being lazy and JUST DO IT!"
								type="text"
								value={this.state.todo}
								onChange={e => this.handleChange(e)}
							/>
						</div>
						{this.state.status.message !== "" && (
							<div className={`alert alert-${this.state.status.color}`}>{this.state.status.message}</div>
						)}
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
							<div className="newTaskDatePicker ml-5">
								<ReactDatePicker
									selected={this.state.taskDate ? this.state.taskDate.toDate() : null}
									onChange={date => this.setState({ taskDate: dayjs(date) })}
									minDate={dayjs().toDate()}
								/>
							</div>
						</div>
						<div className="d-flex flex-wrap mt-5">
							<div className="container-fluid col-md-6">
								<div className="mt-3">
									<TodoWidget
										folder={"tasks"}
										tasks={store.hobby}
										type={"Tasks"}
										collapse={false}
										className="mt-3"
									/>
								</div>
							</div>
							{/* PUT MAP FUNC HERE -- learn how to generate components like these dynamically so users can add more as they need to */}
							<div className="col-md-6">
								<div className="">
									<TodoWidget
										folder={"meetings"}
										tasks={store.hobby}
										type={"meetings"}
										collapse={false}
									/>
								</div>
							</div>
							{store.folder.filter(folder => (folder != "tasks") & (folder != "meetings")).map(folder => (
								<div key={folder.id} className="mt-5 col-md-6">
									<TodoWidget folder={folder} tasks={store.hobby} collapse={true} />
								</div>
							))}
						</div>
						<div className="col-12 mt-3">
							<CopyToClipboard text={this.state.notes}>
								<button>Copy Notes to clipboard</button>
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
