import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput} from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";


// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"




// let tasks = [
// 	{
// 		name: 'loading',
// 		requiredTime: 0,
// 		deadline: 0,
// 		priority: 0,
// 		like: 0,
// 		repeat: [0,0,0,0,0,0,0]
// 	},{
// 		name: 'loading',
// 		requiredTime: 0,
// 		deadline: 0,
// 		priority: 0,
// 		like: 0,
// 		repeat: [0,0,0,0,0,0,0]
// 	}
// ];


const ToDoListItems = ({tasks, setTasks, modified, setModified}) => {
	// const [pendingRefresh, setPendingRefresh] = useState(false);
	
	// name        setName        
	// requiredTime setRequiredTime
	// deadline    setDeadline    
	// priority    setPriority    
	// like        setLike   

	// setName        
	// setRequiredTime
	// setDeadline    
	// setPriority    
	// setLike       


	// let TasksVar = Tasks;

	// const a = pendingRefresh;

	// fetchData();
	
	
	useEffect(() => {
		console.log("database")
		getDoc(doc(firestore, "ToDo", "testDocument"))
		.then((doc) => {
			setTasks(doc.data().test);


			//console.log(doc.data().test);
			// tasks = doc.data().test;

			// tasks = [
			// 	{
			// 		name: 'loadingg',
			// 		requiredTime: 0,
			// 		deadline: 0,
			// 		priority: 0,
			// 		like: 0,
			// 		repeat: [0,0,0,0,0,0,0]
			// 	},{
			// 		name: 'loadingg',
			// 		requiredTime: 0,
			// 		deadline: 0,
			// 		priority: 0,
			// 		like: 0,
			// 		repeat: [0,0,0,0,0,0,0]
			// 	}
			// ];
			// setPendingRefresh(true);

			// setName        (tasks.name        );
			// setRequiredTime(tasks.requiredTime);
			// setDeadline    (tasks.deadline    );
			// setPriority    (tasks.priority    );
			// setLike        (tasks.like        );
		})
		.catch((e) => {
			console.log(e)
			//throw e;
			//alert(error.message);
		});
	},[]);

	console.log("hi")
	console.log(tasks[0]);
	
	const n = tasks.length;

	console.log(n);

	if(modified){
		setModified(false);
		console.log("post database")
		console.log(tasks)
		updateDoc(doc(firestore, "ToDo", "testDocument"), {test: tasks})
		// updateDoc(doc(firestore, "ToDo", "testDocument", tasks))
		// updateData(tasks);
	}

	//the DOM seems to get lost here and it stops accepting state variables

	return [...Array(n)].map((e, i) =>
	// const i=0;
	// return (
		<View key={i}>
			<ToDoListItem 
				// {console.log("hey")}
				tasks={tasks}
				taskId={i}
				task={tasks[i]}
				// pendingRefresh={pendingRefresh}
				// setPendingRefresh={setPendingRefresh}
				setModified={setModified}
				setTasks={setTasks}
			/>
		</View>
	);
}

// const fetchData = (props) => {
// }



function updateData (tasks) {
	// useEffect(() => {
		console.log("post database")
		console.log(tasks)
		updateDoc(doc(firestore, "ToDo", "testDocument", tasks))
		// .then((doc) => {
		// })
		// .catch((e) => {
		// 	console.log(e)
		// 	//throw e;
		// 	//alert(error.message);
		// });
	// },[]);
}


//use multiple arrays instead of a map array

// const ToDoListItem = (props) => {
const ToDoListItem = ({tasks, taskId, task, setTasks, setModified}) => {
	// pendingRefresh, setPendingRefresh, 
	// const [name        , setName        ] = useState("Loading");
	// const [requiredTime, setRequiredTime] = useState(0);
	// const [deadline    , setDeadline    ] = useState(0);
	// const [priority    , setPriority    ] = useState(0);
	// const [like        , setLike        ] = useState(0);
	
	console.log("in")
	console.log(tasks[taskId]);

	return (
		<View style={styles.scrollBlock}>
			<View style={styles.scrollItem}>
				<TextInput style={styles.scrollText} 
					// value={props.name}
					value={task.name}
					//the issue is that it refuses to re-render
					// value={Date.now().toString()}
					// value={tasks[taskId].name}
                    type="text"
                    name="name"
                    placeholder= "task name"
                    //onChange={(e) => setKvk(e.target.value)}
					//onChange={(e) => props.set("name",e.target.value)} 
                    onChange={(e) => {
						// setPendingRefresh(true);
						// tasks[key]["name"] = e.target.value;
						// tasks[taskId].set("name",e.target.value)
						tasks[taskId].name = e.target.value;
						console.log(tasks[taskId].name);
						setTasks(tasks);
						setModified(true);
					}}
				/>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{task.requiredTime}
					{/* {props.pendingRefresh.toString()} */}
					{/* {props.pendingRefresh ? "true" : "false"} */}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{task.deadline}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{task.priority}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{task.like}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					...
				</Text>
			</View>
		</View>
	);
}


//syntax of a react component:
// import styles from '../styles/WieZijnWij.module.css';

// export const WieZijnWij = () => {
//     return (




const ToDoScreen = ({ navigation }) => {
	//process.on('unhandledRejection', r => console.log(r));
	
	const [modified, setModified] = useState(false);
	const [tasks, setTasks] = useState([
		{
			name: 'loading',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'loading',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		}
	]);

  return (
		<View style={
			styles.background
		}>
			<SafeAreaView style={styles.container}>
				<HeaderBar/>
				<ScrollView style={styles.scrollingList}>
					
					<ToDoListItems tasks={tasks} setTasks={setTasks} modified={modified} setModified={setModified} />	
					
				</ScrollView>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {
						tasks.push({
							name: 'new Task',
							requiredTime: 0,
							deadline: 0,
							priority: 0,
							like: 0,
							repeat: [0,0,0,0,0,0,0]
						});
						console.log(tasks);
						setTasks(tasks);
						setModified(true);
					}}>
						<Text style={styles.plusText}>
							+
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1}/>
					<TouchableOpacity style={styles.menuButton2} onPress={() => navigation.navigate('Planning')}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => navigation.navigate('Focus'   )}/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const HeaderBar = (props) => {
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
	}
})

export default ToDoScreen;