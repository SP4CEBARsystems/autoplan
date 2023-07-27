// import React, { useState, useEffect } from 'react';
// import { ImageBackground, StyleSheet, View , Text, TouchableOpacity, SafeAreaView} from 'react-native';


import React, { useState, useEffect, useRef, Component } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput, Animated, PanResponder, Dimensions } from 'react-native';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
// import {Dimensions} from 'react-native';

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

//format the clock digits to always have two digits: "03:04" or "3:04" instead of "3:4"

function generateTimers(tasks, timeMilliseconds, setBreakTimer, setEventTimer, setEventName) {
	let timeMinutes = timeMilliseconds/60000
	let found = findCurrentEvent(tasks, timeMinutes, -1);
	// console.log("found", found)
	if (found === undefined) {return}
	
	let { findBreak, findEvent } = findBreakAndEvent(true);
	// let findBreakB = findBreak;
	// let findEventB = findEvent;

	console.log("found break and event", findBreak, findEvent)

	let breakTimer = getEndTime (tasks, findBreak) - timeMinutes;
	let eventTimer = getEndTime (tasks, findEvent) - timeMinutes;
	
	if (breakTimer<0 || eventTimer<0) {
		let { findBreak, findEvent } = findBreakAndEvent(false);
		let findBreakF = findBreak;
		let findEventF = findEvent;
		console.log("found break and event2", findBreakF, findEventF)
		if (breakTimer<0) {
			breakTimer = tasks[findBreakF].startTime - timeMinutes;
			findBreak  = findBreakF;
		}
		if (eventTimer<0) {
			eventTimer = tasks[findEventF].startTime - timeMinutes;
			findEvent  = findEventF;
		}
	}

	console.log("breakTimer and eventTimer", breakTimer*60, eventTimer*60)
	let brakeJsTime = new Date(breakTimer*60000)
	let eventJsTime = new Date(eventTimer*60000)
	//the hours are wrong
	let breakTimerH = brakeJsTime.getHours()
	let breakTimerM = brakeJsTime.getMinutes()
	let breakTimerS = brakeJsTime.getSeconds()
	let eventTimerH = eventJsTime.getHours()
	let eventTimerM = eventJsTime.getMinutes()
	let eventTimerS = eventJsTime.getSeconds()
	let breakString = breakTimerM.toString()+":"+breakTimerS.toString()
	let eventString = eventTimerM.toString()+":"+eventTimerS.toString()
	//breakTimerH.toString()+":"+
	//eventTimerH.toString()+":"+
	console.log("breakString", breakString)
	console.log("eventString", eventString)
	setBreakTimer(breakString)
	setEventTimer(eventString)
	setEventName(tasks[findEvent].name)

	function findBreakAndEvent(backwards) {
		let findBreak = -1;
		let findEvent = -1;
		console.log("found", found);
		for (let i = found; (findBreak == -1 || findEvent == -1) && (backwards ? i > 0 : i<tasks.length) ; backwards ? i-- : i++) {
			console.log("scanloop", i, tasks[i].type, backwards);
			if (tasks[i].type == "generated break") {
				if (findBreak == -1) { findBreak = i; }
			} else if (tasks[i].type == "agenda" || tasks[i].type == "generated") {
				if (findEvent == -1) { findEvent = i; }
			}
		}
		console.log("found results", findBreak, findEvent, backwards)
		return { findBreak, findEvent };
	}
}

function getEndTime (tasks, index) {
	return tasks[index].startTime + tasks[index].duration
}

function findCurrentEvent(tasks, timeMinutes, guess) {
	//short arrays (like length=1) don't work properly (a stepSize of 0 causes it to end)
	//does javascript have something like array.find()?
	// console.log("tasks", tasks[0].startTime, timeMinutes, tasks[tasks.length-1].startTime, tasks)
	let found = tasks.find(element => element.startTime > timeMinutes);
	return tasks.indexOf(found);

	//lookup time in tasks[] using a binary searching algorithm
	// let timeMinutes = timeMilliseconds/60000
	// let stepSize = Math.floor(tasks.length * 0.5)
	// let searchIndex = guess == -1 ? stepSize : guess;
	// console.log ("before finding current event...", stepSize, searchIndex, tasks.length, tasks[searchIndex].startTime, tasks)
	// for (let i=0; timeMinutes =! tasks[searchIndex].startTime && stepSize > 0; i++) {
	// 	console.log ("finding current event...", i, stepSize, searchIndex, tasks[searchIndex].startTime)
	// 	searchIndex += timeMinutes < tasks[searchIndex].startTime ? -stepSize : stepSize
	// 	searchIndex = Math.floor(searchIndex)
	// 	stepSize *= 0.5
	// 	stepSize = Math.floor(stepSize)
	// }
}




