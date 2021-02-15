const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			hobby: [],
			addDate: ""
		},
		actions: {
			// addDate: date => {
			// 	let tempStore = getStore();
			// 	tempStore.hobby.push(date);
			// 	setStore({ tempStore });
			// },

			getAllTasks: () => {
				fetch(process.env.BACKEND_URL + "/api/task")
					.then(response => response.json())
					.then(tasks => setStore({ hobby: tasks }));
			},
			addNewTask: hobby => {
				fetch(process.env.BACKEND_URL + "/api/task", {
					method: "POST",
					body: JSON.stringify({
						label: hobby.label,
						date: hobby.date,
						completed: hobby.completed
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(task => {
						setStore({
							hobby: task
						});
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			deleteHobby: task_id => {
				fetch(process.env.BACKEND_URL + "/api/task/" + task_id, {
					method: "DELETE"
				})
					.then(() => {
						getActions().getAllTasks();
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			handleChangeHobby: (todo, hobby) => {
				console.log("hobby!!!!:", hobby);
				fetch(process.env.BACKEND_URL + "/api/task/" + todo, {
					method: "PUT",
					body: JSON.stringify({
						label: hobby.label,
						date: hobby.date,
						completed: hobby.completed
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(() => {
						getActions().getAllTasks();
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			todaysDate: () => {
				var d = new Date();
				let month = "" + (d.getMonth() + 1);
				let day = "" + d.getDate();
				let year = d.getFullYear();
				if (month.length < 2) month = "0" + month;
				if (day.length < 2) day = "0" + day;
				return [month, day, year].join("-");
			},

			// SAVING BELOW JUST INCASE

			// handleChangeHobby: (e, i) => {
			// 	let tempStore = getStore();
			// 	const newTodos = tempStore.hobby.map((t, ind) => {
			// 		if (ind === i) {
			// 			t.name = e.target.value;
			// 		}
			// 		return t;
			// 	});
			// 	setStore({ hobby: newTodos });
			// },

			//  IGNORE BELOW THIS LINE

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
