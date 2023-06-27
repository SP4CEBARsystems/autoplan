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

function fetchData3 (dayOffset, planning, setTasks, setSync, ref) {
	console.log("fetchdata3");
	// const AgendaQuery = query(Planning, orderBy("startTime"), limit(10000));
	//don't add a semicolon ";" after "getDoc()", Don't do that
	getDoc(ref).then((doc) => {
		console.log("doc");
		let data = doc.data();
		let newPlanning = data ? data.tasks : [];
		console.log("planning pre:", planning)
		// console.log("comparison:", planning[0].name == "loading", newPlanning, planning.concat(newPlanning));
		planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
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
		planning.unshift({
			name: "TestDay",
			type: "date",
			startTime: 7500 * dayOffset
		});
		setDisplayed(planning);
		setSync(true);
	}).catch((e) => {
		console.log("firebase error:", e);
		//throw e;
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
		planning = planning[0].name == "loading" ? newPlanning : planning.concat(newPlanning);
		
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
		setSync(true);
	}).catch((e) => {
		console.log("firebase error:", e);
		//throw e;
		//alert(error.message);
	});
}

let dayLengthPixels       = 6068.7998046874;
let deltaDayLengthPixels  = 1/dayLengthPixels;

let loadedDays            = [];
let loadedDay             = "Loading"
let indexTableTasks       = [];
let indexTableGaps        = [];
let indexTablePlannedGaps = [];
let indexTablePlanning    = [];
let amountOfDaysLoaded    = 0;

const fetchMore = (planning, setPlanning, tasks, setTasks, plannedGaps, setPlannedGaps, gaps , setGaps, displayed, setDisplayed, setSync, firestore) => {
	console.log("fetchMore");
	//get js date in milliseconds
	//multiply it by 1/86400000
	//add the offset (we're scrolling into the future)
	//use the resulting number to differentiate the names of the files
	//if no file was found: create a new file
	//use a copy of the variable in a js date formatter to display the date as a string
	
	const millisecondsToDay = 1/86400000;
	let dayOffset = Math.floor(scrollOffsetY * deltaDayLengthPixels);
	console.log("dayOffset:", dayOffset, scrollOffsetY, deltaDayLengthPixels);
	let milliSeconds = Date.now();
	let day = Math.floor(milliSeconds * millisecondsToDay) + dayOffset;
	let documentName = "Day" + day.toString();
	fetchData3 (dayOffset, planning   , setPlanning   , setSync, doc(firestore, "Planning"   , documentName));
	fetchData4 (dayOffset, tasks      , setTasks      , setSync, doc(firestore, "Agenda"     , documentName));
	fetchData4 (dayOffset, plannedGaps, setPlannedGaps, setSync, doc(firestore, "PlannedGaps", documentName));
	fetchData4 (dayOffset, gaps       , setGaps       , setSync, doc(firestore, "Gaps"       , documentName));
	
	//generate a table array which holds the day number and the array index number gor each of the arrays
	indexTableTasks.push      ( tasks.length       );
	indexTablePlannedGaps.push( plannedGaps.length );
	indexTableGaps.push       ( gaps.length        );
	amountOfDaysLoaded++;

	//is "planning" with the day indicators used to generate plannings? that would be bad
	
	loadedDays.push(documentName);
	loadedDay  = day;

	// fetchData (setTasks      , setSync, doc(firestore, "Agenda"     , "TestDay"));
	// fetchData (setPlannedGaps, setSync, doc(firestore, "PlannedGaps", "TestDay"));
	// fetchData (setGaps       , setSync, doc(firestore, "Gaps"       , "TestDay"));

	// fetchData3 (dayOffset+1, planning, setPlanning, setSync, doc(firestore, "Planning"   , "TestDay2"));
	// fetchData3 (dayOffset+1, planning, setPlanning, setSync, doc(firestore, "Planning"   , "Day" + day.toString()));
	scrollOffsetYLoaded += dayLengthPixels;
	//-dayLengthPixels
	// fetchData3 (setPlanning, setSync, doc(firestore, "Planning"   , "TestDay"));
}

	


