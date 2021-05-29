import "../../styles/home.scss";
import React, { useState, setStore, useEffect, useContext, getState, actions } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import createTask from "../../img/thotOrg_createTask.gif";
import editTask from "../../img/thotOrg_editTask.gif";
import dashboardTask from "../../img/thotOrg_dashboardTask.gif";
import editDate from "../../img/thotOrg_editDate.gif";
import deleteTask from "../../img/thotOrg_deleteTask.gif";
import datedTask from "../../img/thotOrg_datedTask.gif";
import createMeeting from "../../img/thotOrg_createMeeting.gif";
import nullDateMeeting from "../../img/thotOrg_nullDateMeeting.gif";
import exampleFolder from "../../img/thotOrg_exampleFolder.gif";
import newExampleThot from "../../img/thotOrg_newExampleThot.gif";
import changeFolderName from "../../img/thotOrg_changeFolderName.gif";
import changeFolderThot from "../../img/thotOrg_changeFolderThot.gif";
import sideBar from "../../img/thotOrg_sideBar.gif";

const gifs = [
	{ gif: createTask, label: "createTask" },
	{ gif: editTask, label: "editTask" },
	{ gif: dashboardTask, label: "dashboardTask" },
	{ gif: editDate, label: "editDate" },
	{ gif: deleteTask, label: "deleteTask" },
	{ gif: datedTask, label: "datedTask" },
	{ gif: createMeeting, label: "createMeeting" },
	{ gif: nullDateMeeting, label: "nullDateMeeting" },
	{ gif: exampleFolder, label: "exampleFolder" },
	{ gif: newExampleThot, label: "newExampleThot" },
	{ gif: changeFolderName, label: "changeFolderName" },
	{ gif: changeFolderThot, label: "changeFolderThot" },
	{ gif: sideBar, label: "sideBar" }
];

export const HowTo = () => {
	// const [ ,  ] = useState();
	const [activeGif, setActiveGif] = useState(createTask);
	const [activeLabel, setActiveLabel] = useState("createTask");
	const [showSideBar, setShowSideBar] = useState(true);

	return (
		<>
			<div className="d-flex justify-content-start">
				{showSideBar === false ? (
					<div className="col-1" id="NFNB2">
						<button
							data-tip="show side bar"
							id="caret"
							className="mt-1 ml-2"
							onClick={() => setShowSideBar(!showSideBar)}>
							<i className="fas fa-angle-right"></i>
						</button>
					</div>
				) : (
					<div className="col-6 col-md-4 col-xl-3 my-second-step" id="NFNB">
						<button
							data-tip="hide side bar"
							id="caret"
							className="mt-1 mr-2 my-other-step"
							onClick={() => setShowSideBar(!showSideBar)}>
							<i className="fas fa-angle-left"></i>
						</button>
						<div className="mt-3 mb-3">How to...</div>
						{gifs.map(gif => (
							<div key={gif.id}>
								<span
									id={activeGif === gif.gif && "activeGif"}
									className="pointer"
									onClick={() => {
										setActiveGif(gif.gif);
										setActiveLabel(gif.label);
									}}>
									{gif.label}
								</span>
							</div>
						))}
					</div>
				)}
				<div className="text-center col-md-8 col-8 ml-5 mx-xl-auto  howtoCont" id="howtoMiddle">
					<h3>{activeLabel}</h3>
					<img src={activeGif} style={{ maxHeight: 600 }} />
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