function fetchData3 (setTasks, ref, setTimeV, setStr, setBreakTimer, setEventTimer, setEventName) {
	console.log("fetchdata3");
	// const AgendaQuery = query(Planning, orderBy("startTime"), limit(10000));
	//don't add a semicolon ";" after "getDoc()", Don't do that
	getDoc(ref).then((doc) => {
		console.log("doc");
		let data = doc.data();
		let planning = data ? data.tasks : [];
		console.log("planning", planning)
		setTasks(planning);
		initInterval(planning, setTimeV, setStr, setBreakTimer, setEventTimer, setEventName);
	}).catch((e) => {
		throw e;
		// alert(error.message);
	});
}

let clockInterval = 0;
let globalTasks = [];
const milliSecondsPerDay = 86400000;
let timeScaleFactor2 = 40;

function initInterval (tasks, setTimeV, setStr, setBreakTimer, setEventTimer, setEventName) {
	clockInterval = setInterval(() => {
		// console.log("globalTasks", tasks)
		let milliseconds = Date.now();
		let timeMilliseconds = milliseconds % milliSecondsPerDay
		let jsDate = new Date(milliseconds);
		setTimeV(Math.round(timeMilliseconds));
		setStr(jsDate.getHours().toString()+":"+jsDate.getMinutes().toString()+":"+jsDate.getSeconds().toString());
		generateTimers(tasks, timeMilliseconds + timeOffset, setBreakTimer, setEventTimer, setEventName)
	}, 1000);
}

const millisecondsPerMinute = 60000
let timeOffset = 120 * millisecondsPerMinute

