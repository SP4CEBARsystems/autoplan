import React, { useState, useEffect, useRef, Component } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput, Animated, PanResponder } from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";
// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"

//panresponder's animated variables are prepared and defined too early so that the data is still a placeholder
import { query, orderBy, limit } from "firebase/firestore";  

import {todo_tasks} from "./ToDoScreen"


let sync2        = false;
let tasks2       = [];
// let unlockScroll = true;

function fetchData2 (setTasks, setSync) {
	//, setAgenda
	//refAgenda = doc(firestore, "Agenda", "TestDay")
	//refToDo   = doc(firestore, "ToDo", "activeTasks")
	// fetchData (setAgenda, setSync, doc(firestore, "Agenda"     , "TestDay"    ));
	// fetchData (setTasks , setSync, doc(firestore, "PlannedGaps", "TestDay"    ));
	fetchData (setTasks, setSync, doc(firestore, "Planning"   , "TestDay"    ));
	// fetchData (setTasks, setSync, doc(firestore, "Gaps"       , "TestDay"    ));
	// fetchData (setTasks, setSync, doc(firestore, "ToDo"       , "activeTasks"));
	//doc(firestore, "Agenda", "TestDay")
	//fetchData (setTasks, setSync, doc(firestore, "Planning", "TestDay"));
}

//the structure is bad: I need to split all the tasks up into separate documents for queries to be useful
//for now I can sort the tasks array before uploading it

//doc(firestore, "Planning", "TestDay")
function fetchData (setTasks, setSync, ref) {
	// const AgendaQuery = query(Planning, orderBy("startTime"), limit(10000));
	//don't add a semicolon ";" after "getDoc()", Don't do that
	getDoc(ref).then((doc) => {
		setTasks(doc.data().tasks);
		setSync(true);
	}).catch((e) => {
		console.log(e);
		//throw e;
		//alert(error.message);
	});
}

