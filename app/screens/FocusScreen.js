// import React, { useState, useEffect } from 'react';
// import { ImageBackground, StyleSheet, View , Text, TouchableOpacity, SafeAreaView} from 'react-native';


import React, { useState, useEffect, useRef, Component } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput, Animated, PanResponder } from 'react-native';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";

//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";
// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
//import { firestore, auth } from "/config/firebase"


//useEffect
// load planning array

// improve the timer code

// generating timer value:
// get current time
// lookup this time in the planning array
// loop backward to find the previous, then check the durations, then loop forward to find the next, non-breaks and breaks

const FocusScreen = ({ navigation }) => {
	const [str  , setStr  ] = useState("");
	const [timeV, setTimeV] = useState(0 );

	let scrollValue = -(timeV - 34459300)*0.001;
	console.log(scrollValue);
	return (
		<View style={styles.background}>
			<View style={styles.topBar}>
				<View style={styles.noteBar}>
					<Text style={styles.noteText}>
						note
					</Text>
				</View>
				<TouchableOpacity 
					style={styles.exitButton}
					onPress={() => navigation.navigate('ToDo')}
				/>
			</View>
			<View style={styles.taskBar}>
				<ToDoScreen scrollValue={scrollValue} />
			</View>
			<View style={styles.bottomBar}>
				<View style={styles.musicBar}>
					<View style={styles.musicButton}/>
					<View style={styles.musicButton}/>
					<View style={styles.musicButton}/>
				</View>
			</View>
			<DispUpdate str={str} setStr={setStr} setTimeV={setTimeV} />
		</View>
	);
}

const DispUpdate = ({str, setStr, setTimeV}) => {
	useEffect(() => {
		var ms=new Date(Date.now())
		//Auto-correcting timer (A is the time to wait) - Designed in BASIC
		var A=1500-(ms.getMilliseconds()+500)%1000
		//console.log(A)
		const trigger = setInterval(() => {
			setTimeV(Math.round(ms.getTime() % 86400000));
			setStr(ms.getHours().toString()+":"+ms.getMinutes().toString()+":"+ms.getSeconds().toString());
		}, A);

    	return () => clearInterval(trigger);
	});
	// },[]);

	return (
		<View style={styles.timerBar}>
			<Text style={styles.textStyle1} >
				{str}
			</Text>
			<View style={styles.nowLine}/>
			<Text style={styles.textStyle2} >
				{str}
			</Text>
		</View>
	);
}

//--

//panresponder's animated variables are prepared and defined too early so that the data is still a placeholder
// let sync2 = false;
// let tasks2 = [];