let scrollOffsetY = 0;
let scrollOffsetYLoaded = 0;

const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [modified      , setModified      ] = useState(false);
	const [sync          , setSync          ] = useState(false);
	const [reload        , setReload        ] = useState(false);
	const [replan        , setReplan        ] = useState(false);
	const [unlockScroll  , setUnlockScroll  ] = useState(true);
	const [startScrolling, setStartScrolling] = useState(false);
	const [gaps          , setGaps          ] = useState([]);
	const [agenda        , setAgenda        ] = useState([]);
	const [plannedGaps   , setPlannedGaps   ] = useState([]);
	const [scrollOffset  , setScrollOffset  ] = useState(0);
	const [pendingFetch  , setPendingFetch  ] = useState(false);
	const [tasks         , setTasks         ] = useState([
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
			id            : 0
		}
	]);
	const [planning      , setPlanning      ] = useState([
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
			id            : 0
		}
	]);
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
			id            : 0
		}
	]);

	if (reload) {
		console.log("reloading"); 
		setReload(false);
	}
	// console.log("tasks", todo_tasks);

	// fetchData2(setTasks, setSync);
	
	useEffect(() => {
		// fetchData (setTasks      , setSync, doc(firestore, "Agenda"     , "TestDay"));
		// fetchData (setPlannedGaps, setSync, doc(firestore, "PlannedGaps", "TestDay"));
		// fetchData (setGaps       , setSync, doc(firestore, "Gaps"       , "TestDay"));

		// fetchData (setAgenda, setSync, doc(firestore, "Agenda"     , "TestDay"    ));
		// fetchData (setTasks , setSync, doc(firestore, "Planning"   , "TestDay"    ));
		// fetchData (setTasks , setSync, doc(firestore, "ToDo"       , "activeTasks"));
		// updateData(modified , setModified, sync, tasks);
		fetchMore (planning, setPlanning, tasks, setTasks, plannedGaps, setPlannedGaps, gaps , setGaps, displayed, setDisplayed, setSync, firestore);

		if (pendingFetch) {
			// fetchMore (planning, setPlanning, setSync, firestore);
			setPendingFetch(false);
		}
	},[]);

	// fetchMore (planning, setPlanning, setSync, firestore);
	// fetchData3 (setPlanning   , setSync, doc(firestore, "Planning"   , "TestDay"));
	updateData(modified, setModified, replan, setReplan, sync, tasks, setTasks, setGaps, setReload, setPlannedGaps, setPlanning);
	// console.log(tasks);
	// console.log(sync);


	// console.log("pre dayIndicator: ", planning)

	console.log("dayIndicator: ", planning)

	sync2  = sync;
	tasks2 = tasks;
	console.log("new: "         , tasks2      );
	console.log("unlockScroll: ", unlockScroll);

	// super(this)

	// setScrollOffset(-50)
	// const theFlatList = useRef("");
					
	// this.theFlatList.scrollToOffset({
	// 	offset: scrollOffset,
	// 	animated: false
	// })
	// console.log("this: ", this)

	const flatListRef = React.useRef()
	// toTop()
  	// const toTop = () => {
	// 	flatListRef.current.scrollToOffset({
	// 		animated: true,
	// 		offset: scrollOffset
	// 	})
	// }

	
	// flatListRef.current.scrollToOffset({
	// 	animated: true,
	// 	offset: scrollOffset
	// })
	
	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<View style={styles.fixedDateDisplay}>
					<Text style={styles.fixedDateDisplayText}>
						{"Day" + loadedDay.toString()}
					</Text>
				</View>
				<FlatList
					// ref={this.theFlatList}
					ref={flatListRef}
					// ref={(ref) => { this._flatList = ref; }}
					// ref={(ref) => { this.theFlatList = ref; }}
					// ref={(ref) => { theFlatList = ref; }}
					data={displayed}
					renderItem={({item, index}) => 
						<ToDoListItem9
						// <ToDoListItemSelector
							tasks=           {displayed}
							taskId=          {index}
							task=            {item}
							setModified=     {setModified}
							setTasks=        {setPlanning}
							setReload=       {setReload}
							setGaps=         {setGaps}
							setReplan=       {setReplan}
							setPlannedGaps=  {setPlannedGaps}
							setUnlockScroll= {setUnlockScroll}
							sync=            {sync}
							setScrollOffset= {setScrollOffset}
							flatListRef=     {flatListRef}
							// scrollOffsetY=   {scrollOffsetY}
						/> 
					}
					// keyExtractor={item => item.id}
					keyExtractor={(item, index) => index}
					// keyExtractor={(item, index) => item.key}
					// keyExtractor={{item,index} => index}
					onScroll={(event) => {
						scrollOffsetY=event.nativeEvent.contentOffset.y; 
						console.log("scrollOffset:", event.nativeEvent.contentOffset.y);
						// if (scrollOffsetY > scrollOffsetYLoaded) {
						// 	setPendingFetch(true);
						// }
					}}
					
					// onEndReachedThreshold={1}

					onEndReached={(info) => {
						console.log("EndReached", info.distanceFromEnd);
						fetchMore(planning, setPlanning, tasks, setTasks, plannedGaps, setPlannedGaps, gaps , setGaps, displayed, setDisplayed, setSync, firestore);
					}}

					// onEndReached={fetchMore(planning, setPlanning, setSync, firestore)}

					// onPress={() => {
					// 	scrollOffsetY = 0;
					// 	console.log("PRESSED");
					// }}		

					// scrollOffsetY = 0;

					// scrollToOffset = ({
					// 	offset: number,
					// 	animated: false
					// })
				/>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {
						tasks.push({
							name          : "new Event",
							duration      : 500,
							startTime     : 0,
							source        : "",
							type          : "agenda",
							repeatTimespan: "days",
							repeatInterval: 0,
							repeatOffset  : 0,
							repeatOffsets : [],
							id            : tasks.length
						});
						setTasks   (tasks);
						setReplan(true);
					}}>
						<Text style={styles.plusText}>
							+
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1} onPress={() => {setSync(false); navigation.navigate("ToDo" );}}/>
					<TouchableOpacity style={styles.menuButton2}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => {setSync(false); navigation.navigate("Focus");}}/>
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

