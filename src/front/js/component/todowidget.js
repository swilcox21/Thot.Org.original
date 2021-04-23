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

dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.extend(isToday);

export const TodoWidget = props => {
	const { store, actions } = useContext(Context);
	const [collapse, setCollapse] = useState(props.collapse);
	const tasks = Array.isArray(props.tasks)
		? props.tasks.filter(
				todo => (todo.folder === props.folder) & (todo.dashboard === false)
				// (dayjs(todo.date).toDate()
				// 	? dayjs(todo.date).toDate() === dayjs(props.date).toDate()
				// 	: dayjs(todo.date).toDate() === null)
		  )
		: [];

	return (
		<>
			{tasks.length === 0 ? (
				<div className="mt-3 d-flex justify-content-between">
					<span>{props.folder}:</span>
					{props.id && (
						<Dropdown className="mt-2 ml-3">
							<Dropdown.Toggle id="dropdown-custom-components" className="dropdowntoggle">
								<span className="cogWheel text-center">
									<div className="text-center py-1" id="dropDownDate">
										<i className="fas fa-cog"></i>
									</div>
								</span>
							</Dropdown.Toggle>
							<Dropdown.Menu className="mt-1">
								<Dropdown.Item eventKey="3">
									<CopyToClipboard className="" text={props.folder}>
										<div className="text-center">
											<i className="far fa-clipboard" />
										</div>
									</CopyToClipboard>
								</Dropdown.Item>
								<Dropdown.Item eventKey="2">
									<div className="">[= ! hire me ! =]</div>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4">
									<div
										onClick={() => {
											actions.deleteFolder(props.id);
										}}
										className="text-center mt-3">
										<i className="fas fa-trash-alt" />
									</div>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					)}
				</div>
			) : (
				<>
					<div className="mt-3 d-flex justify-content-between">
						<span
							className={collapse === true ? "toggleClosed" : "toggleOpen"}
							onClick={() => setCollapse(!collapse)}>
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
								<Dropdown.Toggle id="dropdown-custom-components" className="dropdowntoggle">
									<div className="cogWheel text-center" id="dropdowntoggle">
										<span className="text-center py-1" id="dropDownDate">
											<i className="fas fa-cog"></i>
										</span>
									</div>
								</Dropdown.Toggle>
								<Dropdown.Menu className="mt-1">
									<Dropdown.Item eventKey="3">
										<CopyToClipboard className="" text={props.folder}>
											<div className="text-center">
												<i className="far fa-clipboard" />
											</div>
										</CopyToClipboard>
									</Dropdown.Item>
									<Dropdown.Item eventKey="2">
										<div className="">[= ! hire me ! =]</div>
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item eventKey="4">
										<div
											onClick={() => {
												actions.deleteFolder(props.id);
											}}
											className="text-center mt-3">
											<i className="fas fa-trash-alt" />
										</div>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						)}
					</div>
					{collapse === false ? <Prio tasks={tasks} /> : null}
				</>
			)}
		</>
	);
};

TodoWidget.propTypes = {
	folder: PropTypes.string,
	collapse: PropTypes.bool,
	id: PropTypes.number,
	tasks: PropTypes.array
};
