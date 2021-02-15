import React, { useState, useContext } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import { Context } from "../store/appContext";

const ReactCalendar = () => {
	const [cDate, setcDate] = useState(new Date());
	const { actions, store } = useContext(Context);
	const onChange = cDate => {
		setcDate(cDate);
	};

	return (
		<div>
			<Calendar onChange={onChange} value={cDate} />
			{console.log(cDate)}
			{/* {actions.addDate(date)} */}
		</div>
	);
};

export default ReactCalendar;