const ToDoListItem9 = ({tasks, taskId, task, setTasks, setModified, setReload, setGaps, setReplan, setPlannedGaps, setUnlockScroll, sync, setScrollOffset, flatListRef}) => {
	//add buttons to increment and decrement the values
	//offset the scrolling to counter the starttime change when such a button is tapped
	//saveAgendaTimes(pan.x._offset, pan.y._offset, taskId, setTasks, setGaps, setReload, setPlannedGaps);
	console.log("taskID: "    , taskId);
	console.log("task 1: "    , task);
	console.log("tasks: "     , tasks);
	console.log("tasks task: ", tasks[taskId]);

	if (task.type == "agenda" || task.type == "break" ){
		// ToDoListItem9 (tasks, taskId, task, setTasks, setModified, setReload, setGaps, setReplan, setPlannedGaps, setUnlockScroll, sync, setScrollOffset, flatListRef);
		// return
	} else if (task.type == "generated"){
		// return
		return ToDoListItem2   (task);
	} else if (task.type == "generated break"){
		return breakItem       (task);
	} else if (task.type == "date"){
		return dateAndTimeItem (task);
	} else if (task.type == ""){
		console.log("undefined type");
		return ToDoListItem2   (task);
	} else {
		console.log("unsupported type");
		return ToDoListItem2   (task);
	}
	let taskType = tasks[taskId].type;

	return (
		<View
			style={{
				position: 'absolute',
				height: task.duration,
				top: task.startTime, 
				bottom: 0,
				left: 100, right: 0, 
				backgroundColor  : task.type == "break" ? "#2f2" : "#22f",
				borderColor      : "#222",
				opacity: .5,
				borderWidth: 5,
				zIndex: 1
			}}
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
				<TouchableOpacity style={styles.counterButton} onPress={() => {
					tasks[taskId].startTime += 50;
					scrollOffsetY += 50;
					// setScrollOffset(50);
					console.log("EEEEEEEE scrolloffset: ", scrollOffsetY)
					flatListRef.current.scrollToOffset({
						animated: false,
						offset: scrollOffsetY
					})
					//it only works when the direction is changed: check unique values, and cumulating values (I need these)
					setTasks   (tasks);
					setModified(true);
					setReplan  (true);
				}}>
					<Text style={styles.counterText}>
						+
					</Text>
				</TouchableOpacity>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.startTime}
						type="number"
						name="startTime"
						placeholder= "start time"
						onChange={(e) => {
							tasks[taskId].startTime = e.target.value;
							setTasks   (tasks);
							setReplan  (true);
						}}
					/>
				</View>
				<TouchableOpacity style={styles.counterButton} onPress={() => {
					tasks[taskId].startTime += -50;
					scrollOffsetY += -50;
					console.log("EEEEEEEE scrolloffset: ", scrollOffsetY)
					
					flatListRef.current.scrollToOffset({
						animated: false,
						offset: scrollOffsetY
					})
					// setScrollOffset(-50);
					
					// this.theFlatList.scrollToOffset({
					// 	offset: -50,
					// 	animated: false
					// })
					// this.theFlatList.current.scrollToOffset({
					// 	offset: -50,
					// 	animated: false
					// })
					setTasks   (tasks);
					setModified(true);
					setReplan  (true);
				}}>
					<Text style={styles.counterText}>
						-
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.counterButton} onPress={() => {
					// console.log("duration tasks: ", taskId, tasks[taskId]);
					tasks[taskId].duration += 50;
					setTasks   (tasks);
					setReplan  (true);
				}}>
					<Text style={styles.counterText}>
						+
					</Text>
				</TouchableOpacity>
				<View style={styles.scrollItem}>
					<TextInput style={styles.scrollText} 
						value={task.duration}
						type="number"
						name="duration"
						placeholder= "duration"
						onChange={(e) => {
							tasks[taskId].duration = e.target.value;
							setTasks   (tasks);
							setModified(true);
							setReplan  (true);
						}}
					/>
				</View>
				<TouchableOpacity style={styles.counterButton} onPress={() => {
					tasks[taskId].duration += -50;
					setTasks   (tasks);
					setReplan  (true);
				}}>
					<Text style={styles.counterText}>
						-
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.counterButton} onPress={() => {
					tasks[taskId].type = (taskType=="break") ? "agenda": "break";
					setTasks   (tasks);
					setReplan  (true);
				}}>
					<Text style={styles.counterText}>
						{taskType}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.delete} onPress={() => {
					tasks.splice(taskId, 1);
					setTasks   (tasks);
					setReplan(true);
				}}/>
			</View>
		</View>
		// </TouchableOpacity>
	);
}

