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
import utc from "dayjs/plugin/utc";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Dropdown } from "semantic-ui-react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import timeZone from "dayjs/plugin/timezone";
import ReactTooltip from "react-tooltip";
import Joyride from "react-joyride";

// .tz("America/New_York")
dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.extend(isToday);
console.log(dayjs);
// dayjs.tz.setDefault("America/New_York");
// dayjs.defaultTimezone
dayjs.new = _date => {
	console.log("NEWDATEFLAGGG:", localStorage.getItem("thot.org.time_zone"));
	return dayjs(_date).tz(localStorage.getItem("thot.org.time_zone") || "America/New_York");
};
export class Hobby extends React.Component {
	constructor() {
		super();
		this.state = {
			run: true,
			steps: [
				{
					target: ".my-first-step",
					content:
						"This section is where new thots are created, just pick the folder (or make a new one), write your thot in space provided (no limit on the size, can also leave it blank if you want), then pick a date (or leave it blank to have it show up everyday), then hit submit!"
				},
				{
					target: ".my-second-step",
					content:
						"Newly created folders (besides tasks and meetings) will show up here in this component to our left, just tap the green < to toggle this window on or off"
				},
				{
					target: ".my-third-step",
					content:
						"The Calendar lets you pick which day you want to look at, if the date is set for today it will show you all thots for today and all thots that have no dates specified, double clicking will set todays date"
				},
				{
					target: ".my-fourth-step",
					content:
						"this hotel will log you in as a visitor, just be aware that all activity on the visitors page will be cleaned out daily at 1am"
				},
				{
					target: ".my-fifth-step",
					content:
						"still confused?? check out our well organized FAQ documentation to answer any questions you still may have"
				},
				{
					target: ".my-sixth-step",
					content:
						"oh and dont forget to leave the developer a love note down in the open source notes section by click this toggle, (just be respectful all users of the app can see this section) AND THANKS SO MUCH FOR VISTING THOT.ORG"
				}
			],
			archives: false,
			color: "black",
			currentDate: dayjs.new(),
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
			showSideBar: true,
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
		// .then(this.setState({ currentDate: dayjs.new().tz(this.context.store.time_zone.toString()), time_zone: this.context.store.time_zone.toString() }));
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
		const { steps } = this.state;
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
							<Joyride continuous={true} run={this.state.run} steps={steps} />
							<div className="Absolute navFloat my-fifth-step">hi</div>
							<div className="Absolute navFloat2 my-fourth-step">hi</div>
							<ReactTooltip />
							{this.state.showSideBar === false ? (
								<div className="col-1" id="NFNB2">
									<button
										data-tip="show side bar"
										id="caret"
										className="mt-1 ml-2"
										onClick={() => this.setState({ showSideBar: !this.state.showSideBar })}>
										<i className="fas fa-angle-right"></i>
									</button>
								</div>
							) : (
								<div className="col-6 col-md-3 my-second-step" id="NFNB">
									<button
										data-tip="hide side bar"
										id="caret"
										className="mt-1 mr-2 my-other-step"
										onClick={() => this.setState({ showSideBar: !this.state.showSideBar })}>
										<i className="fas fa-angle-left"></i>
									</button>
									{/* <Joyride continuous={true} steps={steps} /> */}
									<br />
									<br />
									{/* <input className="mt-2 col-11 mx-auto" type="text" placeholder="search folders" /> */}
									{store.folder
										.filter(folder => (folder.folder != "tasks") & (folder.folder != "meetings"))
										.map((folder, index) => (
											<div className="mt-2" key={folder.id}>
												<div className="">
													<span
														id={
															folder.collapse === false
																? "sideBarFolder"
																: "sideBarFoldercollapsed"
														}
														onClick={() => {
															let newFolder = {
																folder: folder.folder,
																collapse: !folder.collapse,
																main_view: folder.main_view
															};
															actions.changeFolder(folder.id, newFolder);
															this.setState({ collapse: !folder.collapse });
														}}
														className="ml-2">
														{folder.folder} &nbsp;{" "}
														{
															store.hobby.filter(hobby => hobby.folder === folder.folder)
																.length
														}{" "}
														&nbsp;
														{folder.collapse === true ? (
															<i className="fas fa-caret-left">&nbsp;</i>
														) : (
															<i className="fas fa-sort-down">&nbsp;</i>
														)}
													</span>
													<input
														data-tip="show on main screen"
														type="checkbox"
														checked={folder.main_view}
														onClick={() => {
															let folderMainView = {
																folder: folder.folder,
																collapse: folder.collapse,
																main_view: !folder.main_view
															};
															actions.changeFolder(folder.id, folderMainView);
															this.setState({ main_view: !folder.main_view });
														}}
													/>

													{folder.collapse === false && (
														<input
															data-tip={`${folder.folder} dashboard toggle (all)`}
															type="checkbox"
															// checked={} i think need help to figure out this one but give it a shot anyways
															id="sideBarCheckbox"
															onClick={() => {
																store.hobby
																	.filter(hobby => hobby.folder === folder.folder)
																	.map((thot, index) => {
																		let allThots = {
																			label: thot.label,
																			date: thot.date,
																			dashboard: !thot.dashboard,
																			folder: thot.folder
																		};
																		actions.handleChangeHobby(thot.id, allThots);
																	});
															}}
														/>
													)}
												</div>
												{folder.collapse === false &&
													store.hobby
														.filter(hobby => hobby.folder === folder.folder)
														.map((thot, index) => (
															<div key={thot.id}>
																<textarea
																	className="col-8 ml-2"
																	id="sideBarThot"
																	type="text"
																	defaultValue={thot.label}
																	onChange={e =>
																		this.setState({
																			sideBarThotx: e.target.value
																		})
																	}
																	onBlur={e => {
																		let newThot = {
																			label: e.target.value,
																			date: thot.date,
																			dashboard: thot.dashboard,
																			folder: thot.folder
																		};
																		actions.handleChangeHobby(thot.id, newThot);
																		this.setState({});
																	}}
																/>
																<input
																	data-tip={`${folder.folder} dashboard toggle (single)`}
																	id="sideBarCheckbox"
																	type="checkbox"
																	checked={thot.dashboard}
																	onClick={() => {
																		let newThot = {
																			label: thot.label,
																			date: thot.date,
																			dashboard: !thot.dashboard,
																			folder: thot.folder
																		};
																		actions.handleChangeHobby(thot.id, newThot);
																	}}
																/>
															</div>
														))}
											</div>
										))}
								</div>
							)}
							<div className="container col-10 col-md-6 ml-md-auto ml-5" id="hobbyCont">
								{store.email === "visitor@gmail.com" && (
									<small className="text-danger">
										!! WELCOME !! You have been logged in as a Visitor
										<br />
										All activity on this account will be cleaned out daily, but feel free to use it
										any way you want =] and thanks for visiting my website!
										<br />
									</small>
								)}
								<div className="toggleButton my-third-step mt-1 mr-3">
									<button
										data-tip={"minus one day"}
										id="addDayButtons"
										onClick={() => {
											this.setState({
												currentDate: dayjs(this.state.currentDate).subtract(24, "hour")
											});
											this.state.folder === "meetings"
												? this.setState({
														taskDate: dayjs(this.state.currentDate).subtract(24, "hour")
												  })
												: this.setState({ taskDate: null });
											actions.getAllTasks(
												dayjs(this.state.currentDate).subtract(24, "hour"),
												this.state.currentDate,
												this.state.currentDate.subtract(24, "hour").isToday()
											);
										}}>
										<i className="fas fa-chevron-left" />
									</button>

									<button
										data-tip={"click for calendar or double click to see today"}
										className="mx-1"
										onDoubleClick={() => {
											console.log("timezoneflag:", time_zone);
											this.setState({ currentDate: dayjs.new() });
											this.state.folder === "meetings"
												? this.setState({ taskDate: dayjs.new() })
												: this.setState({ taskDate: null });
											actions.getAllTasks(dayjs.new(), dayjs.new().add(24, "hour"), true);
										}}
										onClick={() => this.toggle()}>
										<i className="far fa-calendar-alt" />
									</button>
									<button
										data-tip={"add day"}
										id="addDayButtons"
										onClick={() => {
											this.setState({
												currentDate: dayjs(this.state.currentDate).add(24, "hour")
											});
											this.state.folder === "meetings"
												? this.setState({
														taskDate: dayjs(this.state.currentDate).add(24, "hour")
												  })
												: this.setState({ taskDate: null });
											actions.getAllTasks(
												this.state.currentDate.add(24, "hour"),
												this.state.currentDate.add(48, "hour"),
												this.state.currentDate.add(24, "hour").isToday()
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
															dayjs(date).add(24, "hour"),
															date.isToday()
														);
														this.toggle();
													}}
												/>
											</animated.div>
										))
									}
								</Transition>
								<div className="container text-left ml-5 mt-1 clock ">
									{this.state.currentDate.format("dddd  M/DD/YYYY")}
									<Clock />
								</div>
								{dashboardThots.length > 0 && (
									<div className="mb-5 col-12 mt-3 mx-auto">
										<span className="toggleOpen">DashBoard:</span>
										<Prio tasks={dashboardThots} autoSize={true} />
										<br />
										<br />
										<br />
									</div>
								)}
								<div className="justify-content-between col-lg-10 mx-auto mt-5">
									<div className="col-md-10 my-first-step">
										<div className="d-flex mt-3 mx-auto mb-3">
											<input
												data-tip={"select folder or type to create new"}
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
												data-tip={"add some content to your thought"}
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
												data-tip={
													"add thought to selected folder / create folder if none exists"
												}
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

											<div
												data-tip={"select date or leave blank for null"}
												className="newTaskDatePicker ml-5">
												<ReactDatePicker
													selected={this.state.taskDate ? this.state.taskDate.toDate() : null}
													onChange={date => this.setState({ taskDate: dayjs.new(date) })}
													minDate={dayjs.new().toDate()}
												/>
											</div>
										</div>
									</div>
									<div className="">
										<div className="">
											<TodoWidget
												sideBar={false}
												folder={"meetings"}
												tasks={store.hobby}
												type={"meetings"}
												collapse={false}
												main_view={true}
											/>
										</div>
									</div>
									{/* PUT MAP FUNC HERE -- learn how to generate components like these dynamically so users can add more as they need to */}
									<div className="">
										<div className="mt-3">
											<TodoWidget
												sideBar={false}
												folder={"tasks"}
												tasks={store.hobby}
												type={"Tasks"}
												collapse={false}
												main_view={true}
												className="mt-3"
											/>
										</div>

										<small
											onClick={() => this.setState({ forum: !this.state.forum })}
											className="toggleOpen mt-5 my-sixth-step">
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
									<div className="">
										{store.folder
											.filter(
												folder => (folder.folder != "tasks") & (folder.folder != "meetings")
											)
											.map(folder => (
												<div key={folder.id}>
													<TodoWidget
														sideBar={false}
														folder={folder.folder}
														id={folder.id}
														tasks={store.hobby}
														main_view={folder.main_view}
														collapse={folder.collapse}
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
