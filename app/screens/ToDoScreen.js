import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button} from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";


// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"





const ToDoListItems = (props) => {
	
	const [tasks, settasks] = useState([
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

	useEffect(() => {
		getDoc(doc(firestore, "ToDo", "testDocument"))
		.then((doc) => {
			//console.log(doc.data().test);
			settasks(doc.data().test);
			
		})
		.catch((e) => {
			console.log(e)
			//throw e;
			//alert(error.message);
		});
	},[]);
	
	const n = tasks.length;
	return [...Array(n)].map((e, i) =>
		<View key={i}>
			{ToDoListItem (tasks[i])}
		</View>
	);
}




const ToDoListItem = (props) => {
	return (
		<View style={styles.scrollBlock}>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{props.name}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{props.requiredTime}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{props.deadline}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{props.priority}
				</Text>
			</View>
			<View style={styles.scrollItem}>
				<Text style={styles.scrollText}>
					{props.like}
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

  return (
		<View style={
			styles.background
		}>
			<SafeAreaView style={styles.container}>
				<HeaderBar/>
				<ScrollView style={styles.scrollingList}>
					
					<ToDoListItems/>	
					
				</ScrollView>
				<View style={styles.plusParent}>
					<TouchableOpacity style={styles.plus} onPress={() => {}}>
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
					Repeating Settings
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