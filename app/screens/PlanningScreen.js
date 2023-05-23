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


let sync2  = false;
let tasks2 = [];

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
	useEffect(() => {
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
	},[]);
}

const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	const [modified, setModified] = useState(false);
	const [sync    , setSync    ] = useState(false);
	const [reload  , setReload  ] = useState(false);
	const [gaps    , setGaps    ] = useState([]);
	const [agenda  , setAgenda  ] = useState([]);
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

	if (reload) {console.log("reloading"); setReload(false);}
	// console.log("tasks", todo_tasks);

	// fetchData2(setTasks, setSync);
	
	// fetchData (setAgenda, setSync, doc(firestore, "Agenda"     , "TestDay"    ));
	fetchData (setTasks, setSync, doc(firestore, "Agenda"     , "TestDay"    ));
	// fetchData (setTasks , setSync, doc(firestore, "PlannedGaps", "TestDay"    ));
	// fetchData (setTasks , setSync, doc(firestore, "Planning"   , "TestDay"    ));
	fetchData (setGaps  , setSync, doc(firestore, "Gaps"       , "TestDay"    ));
	// fetchData (setTasks , setSync, doc(firestore, "ToDo"       , "activeTasks"));
	updateData(modified , setModified, sync, tasks);
	// console.log(tasks);
	// console.log(sync);
	sync2  = sync;
	tasks2 = tasks;
	console.log ("new: ", tasks2)
	
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
				<ScrollView style={styles.scrollingList}>
					<View style={styles.items}>
						<ToDoListItems2
							tasks       = {gaps       } 
							setTasks    = {setGaps    }
							// tasks       = {tasks      } 
							// setTasks    = {setTasks   } 
							modified    = {modified   } 
							setModified = {setModified} 
							sync        = {sync       } 
							setSync     = {setSync    } 
						/>
					</View>
					<View style={styles.items}>
						<ToDoListItems
							tasks       = {tasks      } 
							setTasks    = {setTasks   } 
							modified    = {modified   } 
							setModified = {setModified} 
							setReload   = {setReload  }
							setGaps     = {setGaps    }
							sync        = {sync       } 
							setSync     = {setSync    } 
						/>
					</View>
				</ScrollView>
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

const ToDoListItems = ({tasks, setTasks, setModified, setReload, setGaps, sync}) => {
	const n = tasks.length;
	return [...Array(n)].map((e, i) =>
		<View key={i}>
			<ToDoListItem 
				tasks       = {tasks      }
				taskId      = {i          }
				task        = {tasks[i]   }
				setModified = {setModified}
				setTasks    = {setTasks   }
				setReload   = {setReload  }
				setGaps     = {setGaps    }
				sync        = {sync       }
			/>
		</View>
	);
}

const ToDoListItems2 = ({tasks, setTasks, setModified, sync}) => {
	const n = tasks.length;
	return [...Array(n)].map((e, i) =>
		<View key={i}>
			<ToDoListItem2 
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


//index the todo list to get the urgencies in order
//index the agenda to analyse it in start time order

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


const ToDoListItem = ({tasks, taskId, task, setTasks, setModified, setReload, setGaps, sync}) => {
	let duration  = task.duration;
	let startTime = task.startTime;
	// console.log("active");

	const pan = useRef(new Animated.ValueXY()).current;
	//if (pan.y==0) {pan.y = w;}
	// Animated.add(pan.x, v)
	// pan.setOffset(pan: {x: v; y: w});
	pan.setOffset({x: duration, y: startTime});

	// console.log("sync  check 1: ",sync);
	// console.log("sync2 check 1: ",sync2);

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
			onPanResponderRelease: () => {
				pan.extractOffset();
				// console.log("hi");
				// console.log(pan.x._offset, pan.y._offset);
				//saveAgendaTimes(pan.x._offset, pan.y._offset);
				// tasks[taskId].duration  = pan.x._offset;
				// tasks[taskId].startTime = pan.y._offset;
				//console.log("written");
				// saveAgendaTimes(tasks, sync);
				saveAgendaTimes(pan.x._offset, pan.y._offset, taskId, setTasks, setGaps, setReload);
				//problem 1: when the page is visited the second time it won't load properly: all names are "loading" and it creates a new task, written in one write
				//problem 2: when there are two events, the second one gets its timings messed up
			},
		}),
	).current;

	// static add(a: Animated, b: Animated): AnimatedAddition;
	//pan.x v

	return (
		<Animated.View
		//[styles.animatedBox,
			style={{
				// flex          : 0,
				//position:'absolute',
				position: 'absolute',
				height: pan.x,
				//height: v,
				// paddingBottom : pan.x,
				// top: w, 
				//translateY    : w,
				//marginTop: w,
				top: pan.y, 
				// top:0,
				bottom: 0,
				// top: w, bottom: w+x,
				left: 0, right: 0, 
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
			}}{...panResponder.panHandlers}
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
				{/* <View> */}
					{/* bar */}
				{/* </View> */}
				{/* <View style={styles.scrollItem}>
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
				</View> */}
				<TouchableOpacity style={styles.delete} onPress={() => {
					tasks.splice(taskId, 1);
					setTasks   (tasks);
					setModified(true);
				}}/>
			</View>
		</Animated.View>
	);
}