const FocusScreen = ({ navigation }) => {
	const [str         , setStr         ] = useState("");
	const [breakTimer  , setBreakTimer  ] = useState("");
	const [eventTimer  , setEventTimer  ] = useState("");
	const [eventName   , setEventName   ] = useState("");
	const [timeV       , setTimeV       ] = useState(0 );
	const [timeScaleFactor3, setTimeScaleFactor3] = useState(timeScaleFactor2);
	const [tasks       , setTasks       ] = useState([
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

	console.log("newTimers", breakTimer, " and ", eventTimer)
	// let globalTasks = tasks;

	useEffect(() => {
		fetchData3 (setTasks, doc(firestore, "Planning", "Day"+Math.floor(Date.now()/milliSecondsPerDay)), setTimeV, setStr, setBreakTimer, setEventTimer, setEventName);
	}, []);

	// let scrollValue = -(timeV - 34459300)*0.001;
	//timeV is in milliseconds
	let scrollValue = -(timeV + timeOffset)*timeScaleFactor2/millisecondsPerMinute;
	console.log("scrollValue", scrollValue);

	return (
		<View style={styles.background}>
			<View style={styles.topBar}>
				<View style={styles.topBar2}>
					<TouchableOpacity style={styles.counterButton} onPress={() => {
						if (timeScaleFactor2>1){
							timeScaleFactor2--;
							setTimeScaleFactor3(timeScaleFactor2);
							// setReload(true);
						}
					}}>
						<Text style={styles.counterText}>
							-
						</Text>
					</TouchableOpacity>

					<Text style={styles.fixedDateDisplayText}>
						{/* {"zoom: " + timeScaleFactor2.toString()} */}
						{"zoom: " + timeScaleFactor3.toString()}
					</Text>

					<TouchableOpacity style={styles.counterButton} onPress={() => {
						timeScaleFactor2++;
						setTimeScaleFactor3(timeScaleFactor2);
						// setReload(true);
					}}>
						<Text style={styles.counterText}>
							+
						</Text>
					</TouchableOpacity>
				</View>
				{/* <View style={styles.noteBar}>
					<Text style={styles.noteText}>
						note
					</Text>
				</View> */}
				<TouchableOpacity 
					style={styles.exitButton}
					onPress={() => {
						clearInterval(clockInterval);
						navigation.navigate('ToDo');
					}}
				/>
			</View>
			<View style={styles.taskBar}>
				<ToDoScreen scrollValue={scrollValue} tasks={tasks} />
			</View>
			<View style={styles.bottomBar}>
				<View style={styles.musicBar}>
					<View style={styles.musicButton}/>
					<View style={styles.musicButton}/>
					<View style={styles.musicButton}/>
				</View>
			</View>
			<View style={styles.timerBar}>
				<Text style={styles.textStyle1} >
					{eventName}
				</Text>
				<Text style={styles.textStyle1} >
					{str}
				</Text>
				<View style={styles.nowLine}/>
				<Text style={styles.textStyle2}>
					{"Break: " + breakTimer}
				</Text>
				<Text style={styles.textStyle2}>
					{"event: " + eventTimer}
				</Text>
			</View>
			{/* <DisplayUpdate str={str} setStr={setStr} setTimeV={setTimeV} /> */}
		</View>
	);
}

// const DisplayUpdate = ({str, setStr, setTimeV}) => {
// 	// useEffect(() => {
// 	// 	var ms=new Date(Date.now())
// 	// 	//Auto-correcting timer (A is the time to wait) - Designed in BASIC
// 	// 	var A=1500-(ms.getMilliseconds()+500)%1000
// 	// 	//console.log(A)
// 	// 	const trigger = setInterval(() => {
// 	// 		setTimeV(Math.round(ms.getTime() % 86400000));
// 	// 		setStr(ms.getHours().toString()+":"+ms.getMinutes().toString()+":"+ms.getSeconds().toString());
// 	// 	}, A);

//     // 	return () => clearInterval(trigger);
// 	// });
// 	// },[]);

// 	return (
// 		<View style={styles.timerBar}>
// 			<Text style={styles.textStyle1} >
// 				{str}
// 			</Text>
// 			<View style={styles.nowLine}/>
// 			<Text style={styles.textStyle2} >
// 				{str}
// 			</Text>
// 		</View>
// 	);
// }

//--

//panresponder's animated variables are prepared and defined too early so that the data is still a placeholder
// let sync2 = false;
// let tasks2 = [];

const ToDoScreen = ({ scrollValue, tasks }) => {
	//process.on('unhandledRejection', r => console.log(r));
	// const [modified, setModified] = useState(false);
	// const [sync    , setSync    ] = useState(false);

	// fetchData2 (setTasks, setSync);
	// updateData(modified, setModified, sync, tasks);

	// scrollValue

	const windowWidth = Dimensions.get('window').width;

	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<View style={[styles.scrollingList,{left: windowWidth*0.5 + scrollValue,}]}>
					{
						tasks.map((e, i) =>
							<View key={i}>
								<ToDoListItem taskId={i} task={e} />
							</View>
						)
					}
				</View>
			</SafeAreaView>
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


const ToDoListItem = ({taskId, task}) => {
	let duration  = task.duration  * timeScaleFactor2;
	let startTime = task.startTime * timeScaleFactor2;
	// 1. align it so that the first task is at the left of the screen
	// 2. offset it to the center (make it compatible with different screen sizes)
	// 3. add an offset that ticks with time
	// 4. add a scale factor and add zoom buttons

	return (
		<View
			style={{
				position: 'absolute',
				width: duration,
				// height: 100,
				left: startTime, 
				bottom: 0,
				top: 0, right: 0, 
				backgroundColor  : task.type=="break" || task.type=="generated break" ? "green" : "black",
				borderWidth: 2,
				borderColor: "white",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			{/* <View style={styles.scrollBlock}> */}
				{/* <View style={styles.scrollItem}> */}
					<Text style={styles.scrollText}>{task.name}</Text>
				{/* </View> */}
			{/* </View> */}
		</View>
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
		backgroundColor: "#FFF",
		//flex: 1,
		width: 5,
		height: 200,
		opacity: 0.8
	},
	topBar:{
		//justifyContent:"flex-start",
		//alignItems:"center",
		//position: "relative",
		//backgroundColor: "#777",
		flex: 1,
		//height: 1000,
		flexDirection:"row",
	},
	topBar2:{
		//justifyContent:"flex-start",
		//alignItems:"center",
		//position: "relative",
		//backgroundColor: "#777",
		flex: 1,
		//height: 1000,
		flexDirection:"row",
		height: 75
	},
	bottomBar:{
		//justifyContent:"flex-end",
		justifyContent:"center",
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
	counterButton: {
		flex: 1,
		backgroundColor: "#555",
		borderRadius: 20,
		// fontSize: 100,
		// textAlign: "center",
		marginLeft  : 1,
		marginRight : 1,
		marginTop   : 4,
		marginBottom: 4,
		maxWidth: 200
	},
	fixedDateDisplayText: {
		fontSize: 40,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF"
	},
	counterText: {
		fontSize: 40,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF"
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