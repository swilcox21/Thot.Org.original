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
					{props.id && <small onClick={() => actions.deleteFolder(props.id)}>df</small>}
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
						{props.id && <small onClick={() => actions.deleteFolder(props.id)}>df</small>}
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
