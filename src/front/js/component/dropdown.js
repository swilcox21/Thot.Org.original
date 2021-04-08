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
import Prio from "../component/prio";
import PropTypes from "prop-types";

export const DropDown = props => {
    const { store, actions } = useContext(Context);
    // const [  ,  ] = ();
	// const tasks = Array.isArray(props.tasks)
	// 	? props.tasks.filter(
	// 			todo => (todo.folder === props.folder) & (todo.dashboard === false)
	// 	  )
	// 	: [];

	return (
		<div>

		</div>
	);
};

DropDown.propTypes = {

};
