import React from "react";
import dayjs from "dayjs";

// .format("h:mm:ss a")
// .format("h:mm:ss a")
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: dayjs.new().format("h:mm:ss a")
		};
	}
	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	tick() {
		this.setState({
			time: dayjs.new().format("h:mm:ss a")
		});
	}
	render() {
		return <p className="App-clock">{this.state.time}</p>;
	}
}

export default Clock;