function fetchData3 (dayOffset, planning, setTasks, displayed, setDisplayed, dayIndicators, setSync, ref) {
	console.log("fetchdata3");
	// const AgendaQuery = query(Planning, orderBy("startTime"), limit(10000));
	//don't add a semicolon ";" after "getDoc()", Don't do that
	getDoc(ref).then((doc) => {
		console.log("doc");
		let data = doc.data();
		let newPlanning = data ? data.tasks : [];
		console.log("planning pre:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		planning = newPlanning;
		
		console.log("planning post:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
		// let newPlanning = data ? data.tasks : [];
		// newPlanning.unshift({
		// 	name: "TestDay",
		// 	type: "date",
		// 	startTime: 7500 * (dayOffset+1)
		// });
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
		console.log("newplan,", planning);
		// setTasks(newPlanning);
		setTasks(planning);

		//use an array for just the day indicators and add it to it whenever the planning algorithm is done

		// planning.unshift({
		// 	name: "TestDay",
		// 	type: "date",
		// 	startTime: 0
		// });
		// startTime: 7500 * dayOffset
		
		setDisplayed(planning);
		// setDisplayed(planning.concat(dayIndicators));
		setSync(true);
	}).catch((e) => {
		// console.log("firebase error:", e);
		throw e;
		//alert(error.message);
	});
}

function fetchData4 (dayOffset, planning, setTasks, setSync, ref) {
	console.log("fetchdata3");
	// const AgendaQuery = query(Planning, orderBy("startTime"), limit(10000));
	//don't add a semicolon ";" after "getDoc()", Don't do that
	getDoc(ref).then((doc) => {
		console.log("doc");
		let data = doc.data();
		let newPlanning = data ? data.tasks : [];
		console.log("planning pre:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		planning = newPlanning;

		console.log("planning post:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
		// let newPlanning = data ? data.tasks : [];
		// newPlanning.unshift({
		// 	name: "TestDay",
		// 	type: "date",
		// 	startTime: 7500 * (dayOffset+1)
		// });
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
		console.log("newplan,", planning);
		// setTasks(newPlanning);
		setTasks(planning);
		//globalAgenda = planning
		setSync(true);
	}).catch((e) => {
		console.log("firebase error:", e);
		//throw e;
		//alert(error.message);
	});
}

function fetchData5 (dayOffset, planning, setTasks, setSync, ref) {
	console.log("fetchdata3");
	// const AgendaQuery = query(Planning, orderBy("startTime"), limit(10000));
	//don't add a semicolon ";" after "getDoc()", Don't do that
	getDoc(ref).then((doc) => {
		console.log("doc");
		let data = doc.data();
		let newPlanning = data ? data.tasks : [];
		console.log("planning pre:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		planning = newPlanning;

		console.log("planning post:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
		// let newPlanning = data ? data.tasks : [];
		// newPlanning.unshift({
		// 	name: "TestDay",
		// 	type: "date",
		// 	startTime: 7500 * (dayOffset+1)
		// });
		// planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
		console.log("newplan,", planning);
		// setTasks(newPlanning);
		setTasks(planning);
		globalAgenda = planning
		setSync(true);
	}).catch((e) => {
		console.log("firebase error:", e);
		//throw e;
		//alert(error.message);
	});
}

let dayLengthPixels       = 6068.7998046874;
let deltaDayLengthPixels  = 1/dayLengthPixels;

let timeScaleFactor = 5;

let loadedDays            = [];
let loadedDay             = "Loading"
let indexTableTasks       = [];
let indexTableGaps        = [];
let indexTablePlannedGaps = [];
let indexTablePlanning    = [];
let amountOfDaysLoaded    = 0;
let dayOffset             = 0;

const fetchMore = (planning, setPlanning, tasks, setTasks, plannedGaps, setPlannedGaps, gaps , setGaps, displayed, setDisplayed, dayIndicators, setDayIndicators, setSync, firestore) => {
	console.log("fetchMore");
	//get js date in milliseconds
	//multiply it by 1/86400000
	//add the offset (we're scrolling into the future)
	//use the resulting number to differentiate the names of the files
	//if no file was found: create a new file
	//use a copy of the variable in a js date formatter to display the date as a string
	
	// let dayOffset = Math.floor(scrollOffsetY * deltaDayLengthPixels);
	console.log("dayOffset:", dayOffset, scrollOffsetY, deltaDayLengthPixels);
	// let day = loadedDay;
	let day = currentDay;
	let documentName = "Day" + day.toString();

	// console.log("dayIndicators 3", dayIndicators)
	// dayIndicators.unshift({
	// 	name: "TestDay",
	// 	type: "date",
	// 	startTime: 7500 * dayOffset
	// })
	dayIndicators = {
		name: "TestDay",
		type: "date",
		startTime: 0
	};

	setDayIndicators(dayIndicators);
	console.log("dayIndicators 4", dayIndicators);

	fetchData3 (dayOffset, planning   , setPlanning   , displayed, setDisplayed, dayIndicators, setSync, doc(firestore, "Planning"   , documentName));
	fetchData5 (dayOffset, tasks      , setTasks      , setSync, doc(firestore, "Agenda"     , documentName));
	fetchData4 (dayOffset, plannedGaps, setPlannedGaps, setSync, doc(firestore, "PlannedGaps", documentName));
	fetchData4 (dayOffset, gaps       , setGaps       , setSync, doc(firestore, "Gaps"       , documentName));
	
	//generate a table array which holds the day number and the array index number gor each of the arrays
	indexTableTasks.push      ( tasks.length       );
	indexTablePlannedGaps.push( plannedGaps.length );
	indexTableGaps.push       ( gaps.length        );
	amountOfDaysLoaded++;

	//is "planning" with the day indicators used to generate plannings? that would be bad
	
	loadedDays.push(documentName);
	loadedDay = day;

	// fetchData (setTasks      , setSync, doc(firestore, "Agenda"     , "TestDay"));
	// fetchData (setPlannedGaps, setSync, doc(firestore, "PlannedGaps", "TestDay"));
	// fetchData (setGaps       , setSync, doc(firestore, "Gaps"       , "TestDay"));

	// fetchData3 (dayOffset+1, planning, setPlanning, setSync, doc(firestore, "Planning"   , "TestDay2"));
	// fetchData3 (dayOffset+1, planning, setPlanning, setSync, doc(firestore, "Planning"   , "Day" + day.toString()));
	scrollOffsetYLoaded += dayLengthPixels;
	//-dayLengthPixels
	// fetchData3 (setPlanning, setSync, doc(firestore, "Planning"   , "TestDay"));
}

	
let agendaId = 0
let scrollOffsetY = 0;
let scrollOffsetYLoaded = 0;
let focused = 0;

const millisecondsInDay = 86400000;
const millisecondsToDay = 1/millisecondsInDay;
const millisecondsToMinutes = 1/60000;
let milliSeconds = Date.now();
let currentDay   = Math.floor(milliSeconds * millisecondsToDay) + dayOffset;
let milliSecondsToday = milliSeconds % millisecondsInDay;
// let minutesToday = milliSecondsToday * millisecondsToMinutes;
// let timeString   = milliSecondsToday.toString();
// let timeString   = milliSeconds.toTimeString();
let javascriptDate = new Date(milliSeconds);
// let timeString   = javascriptDate.toLocaleTimeString()
let timeString   = javascriptDate.getHours().toString() + ":" + javascriptDate.getMinutes().toString()
let minutesToday = javascriptDate.getHours()*60 + javascriptDate.getMinutes()
let flooredMinutesToday = javascriptDate.getHours()*60
// console.log("minutesToday", javascriptDate.getHours());
// console.log("minutesToday", javascriptDate.getMinutes()+javascriptDate.getHours()*60);
// console.log("minutesToday", milliSecondsToday/3600000);
// console.log("minutesToday", minutesToday/60);

let globalAgenda = [
	{
		name          : "loading",
		duration      : 0,
		startTime     : 0,
		source        : "",
		type          : "agenda",
		repeatTimespan: "loading",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : 0,
		zIndex        : 0
	}
];

let globalPlanning = [
	{
		name          : "loading",
		duration      : 0,
		startTime     : 0,
		source        : "",
		type          : "agenda",
		repeatTimespan: "loading",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : 0,
		zIndex        : 0
	}
];

const setTasks = (agenda) => {
	globalAgenda = agenda
}

const setPlanning = (planning) => {
	globalPlanning = planning
}

const setGaps = (gaps) => {
	globalGaps = gaps
}

const setPlannedGaps = (plannedGaps) => {
	globalPlannedGaps = plannedGaps
}

const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [modified      , setModified      ] = useState(false);
	const [sync          , setSync          ] = useState(false);
	const [reload        , setReload        ] = useState(false);
	const [replan        , setReplan        ] = useState(false);
	const [unlockScroll  , setUnlockScroll  ] = useState(true);
	const [scrollOffset  , setScrollOffset  ] = useState(0);
	const [pendingFetch  , setPendingFetch  ] = useState(false);
	const [dayIndicators , setDayIndicators ] = useState([]);
	let tasks       = globalAgenda
	const [displayed      , setDisplayed      ] = useState([
		{
			name          : "loading",
			duration      : 0,
			startTime     : 0,
			source        : "",
			type          : "agenda",
			repeatTimespan: "loading",
			repeatInterval: 0,
			repeatOffset  : 0,
			repeatOffsets : [],
			id            : 0,
			zIndex        : 0
		}
	]);

	if (reload) {
		console.log("reloading"); 
		setReload(false);
	}

	const flatListRef = React.useRef()
	
	let loadedDate = new Date(loadedDay*86400000);
	agendaId=-1;

	const displayed2 = [{
		name          : "new Event",
		duration      : 60,
		startTime     : 0,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : tasks.length,
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 200,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : tasks.length,
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 1000,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : tasks.length,
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 100,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : tasks.length,
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 200,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		id            : tasks.length,
		zIndex        : 0
	}
	]
	
	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<FlatList
					// ref={this.theFlatList}
					ref={flatListRef}
					// ref={(ref) => { this._flatList = ref; }}
					// ref={(ref) => { this.theFlatList = ref; }}
					// ref={(ref) => { theFlatList = ref; }}
					// data={actuallyDisplayed}
					data={displayed2}
					// data={
					// 	planning.unshift({
					// 		name: "TestDay",
					// 		type: "date",
					// 		startTime: 0
					// 	})
					// }

					//wait... I can add a header bar
					ListHeaderComponent={() => <DateAndTimeItem task={{
						name: "TestDay",
						type: "date",
						startTime: 0,
						duration: 0
					}} />}

					

					renderItem={({item, index}) => 
						<ToDoListItem9 task={item} /> 
					}
					keyExtractor={(item, index) => index}
				/>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1} onPress={() => {setSync(false); navigation.navigate("ToDo" );}}/>
					<TouchableOpacity style={styles.menuButton2}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => {setSync(false); navigation.navigate("Focus");}}/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const ToDoListItem9 = ({task}) => {
	return ToDoListItem2 (task);
}

const ToDoListItem2 = (task) => {
	console.log("task 2", task);
	let duration  = task.duration;
	let startTime = task.startTime;
	return (
		<View style={{
			position: 'absolute',
			height: duration * timeScaleFactor,
			top: startTime * timeScaleFactor, 
			bottom: 0,
			left: 100, right: 0, 
			backgroundColor  : "#111",
			borderColor      : "#222",
			opacity: .5,
			borderWidth: 5,
		}}>
			<View style={styles.scrollBlock}>
				<View style={styles.scrollItem2}>
					<Text style={styles.scrollText}>
						{task.name}
					</Text>
				</View>
			</View>
		</View>
	);
}

const DateAndTimeItem = (task) => {
	//55 is the value I found that scales this close enough to the agenda bars 
	// const indicatorScale = 55 * timeScaleFactor;
	console.log("task 2", task);
	let duration  = task.duration;
	let startTime = task.startTime;
	const timeIndicators = [];
	for (let i=0; i<=24; i++){
		timeIndicators.push(i);
	}
	return (
		<View style={{
			position: 'absolute',
			height: 0,
			top: 0, 
			bottom: 0,
			left: 0, right: 0, 
			width: 100,
		}}>
			<View style={styles.timeIndicatorBlock}>
				{timeIndicators.map( (timeIndicator, index) => 
					<View key={index} style={{
						position: 'absolute',
						// height: 5,
						top: timeIndicator*60 * timeScaleFactor,
						// marginBottom: indicatorScale
					}}>
						<View style={{
							height: 5,
							width: 100,
							backgroundColor  : "#fff",
						}}/>
						<Text style={styles.timeIndicatorText}>
							{timeIndicator.toString()+":00"}
						</Text>
					</View>
				)}
			</View>
			<View style={{
				position: 'absolute',
				height: 35,
				top: minutesToday * timeScaleFactor, 
				left: 0, right: 0, 
				width: 100,
				backgroundColor  : "#000",
				opacity: 0.9
			}}>
				<View style={{
					height: 5,
					width: 100,
					backgroundColor  : "#0F0",
				}}/>
				<Text style={styles.timeDisplayText}>
					{timeString}
				</Text>
			</View>
		</View>
	);
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
		// position: 'absolute',
		backgroundColor: "#AAA",
	},
	items: {
		flex: 1,
		position: 'absolute',
		width: "100%",
		// top: 1000,
		// backgroundColor: "#00A",
		// padding: 100,
	},
	scrollBlock: {
		height: 50,
		backgroundColor: "#888",
		marginTop: 10,
		flexDirection:"row",
		opacity: .5,
	},
	scrollItem: {
		flex: 1,
		backgroundColor: "#444",
		marginLeft  : 1,
		marginRight : 1,
		marginTop   : 4,
		marginBottom: 4,
		opacity: .5,
	},
	scrollItem2: {
		flex: 1,
		backgroundColor: "#111",
		marginLeft  : 1,
		marginRight : 1,
		marginTop   : 4,
		marginBottom: 4,
		opacity: .5,
	},
	scrollText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
	},
	timeIndicatorBlock: {
		// height: 50,
		// backgroundColor: "#888",
		// marginTop: 10,
		flexDirection:"column"
	},
	timeIndicatorText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		// lineHeight: 300,
	},
	timeDisplayText: {
		fontSize: 20,
		color: "#0f0",
		textAlign: "center",
		// lineHeight: 300,
	},
	dateIndicatorText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		// lineHeight: 30,
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
	counterText: {
		fontSize: 40,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF"
	},
	fixedDateDisplay: {
		// height: 50,
		backgroundColor: "#888",
		flexDirection:"row",
		width: "100%"
	},
	fixedDateDisplayText: {
		fontSize: 40,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF"
	}
})

export default ToDoScreen;