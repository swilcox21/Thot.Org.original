// import React, { useState, setStore, useEffect, useContext, getState, actions } from "react";
// import { Context } from "../store/appContext";
// import TextareaAutosize from "react-textarea-autosize";
// import { TodoInfoModal } from "./todoInfoModal";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/Dropdown";
// import FormControl from "react-bootstrap/FormControl";
// import ReactDatePicker from "react-datepicker";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import NumericInput from "react-numeric-input";
// import dayjs from "dayjs";
// import PropTypes from "prop-types";

// export const Thot = props => {
// 	const { store, actions } = useContext(Context);
// 	const [selectedDate, setSelectedDate] = useState(dayjs());
// 	const [task, setTask] = useState();
// 	// const [, set] = useState();
// 	// const [, set] = useState();

// 	const resetTask = () => {
// 		setTask();
// 	};

// 	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
// 		<a
// 			href=""
// 			ref={ref}
// 			onClick={e => {
// 				e.preventDefault();
// 				onClick(e);
// 			}}>
// 			{children}
// 			&#x25bc;
// 		</a>
// 	));

// 	const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
// 		const [value, setValue] = useState("");

// 		return (
// 			<div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
// 				<FormControl
// 					autoFocus
// 					className="mx-3 my-2 w-auto"
// 					placeholder="Type to filter..."
// 					onChange={e => setValue(e.target.value)}
// 					value={value}
// 				/>
// 				<ul className="list-unstyled">
// 					{React.Children.toArray(children).filter(
// 						child => !value || child.props.children.toLowerCase().startsWith(value)
// 					)}
// 				</ul>
// 			</div>
// 		);
// 	});

// 	return (
// 		<div className="container text-center">
// 			{Array.isArray(store.thots) &&
// 				store.thots.filter(todo => todo.type === props.type).map((todo, index) => (
// 					<div key={todo.id}>
// 						<div className="d-flex justify-content-between">
// 							<input
// 								className="inputTypeNumber text-center"
// 								type="number"
// 								min="1"
// 								max="3"
// 								value={todo.type}
// 								onChange={e => {
// 									setTask({
// 										task: {
// 											label: todo.label,
// 											date: todo.date,
// 											completed: todo.completed,
// 											type: e.target.value
// 										}
// 									});
// 								}}
// 								onBlur={() => {
// 									task && actions.handleChangeThot(todo.id, task);
// 									resetTask();
// 								}}
// 							/>
// 							<textarea
// 								className="pl-2 col-10 mt-1 ml-1 activeTodo onfucus"
// 								type="text"
// 								defaultValue={todo.label}
// 								placeholder="dont leave me blank!"
// 								onChange={e => setTask(e.target.value)}
// 								onBlur={() => {
// 									if (task) {
// 										let t = {
// 											label: task,
// 											date: todo.date,
// 											dashboard: todo.dashboard,
// 											type: todo.type
// 										};
// 										actions.handleChangeThot(todo.id, t);
// 									}
// 									resetTask();
// 								}}
// 							/>
// 							<Dropdown className="mt-4 ml-3">
// 								<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
// 									<button className="dropdowntoggle">
// 										<i className="fas fa-list" />
// 									</button>
// 								</Dropdown.Toggle>
// 								<Dropdown.Menu className="mt-1">
// 									{todo.date && (
// 										<div>
// 											<div className="Absolute">{dayjs(todo.date).format("MM/DD/YYYY")}</div>
// 											<span>
// 												<ReactDatePicker
// 													selected={selectedDate && selectedDate.toDate()}
// 													onChange={date => {
// 														setSelectedDate(dayjs(date));
// 														setTask({
// 															task: {
// 																label: todo.label,
// 																date: date,
// 																completed: todo.completed,
// 																type: todo.type
// 															}
// 														});
// 													}}
// 													minDate={dayjs().toDate()}
// 												/>
// 											</span>
// 										</div>
// 									)}
// 									{task && (
// 										<Dropdown.Item eventKey="1">
// 											<button
// 												className=""
// 												onClick={() => {
// 													actions.handleChangeThot(todo.id, task);
// 													resetTask();
// 												}}>
// 												CONFIRM DATE
// 											</button>
// 										</Dropdown.Item>
// 									)}
// 									<CopyToClipboard className="ml-4" text={todo.label}>
// 										<button>Copy to clipboard</button>
// 									</CopyToClipboard>
// 									<Dropdown.Item
// 										eventKey="2"
// 										onClick={() => {
// 											let task = {
// 												label: todo.label,
// 												date: todo.date,
// 												dashboard: !todo.dashboard,
// 												type: todo.type
// 											};
// 											actions.handleChangeThot(todo.id, task);
// 										}}>
// 										DASHBOARD
// 									</Dropdown.Item>
// 									{/* <CopyToClipboard text={todo.label}>
// 														COPY TO CLIPBOARD
// 													</CopyToClipboard> */}
// 									<Dropdown.Divider />
// 									<Dropdown.Item eventKey="4">
// 										<span
// 											onClick={() => actions.deleteThot(todo.id)}
// 											className="deleteX text-center mt-3">
// 											&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
// 											<i className="fab fa-xing" />
// 										</span>
// 									</Dropdown.Item>
// 								</Dropdown.Menu>
// 							</Dropdown>
// 						</div>
// 					</div>
// 				))}
// 		</div>
// 	);
// };

// Thot.contextType = Context;

// Thot.propTypes = {
// 	thots: PropTypes.array,
// 	type: PropTypes.number
// };