const ToDoListItem2 = (task) => {
	console.log("task 2", task);
	let duration  = task.duration;
	let startTime = task.startTime;
	return (
		<View style={{
			position: 'absolute',
			height: duration,
			top: startTime, 
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

const breakItem = (task) => {
	console.log("task 2", task);
	let duration  = task.duration;
	let startTime = task.startTime;
	return (
		<View style={{
			position: 'absolute',
			height: duration,
			top: startTime, 
			bottom: 0,
			left: 100, right: 0, 
			backgroundColor  : "#070",
			borderColor      : "#050",
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

const dateAndTimeItem = (task) => {
	console.log("task 2", task);
	let duration  = task.duration;
	let startTime = task.startTime;
	return (
		<View style={{
			position: 'absolute',
			height: duration,
			top: startTime, 
			bottom: 0,
			left: 0, right: 0, 
			width: 100,
			backgroundColor  : "#CCC",
			borderColor      : "#AAA",
			borderWidth: 5,
			// zIndex: 10
		}}>
			<View style={styles.timeIndicatorBlock}>
				<Text style={styles.dateIndicatorText}>
					{"\n"}
					{"\n"}
					{"\n"}
					{"\n"}
					{task.name}{"\n"}
				</Text>
				<Text style={styles.timeIndicatorText}>
					00:00{"\n"}
					01:00{"\n"}
					02:00{"\n"}
					03:00{"\n"}
					04:00{"\n"}
					05:00{"\n"}
					06:00{"\n"}
					07:00{"\n"}
					08:00{"\n"}
					09:00{"\n"}
					10:00{"\n"}
					11:00{"\n"}
					12:00{"\n"}
					13:00{"\n"}
					14:00{"\n"}
					15:00{"\n"}
					16:00{"\n"}
					17:00{"\n"}
					18:00{"\n"}
					19:00{"\n"}
					20:00{"\n"}
					21:00{"\n"}
					22:00{"\n"}
					23:00
				</Text>
			</View>
		</View>
	);
}

//a function to find all gaps

function findGaps(tasks){
	//gapStart is 00:00
	//loop through tasks in order:
	//  if taskStart > gapStart then write a new gap to the database
	//  loop through the next tasks
	//    if taskEnd >= nextTaskStart then taskEnd = nextTaskEnd else break;
	//    nextTask();
	//  nextTask();
	let taskStart;
	// let taskEnd;
	// let nextTaskStart;
	// let nextTaskEnd;
	// let gapStart = 0;
	let prevTaskEnd = 0;
	let maxEnd      = 20000;
	let gaps = [];
	let dayOfTask     = 0;
	let prevDayOfTask = 0;
	indexTableGaps = [];
	console.log("tt: ", tasks)
	for (let i=0; i<tasks.length; i++) {
		taskStart   = tasks[i].startTime
		console.log("taskStart: ", prevTaskEnd, taskStart)
		if (prevTaskEnd < taskStart) {
			gaps.push({name: "gap", startTime: prevTaskEnd, duration: taskStart-prevTaskEnd});
		}
		prevTaskEnd = tasks[i].duration + taskStart
		
		dayOfTask = Math.floor (taskStart * deltaDayLengthPixels);
		if( dayOfTask != prevDayOfTask ){
			indexTableGaps.push(i);
		}
		prevDayOfTask = dayOfTask;
		

		// taskEnd       = tasks[i  ].duration + start
		// nextTaskStart = tasks[i+1].startTime
		// nextTaskEnd   = tasks[i+1].duration + nextTaskStart
		// if(gapStart < taskStart){
		// 	gaps.push({start: gapStart, end: taskStart});
		// }
		// while(taskEnd >= nextTaskStart && i<tasks.length-1){
		// 	i++;
		// 	taskStart     = tasks[i  ].startTime
		// 	taskEnd       = tasks[i  ].duration + start
		// 	nextTaskStart = tasks[i+1].startTime
		// 	// nextTaskEnd   = tasks[i+1].duration + nextTaskStart
		// }
		// gapStart = taskEnd;
	}
	if (prevTaskEnd < maxEnd) {
		gaps.push({name: "gap", startTime: prevTaskEnd, duration: maxEnd-prevTaskEnd});
	}

	// console.log("gaps: ", gaps);
	return gaps;
}

//load planning, load agenda -> view planning 
//  - on modify -> modify agenda -> update planning
//solution: keep them separated:
//database:
//x repeated_to do lists
//x repeated_agenda
//- pure planning (for agenda            )
//- agenda        (for agenda and gaps   )
//> gaps          (for            planner)
//> to do lists   (for to do  and planner)
//- planning (which includes the agenda) (for focus)

//1. load the relevant documents of all types from the database (app is loading)
//2. display the pure planning, display editable agenda on top
//3. if modified: overwrite planning with data generated by the agenda and the todo list

//to do
//1. write all relevant database documents
//2. write a viewer
//3. write a planner

//focus mode
//- display planning

//complexities
//- plan more days ahead (increases memory and loading times) (make it a setting, don't allow more than 7 days)

//- explore archive documents (past days and expired tasks)

//to do
//database write current planning events to agenda
//read events from the agenda (or find a way to get a list of only agenda events)
//make it clear where agenda events start and stop even when overlay-ed
//add a type and color property
//write the gaps to the agenda (temporary debugging tool)
//write the planning to the agenda
//savedata function has a terrible temporary line

//improve focus page
//add more days to the agenda (continuous scroll)
//add repeating tasks and events
//choose between absolute and relative times and stop mixing them
//figure out if firebase has a modified flag so that I can refetch the data from the database

function PlanOut(gaps, tasks){
	let plannedGaps   = [];
	let dayOfTask     = 0;
	let prevDayOfTask = 0;
	for(let i=0; i<gaps.length; i++){
		let gap    = gaps[i];
		let time   = gap.startTime;
		let gapEnd = time + gap.duration;
		let taskID = 0;
		console.log("planning loop", time, gapEnd, gap)
		while(time < gapEnd){
			if (taskID >= tasks.length) {
				taskID = 0;
				// break;
			}
			let task     = tasks[taskID];
			let timeLeft = gapEnd-time;
			console.log("time: ", i, taskID, time, timeLeft, task.maxLength);
			// if (time + task.minlength > timeLeft){
			// 	// //continue;
			// 	// plannedGaps.push ({name : task.name, duration : timeLeft, startTime : time});
			// 	// break;
			// } else 
			if (task.maxLength > timeLeft){
				console.log(task);
				// let duration = task.maxLength;
				plannedGaps.push ({
					name      : task.name, 
					duration  : timeLeft, 
					startTime : time, 
					type      : "generated", 
					id        : -plannedGaps.length
				});
		
				dayOfTask = Math.floor (time * deltaDayLengthPixels);
				if( dayOfTask != prevDayOfTask ){
					indexTablePlannedGaps.push(i);
				}
				prevDayOfTask = dayOfTask;
				// time = gapEnd;
				break;
			} else {
				// let duration = gapEnd;
				plannedGaps.push ({
					name      : task.name, 
					duration  : task.maxLength, 
					startTime : time, 
					type      : "generated",
					id        : -plannedGaps.length
				});
		
				dayOfTask = Math.floor (time * deltaDayLengthPixels);
				if( dayOfTask != prevDayOfTask ){
					indexTablePlannedGaps.push(i);
				}
				prevDayOfTask = dayOfTask;

				time += task.maxLength;
			}
			taskID++;
		}
	}
	console.log("return tasks:", tasks);
	return plannedGaps;
}

//postpone for now:
//a function to find a (new) gap's size after the task and to find if it's previous gap is merged with another gap
//a promising method:
//it looks up the details of the initial gap data, and it looks at the delta times to figure out what tasks are being stepped past, this can be any number of tasks
//it handles the event's start points and end points using the same function, but one at a time:
//the function: 
//- look at the sign of the delta value
//- determine if that means fill or clear for this node
//- look up the gap data
//- loop until the delta value is reached
//  - calculate if it escapes this gap
//  - if not then calculate the new time

//previous methods:
//situations:
//- a change in the gap's start time and or duration and the creation and or removal of gaps
//  creation:
//    task is inserted
//  removal
//    task is removed
//first approach:
//the gap's initial start time and end time and it's new start time and end time are analysed
//these are usually gap borders, so the details are looked up, example: "gap 4 end"
//the initial state is compared with the new state
//if there are no gap borders detected then it's just 0


function saveAgendaTimes(duration, startTime, taskId, setTasks, setGaps, setReload, setPlannedGaps, setPlanning){
	console.log("dur: ", duration)
	console.log("tas: ", tasks2, taskId)
	console.log("is: ", tasks2[taskId])
	tasks2[taskId].duration  = duration;
	tasks2[taskId].startTime = startTime;
	saveData2(tasks2, sync2, setTasks, setGaps, setReload, setPlannedGaps, setPlanning);
	console.log("dur2: ", duration)
}

function saveData(tasks, sync){
// function saveData(tasks){
	// console.log("ready to write");
	// console.log("sync  check 2: ",sync);
	// console.log("sync2 check 2: ",sync2);
	
	if(sync){
		// console.log("written");
		// TEMPORARY
		// planning = tasks;
		//
		// actuallySaveTheData(planning, doc(firestore, "Planning", "TestDay"));
		actuallySaveTheData(tasks   , doc(firestore, "Agenda"  , "TestDay"));
	}
}

function saveData2(tasks, sync, setTasks, setGaps, setReload, setPlannedGaps, setPlanning){
// function saveData(tasks){
	// console.log("ready to write");
	// console.log("sync  check 2: ",sync);
	// console.log("sync2 check 2: ",sync2);
	
	if(sync){
		// console.log("written");

		//temporary
		let gaps        = [];
		let plannedGaps = [];

		console.log("A1");
		tasks.sort((a, b) => a.startTime - b.startTime);
		console.log("A2", tasks);
		//disable this for testing purposes \V/
		// let gaps        = findGaps(tasks);
		console.log("A3", gaps);

		//disable this for testing purposes \V/
		// let plannedGaps = PlanOut(gaps, todo_tasks);
		console.log("A4", plannedGaps);

		let planning    = tasks;
		//disable this for testing purposes \V/
		// planning = planning.concat(plannedGaps);
		console.log("A5", planning);
		planning.sort((a, b) => a.startTime - b.startTime);
		console.log("A6", planning);
		planning.unshift({ name: "TestDay", type: "date" });
		setPlanning(planning);

		// /^\ doesn't include day indicators
		//add a display array that is separated from the database syncing arrays
		//find a better way to add day indicators just once to this display array

		//loadedDay
		//"TestDay"


		//"figure out" as an app name for something
		
	// indexTableTasks       = [];
	// indexTableGaps        = [];
	// indexTablePlannedGaps = [];
	// indexTablePlanning    = [];

		// indexTableTasks       
		// indexTablePlannedGaps 
		// indexTableGaps        
		for(let i=0; i<amountOfDaysLoaded; i++){
			let day     = loadedDay + i;
			let docName = "Day" + day.toString();
			actuallySaveTheData( tasks.slice      (0, indexTableTasks      [i]), doc( firestore, "Agenda"     , docName ));
			actuallySaveTheData( gaps.slice       (0, indexTableGaps       [i]), doc( firestore, "Gaps"       , docName ));
			actuallySaveTheData( plannedGaps.slice(0, indexTablePlannedGaps[i]), doc( firestore, "PlannedGaps", docName ));
			actuallySaveTheData( planning.slice   (0, indexTablePlanning   [i]), doc( firestore, "Planning"   , docName ));
		}
		setTasks      (tasks      );
		setGaps       (gaps       );
		setPlannedGaps(plannedGaps);
		// setPlannedGaps(plannedGaps);
		// setPlanning   (planning   );
		setReload     (true );
	}
}

function actuallySaveTheData(tasks, ref){
	//updateDoc
	setDoc(ref, {tasks: tasks})
	.catch((e) => {
		console.log(e)
		//throw e;
		//alert(error.message);
	});
}

function updateData (modified, setModified, replan, setReplan, sync, tasks, setTasks, setGaps, setReload, setPlannedGaps, setPlanning) {
	if (replan){
		setReplan(false);
		saveData2(tasks, sync, setTasks, setGaps, setReload, setPlannedGaps, setPlanning)
	} else if(modified){
		setModified(false);
		saveData(tasks, sync);
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
		height: 50,
		backgroundColor: "#888",
		marginTop: 10,
		flexDirection:"column"
	},
	timeIndicatorText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		lineHeight: 300,
	},
	dateIndicatorText: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		lineHeight: 30,
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
		flexDirection:"column"
	},
	fixedDateDisplayText: {
		fontSize: 40,
		textAlign: "center",
		textAlignVertical: "center",
		color: "#FFF"
	}
})

export default ToDoScreen;