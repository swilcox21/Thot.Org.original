import "../../styles/home.scss";
import React, { useState, setStore, useContext } from "react";
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
import Prio from "../component/prio";
import PropTypes from "prop-types";
import isToday from "dayjs/plugin/isToday";
import timeZone from "dayjs-ext/plugin/timeZone";
import utc from "dayjs/plugin/utc";
import ReactTooltip from "react-tooltip";

dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.extend(isToday);

export const TodoWidget = props => {
	const { store, actions } = useContext(Context);
	const [collapse, setCollapse] = useState(props.collapse);
	const [newFolder, setnewFolder] = useState("");
	const tasks = Array.isArray(props.tasks)
		? props.tasks.filter(
				todo => (todo.folder === props.folder) & (todo.dashboard === false)
				// (dayjs(todo.date).toDate()
				// 	? dayjs(todo.date).toDate() === dayjs(props.date).toDate()
				// 	: dayjs(todo.date).toDate() === null)
		  )
		: [];

	const _newFolder = Array.isArray(store.folder) ? store.folder.filter(folder => folder.folder === newFolder) : [];

	return (
		<>
			{tasks.length === 0 ? (
				<div className="mt-3 d-flex justify-content-between">
					<span>{props.folder}:</span>
					{props.id && (
						<>
							<Dropdown className="mt-2 ml-3">
								<Dropdown.Toggle
									data-tip={`${props.folder} dropdown menu`}
									id="dropdown-custom-components"
									className="dropdowntoggle">
									<span className="cogWheel text-center">
										<div className="text-center py-1" id="dropDownDate">
											<i className="fas fa-cog"></i>
										</div>
									</span>
								</Dropdown.Toggle>
								<Dropdown.Menu className="mt-1">
									<Dropdown.Item data-tip={`add new ${props.folder} thought`} eventKey="3">
										<div
											onClick={() => {
												let thought = {
													label: "",
													date: null,
													dashboard: false,
													folder: props.folder
												};
												actions.addNewTask(
													thought,
													dayjs.new(),
													dayjs.new().add(24, "hour"),
													true
												);
											}}>
											<i className="fas fa-plus-circle"></i>
										</div>
									</Dropdown.Item>
									<ReactTooltip />
									<Dropdown.Item data-tip={`copy ${props.folder} to clipboard`} eventKey="3">
										<CopyToClipboard className="" text={props.folder}>
											<div className="text-center">
												<i className="far fa-clipboard" />
											</div>
										</CopyToClipboard>
									</Dropdown.Item>
									<ReactTooltip />
									<input
										type="text"
										placeHolder="edit folder"
										onChange={e => setnewFolder(e.target.value)}
										onBlur={e => {
											let newfolderlabel = {
												folder: e.target.value,
												main_view: props.main_view,
												collapse: props.collapse
											};
											e.target.value != "" &&
												_newFolder.length === 0 &&
												actions.changeFolder(props.id, newfolderlabel);
										}}
									/>
									<Dropdown.Divider />
									<Dropdown.Item eventKey="4">
										<div
											data-tip={`delete ${props.folder} folder / ps. all contents in folder will still exist, to recover them simple recreate the ${props.folder} folder`}
											onClick={() => {
												actions.deleteFolder(props.id);
											}}
											className="text-center mt-3">
											<i className="fas fa-trash-alt" />
										</div>
									</Dropdown.Item>
									<ReactTooltip />
								</Dropdown.Menu>
							</Dropdown>
							<ReactTooltip />
						</>
					)}
				</div>
			) : (
				props.main_view === true && (
					<>
						<div className="mt-3 d-flex justify-content-between">
							<span
								className={collapse === true ? "toggleClosed" : "toggleOpen"}
								onClick={() => {
									let folder = {
										folder: props.folder,
										collapse: !collapse,
										main_view: props.main_view
									};
									actions.changeFolder(props.id, folder);
									setCollapse(!collapse);
								}}>
								{props.folder}: &nbsp;
								{tasks.length} &nbsp;
								{collapse === true ? (
									<i className="fas fa-caret-left" />
								) : (
									<i className="fas fa-sort-down" />
								)}
							</span>
							{props.id && (
								<Dropdown className="mt-2 ml-3">
									<Dropdown.Toggle
										data-tip={`${props.folder} dropdown menu`}
										id="dropdown-custom-components"
										className="dropdowntoggle">
										<div className="cogWheel text-center" id="dropdowntoggle">
											<span className="text-center py-1" id="dropDownDate">
												<i className="fas fa-cog"></i>
											</span>
										</div>
									</Dropdown.Toggle>
									<Dropdown.Menu className="mt-1">
										<Dropdown.Item data-tip={`add new ${props.folder} thought`} eventKey="3">
											<div
												onClick={() => {
													let thought = {
														label: "",
														date: null,
														dashboard: false,
														folder: props.folder
													};
													actions.addNewTask(
														thought,
														dayjs.new(),
														dayjs.new().add(24, "hour"),
														true
													);
												}}>
												<i className="fas fa-plus-circle"></i>
											</div>
										</Dropdown.Item>
										<ReactTooltip />
										<Dropdown.Item data-tip={`copy ${props.folder} to clipboard`} eventKey="3">
											<CopyToClipboard className="" text={props.folder}>
												<div className="text-center">
													<i className="far fa-clipboard" />
												</div>
											</CopyToClipboard>
										</Dropdown.Item>
										<ReactTooltip />
										<input
											type="text"
											placeHolder="edit folder"
											// onChange={e => this.setState({ newFolderLabel: e.target.value })}
											onBlur={e => {
												let newfolderlabel = {
													folder: e.target.value,
													main_view: props.main_view,
													collapse: props.collapse
												};
												e.target.value != "" &&
													_newFolder.length === 0 &&
													actions.changeFolder(props.id, newfolderlabel);
												tasks.map((task, index) => {
													let newTask = {
														label: task.label,
														date: task.date,
														dashboard: task.dashboard,
														folder: e.target.value
													};
													e.target.value != "" &&
														_newFolder.length === 0 &&
														actions.handleChangeHobby(task.id, newTask);
												});
											}}
										/>
										<Dropdown.Divider />
										<Dropdown.Item
											data-tip={`delete ${props.folder} folder (all contents in folder will still exist, to recover them simple recreate the ${props.folder} folder)`}
											eventKey="4">
											<div
												onClick={() => {
													actions.deleteFolder(props.id);
												}}
												className="text-center mt-3">
												<i className="fas fa-trash-alt" />
											</div>
										</Dropdown.Item>
										<ReactTooltip />
									</Dropdown.Menu>
								</Dropdown>
							)}
							<ReactTooltip />
						</div>
						{collapse === false ? <Prio tasks={tasks} /> : null}
					</>
				)
			)}
		</>
	);
};

TodoWidget.propTypes = {
	folder: PropTypes.string,
	collapse: PropTypes.bool,
	main_view: PropTypes.bool,
	id: PropTypes.number,
	tasks: PropTypes.array
};
