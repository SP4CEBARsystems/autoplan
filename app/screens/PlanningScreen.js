import React, { useState, useEffect, useRef, Component } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput, Animated, PanResponder } from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";
// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"

const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [modified, setModified] = useState(false);
	const [sync    , setSync    ] = useState(false);
	const [tasks   , setTasks   ] = useState([
		{
			name          : "loading",
			requiredTime  : 0,
			deadline      : 0,
			priority      : 0,
			like          : 0,
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
			repeatTimespan: "loading",
			repeatInterval: 0,
			repeatOffset  : 0,
			repeatOffsets : []
		}
	]);

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
					/>
				</ScrollView>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {
						tasks.push({
							name          : "new Task",
							requiredTime  : 0,
							deadline      : 0,
							priority      : 0,
							like          : 0,
							repeatTimespan: "days",
							repeatInterval: 0,
							repeatOffset  : 0,
							repeatOffsets : []
						});
						setTasks   (tasks);
						setModified(true);
					}}>
						<Text style={styles.plusText}>
							+
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1} onPress={() => navigation.navigate("ToDo" )}/>
					<TouchableOpacity style={styles.menuButton2}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => navigation.navigate("Focus")}/>
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
			</View>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Like
				</Text>
			</View>
			<View style={styles.headerBlock}>
				<Text style={styles.headerText}>
					Repeat Settings
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

const ToDoListItems = ({tasks, setTasks, modified, setModified, sync, setSync}) => {
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
			/>
		</View>
	);
}

const ToDoListItem = ({tasks, taskId, task, setTasks, setModified}) => {
	let x = 30;
	let y = 90;
	//tasks.start
	//tasks.end  
	return (
		<Animated.View
			style={{
				paddingTop    : x,
				paddingBottom : y,
				backgroundColor: "gray"
				// paddingLeft: pan.x,
				//top : pan.y,
				//left: pan.x,
			}}
			// style={[styles.animatedBox,{
			// 	paddingTop    : x,
			// 	paddingBottom : y,
			// 	// paddingLeft: pan.x,
			// 	//top : pan.y,
			// 	//left: pan.x,
			// }]}{...panResponder.panHandlers}
		>
			<View style={styles.scrollBlock}>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.name}
						type="text"
						name="name"
						placeholder= "task name"
						onChange={(e) => {
							tasks[taskId].name = e.target.value;
							setTasks   (tasks);
							setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.requiredTime}
						type="number"
						name="requiredTime"
						placeholder= "required time"
						onChange={(e) => {
							tasks[taskId].requiredTime = e.target.value;
							setTasks   (tasks);
							setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.deadline}
						type="number"
						name="deadline"
						placeholder= "deadline"
						onChange={(e) => {
							tasks[taskId].deadline = e.target.value;
							setTasks   (tasks);
							setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.priority}
						type="number"
						name="priority"
						placeholder= "priority"
						onChange={(e) => {
							tasks[taskId].priority = e.target.value;
							setTasks   (tasks);
							setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.like}
						type="number"
						name="like"
						placeholder= "number"
						onChange={(e) => {
							tasks[taskId].like = e.target.value;
							setTasks   (tasks);
							setModified(true);
						}}
					/>
				</View>
				<View style={styles.scrollItem}>
					<Text style={styles.scrollText}>
						...
					</Text>
				</View>
				<TouchableOpacity style={styles.delete} onPress={() => {
					tasks.splice(taskId, 1);
					setTasks   (tasks);
					setModified(true);
				}}/>
			</View>
		</Animated.View>
	);
}

function fetchData (setTasks, setSync) {
	useEffect(() => {
		getDoc(doc(firestore, "Agenda", "TestDay"))
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
			updateDoc(doc(firestore, "Agenda", "TestDay"), {tasks: tasks})
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
	scrollText: {
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
		marginLeft  : 1,
		marginRight : 1,
		marginTop   : 4,
		marginBottom: 4
		// width: 1
	}
})

export default ToDoScreen;