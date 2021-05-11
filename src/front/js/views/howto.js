import "../../styles/home.scss";
import React, { useState, setStore, useEffect, useContext, getState, actions } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";
// import { Spring, Transition, animated } from "react-spring/renderprops";
// import Clock from "../component/clock";
// import dayjs from "dayjs";
// import { WorkNavbar } from "../component/worknavbar";
// import { TodoInfoModal } from "../component/todoInfoModal";
// import DatePicker from "react-datepicker";
// import { Prio } from "../component/prio";
// import { Thot } from "../component/thot";
// import TextareaAutosize from "react-textarea-autosize";
// import ReactDatePicker from "react-datepicker";
// import { TodoWidget } from "../component/todowidget";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import timeZone from "dayjs-ext/plugin/timeZone";
// import utc from "dayjs/plugin/utc";

export const HowTo = () => {
	return (
		<>
			<div className="d-flex justify-content-start">
				<div className="col-md-3 col-lg-2 col-4 bg-dark text-light howtoCont" id="howtoLeft">
					Hello World
				</div>
				<div className="text-center col-md-8 col-8 pt-5 howtoCont" id="howtoMiddle">
					<h1>Select a tool tip from the list to the left</h1>
				</div>
				{/* <div className="col-md-3 howtoCont" id="howtoRight">
					Hello again
				</div> */}
			</div>
		</>
	);
};

HowTo.propTypes = {
	match: PropTypes.object
};
