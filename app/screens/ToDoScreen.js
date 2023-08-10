import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput} from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";
// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"

export let todo_tasks

// let selected = -1

let globalTasks = [
	{
		name          : "loading",
		requiredTime  : 0,
		deadline      : 0,
		priority      : 0,
		like          : 0,
		urgency       : 0,
		minLength     : 0,
		maxLength     : 0,
		repeatTimespan: "loading",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : []
	},{
		name          : "loading",
		requiredTime  : 0,
		deadline      : 0,
		priority      : 0,
		like          : 0,
		urgency       : 0,
		minLength     : 0,
		maxLength     : 0,
		repeatTimespan: "loading",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : []
	}
]

// let nextElementKey = 0
const minutesADay = 1440;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [selected, setSelected] = useState(-1);
	const [modified, setModified] = useState(false);
	const [sync    , setSync    ] = useState(false);
	// const [tasks   , setTasks   ] = useState([
	// 	{
	// 		name          : "loading",
	// 		requiredTime  : 0,
	// 		deadline      : 0,
	// 		priority      : 0,
	// 		like          : 0,
	// 		urgency       : 0,
	// 		minLength     : 0,
	// 		maxLength     : 0,
	// 		repeatTimespan: "loading",
	// 		repeatInterval: 0,
	// 		repeatOffset  : 0,
	// 		repeatOffsets : []
	// 	},{
	// 		name          : "loading",
	// 		requiredTime  : 0,
	// 		deadline      : 0,
	// 		priority      : 0,
	// 		like          : 0,
	// 		urgency       : 0,
	// 		minLength     : 0,
	// 		maxLength     : 0,
	// 		repeatTimespan: "loading",
	// 		repeatInterval: 0,
	// 		repeatOffset  : 0,
	// 		repeatOffsets : []
	// 	}
	// ]);


	function setTasks (tasks) {
		globalTasks = tasks
	}
	let tasks = globalTasks

	todo_tasks = tasks;

	// console.log(tasks)
	fetchData (setTasks, setSync);
	updateData(modified, setModified, sync, tasks);

	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<HeaderBar
					tasks       = {tasks}
					setTasks    = {setTasks}
					setModified = {setModified}
				/>
				<ToDoListItems 
					tasks       = {tasks} 
					setTasks    = {setTasks} 
					setModified = {setModified} 
					selected    = {selected}
					setSelected = {setSelected}
				/>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {
						tasks.push({
							name          : "new Task",
							requiredTime  : 120,
							deadline      : Date.now(),
							priority      : 50,
							like          : 50,
							urgency       : 0,
							minLength     : 0,
							maxLength     : 120,
							repeatTimespan: "days",
							repeatInterval: 0,
							repeatOffset  : 0,
							repeatOffsets : [],
							// id            : nextElementKey,
						});
						const l = tasks.length-1;
						reRenderTasksAndUrgency(setTasks, tasks, tasks[l], l, setModified);
						// nextElementKey ++;
						// reRenderTasks(setTasks, tasks, setModified);
						// setTasks   (tasks);
						// setModified(true);
					}}>
						<Text style={styles.plusText}>
							+
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1}/>
					<TouchableOpacity style={styles.menuButton2} onPress={() => navigation.navigate("Planning")}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => navigation.navigate("Focus"   )}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => navigation.navigate("Settings")}/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const HeaderBar = ({tasks, setTasks, setModified}) => {
	return(
		<View style={styles.headerBar}>

			<View style={styles.headerBlock} 
			// onPress={() => {
			// 	// tasks.sort((a, b) => b.name - a.name)
			// 	tasks.sort((a, b) => String(a[0]).localeCompare(b[0]))
			// 	setTasks   (tasks)
			// 	setModified(true)
			// }}
			>
				<Text style={styles.headerText}>
					Name
				</Text>
			</View>

			<TouchableOpacity style={styles.headerBlock} onPress={() => {
				tasks.sort((a, b) => b.urgency - a.urgency)
				setTasks   (tasks)
				setModified(true)
			}}>
				<Text style={styles.headerText}>
					Urgency{"\n"}
					{"\n"}
					click to sort
				</Text>
			</TouchableOpacity>

			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Settings
				</Text>
			</View>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					delete
				</Text>
			</View>
		</View>
	);
}