const ToDoScreen = ({ navigation, scrollValue }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [modified, setModified] = useState(false);
	const [sync    , setSync    ] = useState(false);
	const [tasks   , setTasks   ] = useState([
		{
			name          : "loading",
			duration      : 0,
			startTime     : 0,
			source        : "",
			type          : "",
			repeatTimespan: "loading",
			repeatInterval: 0,
			repeatOffset  : 0,
			repeatOffsets : []
		}
	]);

	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				{/* <HeaderBar/> */}
				{/* <Animated.View
					style={{
					transform: [{translateX: pan.x}, {translateY: pan.y}],
					}}
					{...panResponder.panHandlers}>
				</Animated.View> */}
				<View style={[styles.scrollingList,{left: scrollValue,}]}>
					<ToDoListItems 
						tasks       = {tasks      } 
						setTasks    = {setTasks   } 
						modified    = {modified   } 
						setModified = {setModified} 
						sync        = {sync       } 
						setSync     = {setSync    } 
					/>
				</View>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {
						tasks.push({
							name          : "new Event",
							duration      : 0,
							startTime     : 0,
							source        : "",
							type          : "",
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
				{/* <View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1} onPress={() => {setSync(false); navigation.navigate("ToDo" );}}/>
					<TouchableOpacity style={styles.menuButton2}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => {setSync(false); navigation.navigate("Focus");}}/>
				</View> */}
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
	fetchData2 (setTasks, setSync);
	updateData(modified, setModified, sync, tasks);
	const n = tasks.length;
	// console.log(tasks);
	// console.log(sync);
	// sync2 = sync;
	// tasks2 = tasks;
	return [...Array(n)].map((e, i) =>
		<View key={i}>
			<ToDoListItem 
				tasks       = {tasks      }
				taskId      = {i          }
				task        = {tasks[i]   }
				setModified = {setModified}
				setTasks    = {setTasks   }
				sync        = {sync       }
			/>
		</View>
	);
}




//database
//  agenda
//    fixed meetings and events
//      absolute times (they may be obsolete, apart from repeated tasks)
//      planning settings
//      repeat settings
//    generated output, in order, contains empty spacers, empty spacers will be replaced with planned tasks, or breaks
//      relative times
//      source link in database

//to do: 
//  write dummy output in database
//  make a viewer
//  make it link to the agenda data for more info
//  make the info editable
//  make the time draggable and editable to modify both the output file and the source file
//  if a repeated event is changed, it will prompt like google agenda does and create a new source task with updated data for that event and depending on the chosen action, all repeated occurrences after that


const ToDoListItem = ({tasks, taskId, task, setTasks, setModified, sync}) => {
	let duration  = task.duration*10;
	let startTime = task.startTime*10;
	// console.log("active");

	// const pan = useRef(new Animated.ValueXY()).current;
	//if (pan.y==0) {pan.y = w;}
	// Animated.add(pan.x, v)
	// pan.setOffset(pan: {x: v; y: w});
	// pan.setOffset({x: duration, y: startTime});

	// console.log("sync  check 1: ",sync);
	// console.log("sync2 check 1: ",sync2);

	// const panResponder = useRef(
	// 	PanResponder.create({
	// 		onMoveShouldSetPanResponder: () => true,
	// 		onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
	// 		onPanResponderRelease: () => {
	// 			pan.extractOffset();
	// 			// console.log("hi");
	// 			// console.log(pan.x._offset, pan.y._offset);
	// 			//saveAgendaTimes(pan.x._offset, pan.y._offset);
	// 			// tasks[taskId].duration  = pan.x._offset;
	// 			// tasks[taskId].startTime = pan.y._offset;
	// 			//console.log("written");
	// 			// saveAgendaTimes(tasks, sync);
	// 			saveAgendaTimes(pan.x._offset, pan.y._offset, taskId);
	// 			//problem 1: when the page is visited the second time it won't load properly: all names are "loading" and it creates a new task, written in one write
	// 			//problem 2: when there are two events, the second one gets its timings messed up
	// 		},
	// 	}),
	// ).current;

	// static add(a: Animated, b: Animated): AnimatedAddition;
	//pan.x v

	return (
		<Animated.View
		//[styles.animatedBox,
			style={{
				// flex          : 0,
				//position:'absolute',
				position: 'absolute',
				width: duration,
				height: 100,
				// height: 100%,
				//height: v,
				// paddingBottom : pan.x,
				// top: w, 
				//translateY    : w,
				//marginTop: w,
				left: startTime, 
				// top:0,
				bottom: 0,
				// top: w, bottom: w+x,
				top: 0, right: 0, 
				//width: 100%,
				//height: x,
				//paddingTop    : x,
				//paddingBottom : x,
				// translateY    : offset - 2*x,
				//translateY    : offset,
				//translateY    : this.state.mapViewOffset.y
				//padding          : x,0,
				//backgroundColor  : "gray",
				//backgroundColor  : 'grey',
				backgroundColor  : "black",
				borderWidth: 5,
				borderColor: "green",
				//paddingLeft: pan.x,
				//top : pan.y,
				//left: pan.x,
				//paddingTop    : x,
				//paddingBottom : x,
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
					<Text style={styles.scrollText}>{task.name}</Text>
				</View>
			</View>
		</Animated.View>
	);
}

function fetchData2 (setTasks, setSync) {
	//refAgenda = doc(firestore, "Agenda", "TestDay")
	//refToDo   = doc(firestore, "ToDo", "activeTasks")
	fetchData (setTasks, setSync, doc(firestore, "Planning", "TestDay"));
	//doc(firestore, "Agenda", "TestDay")
	//fetchData (setTasks, setSync, doc(firestore, "Planning", "TestDay"));
}

//doc(firestore, "Planning", "TestDay")
function fetchData (setTasks, setSync, ref) {
	useEffect(() => {
		getDoc(ref)
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

function saveAgendaTimes(duration, startTime, taskId){
	tasks2[taskId].duration  = duration;
	tasks2[taskId].startTime = startTime;
	saveData(tasks2, sync2)
}

function saveData(tasks, sync){
// function saveData(tasks){
	// console.log("ready to write");
	// console.log("sync  check 2: ",sync);
	// console.log("sync2 check 2: ",sync2);
	
	if(sync){
		// console.log("written");
		updateDoc(doc(firestore, "Planning", "TestDay"), {tasks: tasks})
		.catch((e) => {
			console.log(e)
			//throw e;
			//alert(error.message);
		});
	}
}

function updateData (modified, setModified, sync, tasks) {
	if(modified){
		setModified(false);
		saveData(tasks, sync);
	}
}

// const styles = StyleSheet.create({
// })

// export default ToDoScreen;

//--

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		//alignItems: "center",
		//position: "relative",
		backgroundColor: "#111",
	},
	// background: {
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	//alignItems: "center",
	// 	backgroundColor: "#000",
	// },
	timerBar:{
		alignSelf: "center",
		alignItems: "center",
		//justifyContent: "center",
		position: "absolute",
	},
	textStyle1:{
		fontSize: 50,
		color: "#fff",
	},
	textStyle2:{
		fontSize: 50,
		color: "#fff",
	},
	nowLine:{
		backgroundColor: "#222",
		//flex: 1,
		width: 10,
		height: 200,
	},
	topBar:{
		//justifyContent:"flex-start",
		//alignItems:"center",
		//position: "relative",
		//backgroundColor: "#777",
		flex: 1,
		//height: 1000,
	},
	bottomBar:{
		//justifyContent:"flex-end",
		//position: "relative",
		//backgroundColor: "#777",
		flex: 1,
		flexDirection:"column-reverse",
		//height: 200,
	},
	taskBar: {
		//flex: 1,
		height: 200,
		backgroundColor: "#555",
	},
	task: {
		flex: 1,
		backgroundColor: "#000",
	},
	taskText: {
		flex: 1,
		fontSize: 90,
		color: "#fff",
	},
	noteBar: {
		alignSelf: "center",
		//flex: 1,
		paddingHorizontal: 15,
		borderRadius: 4,
		backgroundColor: "#333",
		top: 30,
		position: "absolute",
	},
	noteText: {
		marginTop: -4,
		textAlign: "center",
		flex: 1,
		fontSize: 40,
		color: "#fff",
	},
	musicBar: {
		alignSelf: "center",
		//flex: 1,
		width:300,
		height:75,
		top: 10,
		borderRadius: 4,
		backgroundColor: "#444",
		flexDirection:"row",
		justifyContent:"space-evenly",
		alignItems:"center",
	},
	musicButton: {
		width:50,
		height:50,
		backgroundColor: "#222",
		borderRadius: 4,
		//marginLeft: 10,
	},
	exitButton: {
		position: "absolute",
		//flex: 1,
		top:30,
		right:5,
		width:50,
		height:50,
		borderRadius: 4,
		backgroundColor: "#222",
		alignSelf: "flex-end",
	},
	//--
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
		marginLeft  : 1,
		marginRight : 1,
		marginTop   : 4,
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
		flexDirection:"row",
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

export default FocusScreen;