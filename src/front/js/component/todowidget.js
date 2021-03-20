import "../../styles/home.scss";
import React, { useState, setStore } from "react";
import { Context } from "../store/appContext";
import { useContext } from "../store/appContext";
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
import { Prio } from "../component/prio";
import PropTypes from "prop-types";

export const TodoWidget = props => {
	const [collapse, setCollapse] = useState(props.collapse);
	const tasks = Array.isArray(props.tasks) ? props.tasks.filter(todo => todo.priority === props.priority) : [];
	return (
		<>
			{tasks.length === 0 ? (
				<div className="mt-3">
					<span>{props.type}:</span>
				</div>
			) : (
				<>
					<div className="mt-3">
						<span
							className={collapse === true ? "toggleClosed" : "toggleOpen"}
							onClick={() => setCollapse(!collapse)}>
							{props.type}: &nbsp;
							{tasks.length} &nbsp;
							{collapse === true ? (
								<i className="fas fa-caret-left" />
							) : (
								<i className="fas fa-sort-down" />
							)}
						</span>
					</div>
					{collapse === false ? <Prio tasks={tasks} autoSize={props.priority === 1} /> : null}
				</>
			)}
		</>
	);
};

TodoWidget.propTypes = {
	priority: PropTypes.number,
	type: PropTypes.string,
	collapse: PropTypes.bool,
	tasks: PropTypes.array
};