const ToDoListItems = ({tasks, setTasks, setModified, selected, setSelected}) => {
	//e.id
	return (
		<ScrollView style={styles.scrollingList}>
			{tasks.map((e, i) => <View key={i}>
				<ToDoListItem 
					tasks       = {tasks      }
					taskId      = {i          }
					task        = {e          }
					setModified = {setModified}
					setTasks    = {setTasks   }
					selected    = {selected   }
					setSelected = {setSelected}
				/>
			</View>)}
		</ScrollView>
	)
}


const ToDoListItem = ({tasks, taskId, task, setTasks, setModified, selected, setSelected}) => {
	let isSelected = (selected == taskId);
	let deadline   = new Date(task.deadline);
	return (
		<View style={styles.scrollItem}>
			<View style={styles.scrollBlock}>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.name.toString()}
						// type="text"
						// name="name"
						// placeholder= "task name"


						
						// editable
						// multiline
						// numberOfLines={4}
						// maxLength={40}
						// onChangeText={text => onChangeText(text)}


						// onChange={(e) => {
						editable
						onChangeText={(text) => {
							// console.log("name", text)
							// task.name = e.target.value;
							task.name = text;
							console.log("task name", task.name)
							tasks[taskId] = task
							console.log("task", tasks[taskId])
							reRenderTasks(setTasks, tasks, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<Text style={styles.scrollText}>
						{task.urgency.toFixed(1)}
					</Text>
				</View>
				<TouchableOpacity style={styles.scrollItem} onPress={() => {
					// selected = selected != taskId ? taskId : -1
					// selected = taskId
					// setSelected(taskId);
					setSelected(isSelected ? -1 : taskId);
					// selected == taskId ? "V" : "Λ"
				}}>
					<Text style={styles.scrollText}>
						{isSelected ? "V" : "Λ"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.delete} onPress={() => {
					tasks.splice(taskId, 1);
					reRenderTasks(setTasks, tasks, setModified);
					// setTasks   (tasks);
					// setModified(true);
				}}/>
			</View>

			{!isSelected ? null : (<>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Duration:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={task.requiredTime.toString()}
						type="number"
						name="requiredTime"
						placeholder="required time"
						editable
						onChangeText={(text) => {
							task.requiredTime = parseInt(text) ? parseInt(text) : 0;
							tasks[taskId] = task
							//text.replace(/[^0-9||.]/g,"");
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
					<Text style={styles.scrollItemR}>
						Minutes
					</Text>
				</View>

				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Priority:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={task.priority.toString()}
						type="number"
						name="priority"
						placeholder= "priority"
						editable
						onChangeText={(text) => {
							task.priority = parseInt(text) ? parseInt(text) : 0;
							tasks[taskId] = task
							//.replace(/[^0-9||.]/g,"")
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
					<Text style={styles.scrollItemR}>
						%
					</Text>
				</View>

				<View style={styles.scrollItem2}>
				</View>

				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Deadline
					</Text>
					<Text style={styles.scrollItemM}>
					</Text>
					<Text style={styles.scrollItemR}>
						select to
					</Text>
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Day:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={deadline.getDate().toString()}
						type="number"
						name="deadline"
						placeholder= "day"
						editable
						onChangeText={(text) => {
							//parseInt(text) ? parseInt(text) : 0;
							//text + "T00:00:00"
							// tasks[taskId].deadline = new Date(text);

							let maxDays = maxDaysThisMonth(deadline.getMonth(), deadline.getFullYear())
							deadline.setDate(clamp(text, 1, maxDays))
							task.deadline = deadline.getTime();
							tasks[taskId] = task
							//deadlineDate.getTime()
							//text.replace(/[^0-9||.]/g,"");
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
					<Text style={styles.scrollItemR}>
						overwrite
					</Text>
					{/* <Text style={styles.dateTextSeparator}>
						-
					</Text> */}
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Month:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={(deadline.getMonth()+1).toString()}
						type="number"
						name="deadline"
						placeholder= "month"
						editable
						onChangeText={(text) => {
							//tasks[taskId].deadline = new Date(text);
							deadline.setMonth(clamp(text, 1, 12)-1);
							task.deadline = deadline.getTime();
							tasks[taskId] = task
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
						}}
					/>
					<Text style={styles.scrollItemR}>
					</Text>
					{/* <Text style={styles.dateTextSeparator}>
						-
					</Text> */}
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Year:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={deadline.getFullYear().toString()}
						type="number"
						name="deadline"
						placeholder= "year"
						editable
						onChangeText={(text) => {
							//tasks[taskId].deadline = new Date(text);
							deadline.setFullYear(text);
							task.deadline = deadline.getTime();
							tasks[taskId] = task
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
						}}
					/>
					<Text style={styles.scrollItemR}>
					</Text>
					{/* <Text style={styles.dateTextSeparator}>
						_
					</Text> */}
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Hours:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={deadline.getHours().toString()}
						type="number"
						name="deadline"
						placeholder= "hours"
						editable
						onChangeText={(text) => {
							//tasks[taskId].deadline = new Date(text);
							deadline.setHours(clamp(text,0,23));
							task.deadline = deadline.getTime();
							tasks[taskId] = task
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
						}}
					/>
					<Text style={styles.scrollItemR}>
					</Text>
					{/* <Text style={styles.dateTextSeparator}>
						:
					</Text> */}
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Minutes:
					</Text>
					<TextInput style={styles.scrollItemM} 
						value={deadline.getMinutes().toString()}
						type="number"
						name="deadline"
						placeholder= "minutes"
						editable
						onChangeText={(text) => {
							//tasks[taskId].deadline = new Date(text);
							deadline.setMinutes(clamp(text,0,59));
							task.deadline = deadline.getTime();
							tasks[taskId] = task
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
						}}
					/>
					<Text style={styles.scrollItemR}>
					</Text>
					{/* <Text style={styles.dateTextSeparator}>
						:
					</Text> */}
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollItemL}>
						Seconds:
					</Text>
					<TextInput style={styles.scrollItemM}
						value={deadline.getSeconds().toString()}
						type="number"
						name="deadline"
						placeholder= "seconds"
						editable
						onChangeText={(text) => {
							//tasks[taskId].deadline = new Date(text);
							deadline.setSeconds(clamp(text,0,59));
							task.deadline = deadline.getTime();
							tasks[taskId] = task
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
						}}
					/>
					<Text style={styles.scrollItemR}>
					</Text>
				</View>
			</>)}
			{/* <View style={styles.scrollItem}>
				<TextInput style={styles.scrollText} 
					value={task.like.toString()}
                    type="number"
                    name="like"
                    placeholder= "number"
                    editable
						onChangeText={(text) => {
						tasks[taskId].like = parseInt(text) ? parseInt(text) : 0;
						//text.replace(/[^0-9||.]/g,"");
						reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
						// setTasks   (tasks);
						// setModified(true);
					}}
				/>
			</View> */}
			
		</View>
	);
}

// const test = 0
// // export test
// export default test

const reRenderTasksAndUrgency = (setTasks, tasks, task, taskId, setModified) => {
	task.urgency = calculateUrgency(task);
	tasks[taskId] = task
	reRenderTasks(setTasks, tasks, setModified);
}

const reRenderTasks = (setTasks, tasks, setModified) => {
	console.log("set: ", tasks);
	setTasks   (tasks);
	setModified(true);
}

const calculateUrgency = (task) => {
	let daysUntilDeadline = task.deadline - Date.now()
	const timePressure = daysUntilDeadline ? 1 * task.requiredTime / (daysUntilDeadline * minutesADay) : 1
	// const timePressure = task.deadline ? task.requiredTime / task.deadline : -1
	const urgency = 100 * task.priority * 0.01 * Math.min(timePressure, 1)
	return urgency;
}

function maxDaysThisMonth(month, year) {
	const february = 1;
	const july = 6;
	const leapYear = 0;
	const maxDaysMonth = 31;
	const maxDaysFebruary = 29;
	return month != february ? maxDaysMonth - (month + (month > july)) % 2 : maxDaysFebruary - (year % 4 != leapYear);
}

function fetchData (setTasks, setSync) {
	useEffect(() => {
		getDoc(doc(firestore, "ToDo", "activeTasks"))
		.then((doc) => {
			let data = doc.data()
			// data.forEach(element => {
			// 	element.deadline = new Date(element.deadline);
			// });
			setTasks(data.tasks);
			setSync(true);
			// nextElementKey = tasks.length
		})
		.catch((e) => {
			console.log(e);
			//throw e;
			//alert(error.message);
		});
	},[]);
}

function updateData (modified, setModified, sync, tasks) {
	if(modified){
		setModified(false);
		if(sync){
			let data = tasks
			// data.forEach(element => {
			// 	element.deadline = element.deadline.getTime();
			// });
			updateDoc(doc(firestore, "ToDo", "activeTasks"), {tasks: data})
			.catch((e) => {
				console.log(e)
				//throw e;
				//alert(error.message);
			});
		}
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		//alignItems: "center",
		backgroundColor: "#000",
	},
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	textStyle: {
		fontSize: 90,
		color: "#fff",
	},
	headerBar: {
		height: 100,
		backgroundColor: "#111",
		flexDirection:"row"
	},
	headerBlock: {
		//height: 80,
		//width:  80,
		flex: 1,
		backgroundColor: "#444",
		//borderRadius: 4,
		//top: 10,
		marginLeft: 1,
		marginRight: 1,
		marginTop: 4,
		marginBottom: 4,
	},
	headerText: {
		fontSize: 20,
		color: "#CCC",
		textAlign: "center",
	},
	scrollingList: {
		flex: 1,
		backgroundColor: "#AAA",
	},
	scrollBlock: {
		height: 50,
		backgroundColor: "#888",
		marginTop: 10,
		flexDirection:"row"
	},
	scrollItem: {
		flex: 1,
		backgroundColor: "#444",
		marginLeft: 1,
		marginRight: 1,
		marginTop: 4,
		marginBottom: 4,
	},
	scrollItem2: {
		flexDirection: "row",
		flex: 1,
		backgroundColor: "#444",
		marginLeft: 1,
		marginRight: 1,
		marginTop: 4,
		marginBottom: 4,
	},
	scrollText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
	},
	scrollText2: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 50,
	},
	scrollItemL: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "right",
		// width: 50,
	},
	scrollItemM: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 50,
	},
	scrollItemR: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "left",
		// width: 50,
	},
	dateText: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 10,
		// margin: 0,
		// padding: 0,
	},
	dateTextLong: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 20,
	},
	dateTextSeparator: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 5,
	},
	menuButtons: {
		height: 100,
		backgroundColor: "#333",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	menuButton1: {
		height: 80,
		width:  80,
		backgroundColor: "#999",
		borderRadius: 4,
	},
	menuButton2: {
		height: 80,
		width:  80,
		backgroundColor: "#999",
		borderRadius: 4,
	},
	menuButton3: {
		height: 80,
		width:  80,
		backgroundColor: "#999",
		borderRadius: 4,
	},
	plusParent: {
		height: 0,
		alignItems: "flex-end"
	},
	plus: {
		//flex: 0,
		height: 80,
		width:  80,
		backgroundColor: "#0F0",
		borderRadius: 30,
		// fontSize: 100,
		// textAlign: "center"
		marginTop: -90,
		marginRight: 10
	},
	plusText: {
		fontSize: 60,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF"
	},
	delete: {
		flex: 1,
		backgroundColor: "#F00",
		borderRadius: 50,
		// fontSize: 100,
		// textAlign: "center",
		marginLeft: 1,
		marginRight: 1,
		marginTop: 4,
		marginBottom: 4
		// width: 1
	}
})

export default ToDoScreen;