const ToDoListItem2 = ({tasks, taskId, task, setTasks, setModified, sync}) => {
	let duration  = task.duration;
	let startTime = task.startTime;
	// console.log("active");
	// static add(a: Animated, b: Animated): AnimatedAddition;
	//pan.x v
	return (
		<View
		//[styles.animatedBox,
			style={{
				// flex          : 0,
				//position:'absolute',
				position: 'absolute',
				height: duration,
				//height: v,
				// paddingBottom : pan.x,
				// top: w, 
				//translateY    : w,
				//marginTop: w,
				top: startTime, 
				//x: duration, y: startTime
				// top:0,
				bottom: 0,
				// top: w, bottom: w+x,
				left: 0, right: 0, 
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
				{/* <View> */}
					{/* bar */}
				{/* </View> */}
				{/* <View style={styles.scrollItem}>
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
				</View> */}
				<TouchableOpacity style={styles.delete} onPress={() => {
					tasks.splice(taskId, 1);
					setTasks   (tasks);
					setModified(true);
				}}/>
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
	let maxEnd      = 2000;
	let gaps = [];
	console.log("tt: ", tasks)
	for (let i=0; i<tasks.length; i++) {
		taskStart   = tasks[i].startTime
		console.log("taskStart: ", prevTaskEnd, taskStart)
		if (prevTaskEnd < taskStart) {
			gaps.push({name: "gap", startTime: prevTaskEnd, duration: taskStart-prevTaskEnd});
		}
		prevTaskEnd = tasks[i].duration + taskStart
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
	let plannedGaps = [];
	let ID = 0;
	for(let i=0; i<gaps.length; i++){
		let gap    = gaps[i];
		let gapEnd = gap.end;
		let time   = gap.start;
		let taskID = 0;
		while(time < gapEnd){
			let task     = tasks[taskID];
			let timeLeft = gapEnd-time;
			console.log("time: ", i, taskID, time, timeLeft, task.maxLength);
			if (time + task.minlength > timeLeft){
				// continue;
				plannedGaps[ID]= {name : task.name, duration : timeLeft, startTime : time};
				ID++;
				break;
			} else if (time + task.maxLength > timeLeft){
				console.log(task);
				time += task.maxLength;
				let duration = task.maxLength;
				plannedGaps[ID]= {name : task.name, duration : timeLeft, startTime : time};
				ID++;
			} else {
				time = gapEnd;
				let duration = gapEnd;
				plannedGaps[ID]= {name : task.name, duration : timeLeft, startTime : time};
				ID++;
				break;
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


function saveAgendaTimes(duration, startTime, taskId, setTasks, setGaps, setReload){
	console.log("dur: ", duration)
	console.log("tas: ", tasks2, taskId)
	console.log("is: ", tasks2[taskId])
	tasks2[taskId].duration  = duration;
	tasks2[taskId].startTime = startTime;
	saveData2(tasks2, sync2, setTasks, setGaps, setReload);
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
		planning = tasks;
		//
		actuallySaveTheData(planning, doc(firestore, "Planning", "TestDay"));
		actuallySaveTheData(tasks   , doc(firestore, "Agenda"  , "TestDay"));
	}
}

function saveData2(tasks, sync, setTasks, setGaps, setReload){
// function saveData(tasks){
	// console.log("ready to write");
	// console.log("sync  check 2: ",sync);
	// console.log("sync2 check 2: ",sync2);
	
	if(sync){
		// console.log("written");
		console.log("A1");
		tasks.sort((a, b) => a.startTime - b.startTime);
		console.log("A2", tasks);
		let gaps        = findGaps(tasks);
		console.log("A3", gaps);
		let plannedGaps = PlanOut(gaps, todo_tasks);
		console.log("A4", plannedGaps);
		let planning    = tasks;
		planning = planning.concat(plannedGaps);
		console.log("A5", planning);
		planning.sort((a, b) => a.startTime - b.startTime);
		console.log("A6", planning);
		actuallySaveTheData(tasks      , doc(firestore, "Agenda"     , "TestDay"));
		actuallySaveTheData(gaps       , doc(firestore, "Gaps"       , "TestDay"));
		actuallySaveTheData(plannedGaps, doc(firestore, "PlannedGaps", "TestDay"));
		actuallySaveTheData(planning   , doc(firestore, "Planning"   , "TestDay"));
		setTasks      (tasks      );
		setGaps       (gaps       );
		// setPlannedGaps(plannedGaps);
		// setPlanning   (planning   );
		setReload     (true );
	}
}

function actuallySaveTheData(tasks, ref){
	updateDoc(ref, {tasks: tasks})
	.catch((e) => {
		console.log(e)
		//throw e;
		//alert(error.message);
	});
}

function updateData (modified, setModified, sync, tasks) {
	if(modified){
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
		width: 3000,
		// top: 1000,
		// backgroundColor: "#00A",
		// padding: 100,
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