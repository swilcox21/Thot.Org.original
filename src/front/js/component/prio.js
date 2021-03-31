import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import TextareaAutosize from "react-textarea-autosize";
import { TodoInfoModal } from "./todoInfoModal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import ReactDatePicker from "react-datepicker";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NumericInput from "react-numeric-input";
import dayjs from "dayjs";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import PropTypes from "prop-types";

// const Textarea = ({ children, ...props }) => <textarea {...props}>{children}</textarea>;

class Prio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTodoIndex: false,
			hobby: [],
			delta: 0,
			status: {
				color: "success",
				message: ""
			},
			selectedDate: null,
			todo: "",
			color: "black",
			folder: 1,
			dateChange: false,
			taskDate: null
		};
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
	};

	resetTask = () => {
		this.setState({ task: null });
	};

	// CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	// 	<a
	// 		href=""
	// 		ref={ref}
	// 		onClick={e => {
	// 			e.preventDefault();
	// 			onClick(e);
	// 		}}>
	// 		{children}
	// 		&#x25bc;
	// 	</a>
	// ));

	// CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
	// 	const [value, setValue] = useState("");

	// 	return (
	// 		<div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
	// 			<FormControl
	// 				autoFocus
	// 				className="mx-3 my-2 w-auto"
	// 				placeholder="Type to filter..."
	// 				onChange={e => setValue(e.target.value)}
	// 				value={value}
	// 			/>
	// 			<ul className="list-unstyled">
	// 				{React.Children.toArray(children).filter(
	// 					child => !value || child.props.children.toLowerCase().startsWith(value)
	// 				)}
	// 			</ul>
	// 		</div>
	// 	);
	// });

	render() {
		// const Tag = this.props.autoSize ? TextareaAutosize : Textarea;
		return (
			<Context.Consumer>
				{({ actions, store }) => {
					return (
						<div className="container text-center">
							{this.props.tasks.map((todo, index) => (
								<div key={todo.id}>
									<div className="d-flex justify-content-around mx-auto col-xs-12 col-md-11 activeTodoDiv inputAndTextArea">
										{this.props.autoSize ? null : (
											<input
												className="inputTypeNumber text-center"
												type="number"
												min="1"
												max="7"
												defaultValue={todo.folder}
												onChange={e => {
													this.setState({
														task: {
															label: todo.label,
															date: todo.date,
															dashboard: todo.dashboard,
															folder: e.target.value
														}
													});
												}}
												onBlur={() => {
													this.state.task &&
														actions.handleChangeHobby(todo.id, this.state.task);
													this.resetTask();
												}}
											/>
										)}
										{this.props.autoSize ? (
											<TextareaAutosize
												id="textareaautosize"
												className="pl-2 col-12 activeTodo pb-5"
												type="text"
												defaultValue={todo.label}
												placeholder="dont leave me blank!"
												onChange={e => {
													this.setState({
														task: {
															label: e.target.value,
															date: todo.date,
															dashboard: todo.dashboard,
															folder: todo.folder
														}
													});
												}}
												onBlur={() => {
													this.state.task &&
														actions.handleChangeHobby(todo.id, this.state.task);
													this.resetTask();
												}}
											/>
										) : (
											<textarea
												className="pl-2 col-12 activeTodo onfucus"
												type="text"
												defaultValue={todo.label}
												placeholder="dont leave me blank!"
												onChange={e => {
													this.setState({
														task: {
															label: e.target.value,
															date: todo.date,
															dashboard: todo.dashboard,
															folder: todo.folder
														}
													});
												}}
												onBlur={() => {
													this.state.task &&
														actions.handleChangeHobby(todo.id, this.state.task);
													this.resetTask();
												}}
											/>
										)}
										<Dropdown className="mt-2 ml-3">
											<Dropdown.Toggle id="dropdown-custom-components" className="dropdowntoggle">
												{todo.date ? (
													<button
														onDoubleClick={() => {
															let task = {
																label: todo.label,
																date: todo.date,
																dashboard: !todo.dashboard,
																folder: todo.folder
															};
															actions.handleChangeHobby(todo.id, task);
														}}
														className="dropdowntogglee text-center"
														id="dropdowntoggle">
														<div className="text-center py-1" id="dropDownDate">
															{dayjs(todo.date).format("MM/DD")}
														</div>
													</button>
												) : (
													<button
														onDoubleClick={() => {
															let task = {
																label: todo.label,
																date: todo.date,
																dashboard: !todo.dashboard,
																folder: todo.folder
															};
															actions.handleChangeHobby(todo.id, task);
														}}
														className="dropdowntogglee"
														id="dropdowntoggle dropDownList">
														<i className="fas fa-list" id="" />
													</button>
												)}
											</Dropdown.Toggle>
											<Dropdown.Menu className="mt-1">
												<div>
													{todo.date ? (
														<small className="Absolute ml-4">
															{dayjs(todo.date).format("MM/DD/YYYY")}
														</small>
													) : (
														<small className="Absolute ml-4">assign date...</small>
													)}
													{todo.date != null && (
														<span
															onClick={() => {
																this.setState({ selectedDate: null });
																let dateChange = {
																	label: todo.label,
																	date: null,
																	dashboard: todo.dashboard,
																	folder: todo.folder
																};
																this.setState({
																	task: dateChange
																});
																actions.handleChangeHobby(todo.id, dateChange);
																this.resetTask();
															}}
															className="Absolute Right">
															N
														</span>
													)}
													<span>
														<ReactDatePicker
															className={
																this.state.selectedDate === null
																	? "Opacity newTaskDatePicker"
																	: "newTaskDatePicker"
															}
															selected={
																this.state.selectedDate &&
																this.state.selectedDate.toDate()
															}
															onChange={date => {
																// this.setState({ dateChange: !this.state.dateChange });
																this.setState({ selectedDate: dayjs(date) });
																let dateChange = {
																	label: todo.label,
																	date: date,
																	dashboard: todo.dashboard,
																	folder: todo.folder
																};
																this.setState({
																	task: dateChange
																});
																actions.handleChangeHobby(todo.id, dateChange);
																this.resetTask();
															}}
															minDate={dayjs().toDate()}
														/>
													</span>
												</div>
												<Dropdown.Item eventKey="3">
													<CopyToClipboard className="" text={todo.label}>
														<div className="text-center">
															<i className="far fa-clipboard" />
														</div>
													</CopyToClipboard>
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="2"
													onClick={() => {
														let task = {
															label: todo.label,
															date: todo.date,
															dashboard: !todo.dashboard,
															folder: todo.folder
														};
														actions.handleChangeHobby(todo.id, task);
													}}>
													<div className="">DASHBOARD</div>
												</Dropdown.Item>
												<Dropdown.Divider />
												<Dropdown.Item eventKey="4">
													<div
														onClick={() => {
															actions.deleteHobby(todo.id);
														}}
														className="text-center mt-3">
														<i className="fas fa-trash-alt" />
													</div>
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</div>
							))}
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

Prio.displayName = "Prio";
// CustomToggle.displayName = "CustomToggle";
// CustomMenu.displayName = "CustomMenu";

export default Prio;

Prio.contextType = Context;

Prio.propTypes = {
	folder: PropTypes.number,
	dashboard: PropTypes.bool,
	autoSize: PropTypes.bool,
	style: PropTypes.node.isRequired,
	className: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
	"aria-labelledby": PropTypes.node.isRequired,
	onClick: PropTypes.node.isRequired,
	tasks: PropTypes.array
};
