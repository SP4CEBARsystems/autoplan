import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput} from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";
// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"

export let todo_tasks

// let selected = -1

const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [selected, setSelected] = useState(-1);
	const [modified, setModified] = useState(false);
	const [sync    , setSync    ] = useState(false);
	const [tasks   , setTasks   ] = useState([
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
	]);
	todo_tasks = tasks;

	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<HeaderBar/>
				<ScrollView style={styles.scrollingList}>
					<ToDoListItems 
						tasks       = {tasks} 
						setTasks    = {setTasks} 
						modified    = {modified} 
						setModified = {setModified} 
						sync        = {sync} 
						setSync     = {setSync} 
						selected    = {selected}
						setSelected = {setSelected}
					/>
				</ScrollView>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {
						tasks.push({
							name          : "new Task",
							requiredTime  : 120,
							deadline      : 7,
							priority      : 0.5,
							like          : 0.5,
							urgency       : 0,
							minLength     : 0,
							maxLength     : 120,
							repeatTimespan: "days",
							repeatInterval: 0,
							repeatOffset  : 0,
							repeatOffsets : []
						});
						const l = tasks.length-1;
						reRenderTasksAndUrgency(setTasks, tasks, tasks[l], l, setModified);
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
				</View>
			</SafeAreaView>
		</View>
	);
}

const HeaderBar = () => {
	return(
		<View style={styles.headerBar}>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Name
				</Text>
			</View>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Urgency
				</Text>
			</View>
			{/* <View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Time Required
				</Text>
			</View>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Deadline
				</Text>
			</View>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Priority
				</Text>
			</View> */}
			{/* <View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Like
				</Text>
			</View> */}
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

const ToDoListItems = ({tasks, setTasks, modified, setModified, sync, setSync, selected, setSelected}) => {
	fetchData (setTasks, setSync);
	updateData(modified, setModified, sync, tasks);
	const n = tasks.length;
	return [...Array(n)].map((e, i) =>
		<View key={i}>
			<ToDoListItem 
				tasks       = {tasks      }
				taskId      = {i          }
				task        = {tasks[i]   }
				setModified = {setModified}
				setTasks    = {setTasks   }
				selected    = {selected}
				setSelected = {setSelected}
			/>
		</View>
	);
}
//regular expression for dots
const ToDoListItem = ({tasks, taskId, task, setTasks, setModified, selected, setSelected}) => {
	let isSelected = (selected == taskId)
	return (
		<View style={styles.scrollItem}>
			<View style={styles.scrollBlock}>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.name.toString()}
						type="text"
						name="name"
						placeholder= "task name"
						onChange={(e) => {
							tasks[taskId].name = e.target.value;
							reRenderTasks(setTasks, tasks, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<Text style={styles.scrollText}>
						{Math.floor(task.urgency*100)}
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
					<Text style={styles.scrollText2}>
						Time Required:
					</Text>
					<TextInput style={styles.scrollText2} 
						value={task.requiredTime.toString()}
						type="number"
						name="requiredTime"
						placeholder= "required time"
						onChange={(e) => {
							tasks[taskId].requiredTime = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
							//e.target.value.replace(/[^0-9||.]/g,"");
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
					<Text style={styles.scrollText2}>
						Minutes
					</Text>
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollText2}>
						Deadline:
					</Text>
					<TextInput style={styles.scrollText2} 
						value={task.deadline.toString()}
						type="number"
						name="deadline"
						placeholder= "deadline"
						onChange={(e) => {
							tasks[taskId].deadline = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
							//e.target.value.replace(/[^0-9||.]/g,"");
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
					<Text style={styles.scrollText2}>
					</Text>
				</View>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollText2}>
						Priority:
					</Text>
					<TextInput style={styles.scrollText2} 
						value={task.priority.toString()}
						type="number"
						name="priority"
						placeholder= "priority"
						onChange={(e) => {
							tasks[taskId].priority = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
							//.replace(/[^0-9||.]/g,"")
							reRenderTasksAndUrgency(setTasks, tasks, task, taskId, setModified);
							// setTasks   (tasks);
							// setModified(true);
						}}
					/>
					<Text style={styles.scrollText2}>
						%
					</Text>
				</View>
			</>)}
			{/* <View style={styles.scrollItem}>
				<TextInput style={styles.scrollText} 
					value={task.like.toString()}
                    type="number"
                    name="like"
                    placeholder= "number"
                    onChange={(e) => {
						tasks[taskId].like = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
						//e.target.value.replace(/[^0-9||.]/g,"");
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
	tasks[taskId].urgency = calculateUrgency(task);
	reRenderTasks(setTasks, tasks, setModified);
}

const reRenderTasks = (setTasks, tasks, setModified) => {
	console.log("set: ", tasks);
	setTasks   (tasks);
	setModified(true);
}

const calculateUrgency = (task) => {
	const timePressure = Math.min(task.deadline ? task.requiredTime / task.deadline : -1, 1)
	// const timePressure = task.deadline ? task.requiredTime / task.deadline : -1
	const urgency = task.priority*0.01 * timePressure
	return urgency;
}

function fetchData (setTasks, setSync) {
	useEffect(() => {
		getDoc(doc(firestore, "ToDo", "activeTasks"))
		.then((doc) => {
			setTasks(doc.data().tasks);
			setSync(true);
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
			tasks.sort((a, b) => b.urgency - a.urgency);
			updateDoc(doc(firestore, "ToDo", "activeTasks"), {tasks: tasks})
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