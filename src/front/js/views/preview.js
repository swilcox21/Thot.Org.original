import "../../styles/home.scss";
import React, { useState, setStore, useEffect, useContext, getState, actions } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Spring, Transition, animated } from "react-spring/renderprops";
import Clock from "../component/clock";
import dayjs from "dayjs";
import { WorkNavbar } from "../component/worknavbar";
import { TodoInfoModal } from "../component/todoInfoModal";
import DatePicker from "react-datepicker";
import { Prio } from "../component/prio";
import { Thot } from "../component/thot";
import TextareaAutosize from "react-textarea-autosize";
import ReactDatePicker from "react-datepicker";
import { TodoWidget } from "../component/todowidget";
import { CopyToClipboard } from "react-copy-to-clipboard";
import timeZone from "dayjs-ext/plugin/timeZone";
import utc from "dayjs/plugin/utc";

export const Preview = props => {
	const { store, actions } = useContext(Context);
	const [thots, setThots] = useState([]);
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [label, setLabel] = useState("");
	const [taskDate, setTaskDate] = useState(dayjs());
	// const [task, setTask] = useState("");
	const [type, setType] = useState(1);
	const [showWorkNavbar, setShowWorkNavbar] = useState(false);
	// const [ , } =]seState();

	const toggle = () => setShowWorkNavbar(!showWorkNavbar);
	const handleshowTodoIndex = index => setShowTodoIndex(index);
	const handleChange = e => {
		setLabel(e.target.value);
	};
	const resetTextArea = () => {
		setLabel("");
		setType(1);
		setTaskDate(currentDate);
	};
	console.log("flag@#$: ", type);
	return (
		<div className="container">
			<button
				className="toggleButton mt-1"
				onDoubleClick={() => {
					setCurrentDate(dayjs());
					setTaskDate(dayjs());
					setType(2);
				}}
				// onClick={() => toggle()}
			>
				<i className="far fa-calendar-alt" />
			</button>
			{/* <Transition
				native
				items={showWorkNavbar}
				from={{ marginLeft: -900 }}
				enter={{ marginLeft: -15 }}
				leave={{ marginLeft: -900 }}>
				{show =>
					show &&
					(props => (
						<animated.div style={props}>
							<WorkNavbar
								toggle={toggle}
								onChange={date => {
									setCurrentDate(date);
									setTaskDate(date);
									settype(2);
									toggle();
								}}
							/>
						</animated.div>
					))
				}
			</Transition> */}
			<div className="container text-left ml-5 mt-1 clock">
				{dayjs(currentDate).format("M/DD/YYYY")}
				<Clock />
			</div>
			<div className=" mb-5 col-md-10 mt-3 mx-auto">
				<div>Dashboard:</div>
				<Thot dashboard={true} />
			</div>
			<div className="d-flex flex-wrap mt-5">
				<div className="col-md-6">
					<div className="col-md-12 d-flex justify-content-between mb-3">
						<input
							value={type}
							onChange={e => {
								setType(parseInt(e.target.value));
								e.target.value === "1"
									? () => setTaskDate(currentDate)
									: e.target.value === "2"
										? setTaskDate(currentDate)
										: setTaskDate(null);
							}}
							className="inputTypeNumber2 inputTypeNumber text-center"
							type="number"
							min="1"
							max="3"
						/>
						<TextareaAutosize
							className="pl-2 col-11 activeTodo onfucus addNew py-3"
							placeholder="Stop being lazy and JUST DO IT!"
							type="text"
							value={label}
							onChange={e => setLabel(e.target.value)}
						/>
					</div>
					<div className="d-flex justify-content-around col-md-12 text-center">
						<button
							onClick={() => {
								let t = {
									label: label,
									date: taskDate ? taskDate : null,
									dashboard: false,
									type: type
								};
								actions.addNewThot(t);
								resetTextArea();
							}}>
							SUBMIT
						</button>
						<div className="newTaskDatePicker">
							<ReactDatePicker
								selected={taskDate ? taskDate.toDate() : null}
								onChange={date => setTaskDate(dayjs(date))}
								minDate={dayjs().toDate()}
							/>
						</div>
					</div>
					<div>Tasks:</div>
					<Thot type={1} />
				</div>
				{/* PUT MAP FUNC HERE -- learn how to generate components like these dynamically so users can add more as they need to */}
				<div className="col-md-6">
					<div>Meetings:</div>
					<Thot type={2} />
				</div>
			</div>
		</div>
	);
};

Preview.propTypes = {
	match: PropTypes.object
};
