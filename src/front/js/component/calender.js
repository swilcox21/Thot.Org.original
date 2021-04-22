import React, { useState, useContext } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import { Context } from "../store/appContext";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const ReactCalendar = props => {
	const [cDate, setcDate] = useState(dayjs.new());
	const { actions, store } = useContext(Context);
	const onChange = cDate => {
		setcDate(cDate);
	};

	return (
		<div>
			<Calendar
				onChange={date => {
					props.onChange(dayjs(date));
					props.toggle;
				}}
				value={cDate.toDate()}
			/>
			{/* {actions.addDate(date)} */}
		</div>
	);
};

export default ReactCalendar;

ReactCalendar.propTypes = {
	onChange: PropTypes.func,
	toggle: PropTypes.func
};
