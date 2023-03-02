import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button} from 'react-native';
//import { Box, FlatList, Center, NativeBaseProvider} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from 'react-native';


// import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from "../../firebase";
//import { firestore, auth } from "/config/firebase"



//export default function CoffeeAutonomous() {
const TDListUpdate = (props) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		const resp = await fetch("https://api.sampleapis.com/coffee/hot");
		const data = await resp.json();
		setData(data);
		setLoading(false);
	};

	const renderItem = ({ item }) => {
		return (
			<Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
				{item.title}
			</Box>
		);
	};
	useEffect(() => {
	  fetchData();
	}, []);

	return (
	  <NativeBaseProvider>
		<Center flex={1}>
		<Box> Fetch API</Box>
		  {loading && <Box>Loading..</Box>}
		  {data && (
			<FlatList
			  data={data}
			  renderItem={renderItem}
			  keyExtractor={(item) => item.id.toString()}
			/>
		  )}
		</Center>
	  </NativeBaseProvider>
	);
}





const tdlstupdate = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('C:\Users\Bjcre\Desktop\react native\test database.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  //return (
	//data
  
    //<View style={{ flex: 1, padding: 24 }}>
    //  {isLoading ? <Text>Loading...</Text> : 
    //  ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
    //      <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text>
    //      <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
    //      <FlatList
    //        data={data.articles}
    //        keyExtractor={({ id }, index) => id}
    //        renderItem={({ item }) => (
    //          <Text>{item.id + '. ' + item.title}</Text>
    //        )}
    //      />
    //    </View>
    //  )}
    //</View>
  //);
};



let TASK1_object = {
	name: 'MEMORY',
	requiredTime: 0,
	deadline: 65536,
	priority: 1.0,
	like: 5,
	repeat: [0,0,0,0,0,0,0]
};




AsyncStorage.setItem(
	'TASK1',
	JSON.stringify(TASK1_object),
	() => {
		//AsyncStorage.mergeItem(
		//  'UID123',
		//  JSON.stringify(UID123_delta),
		//  () => {
		//    AsyncStorage.getItem('UID123', (err, result) => {
		//      console.log(result);
		//    });
		//  }
		//);
	}
);


const readData = async () => {
  try {
    const listValue = await AsyncStorage.getItem(STORAGE_KEY)

    if (value !== null) {
		let tasks = [{
			name: 'Hi',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'This',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'Is A',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'List',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		}];
	  setList(listValue)
	  return(ToDoListItems(tasks))
	}
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }
}



const ToDoListItems = (props) => {
	
	//let tasks = tdlstupdate();
	
	const [lst, setLst] = useState(async () => {
		const TDlist = await AsyncStorage.getItem('TASK1', (err, value) => {
			return(value);
		});
		setLst(TDlist);
		return TDlist
	});
	
	//let tasks=lst;
	
	//console.log(lst);

	//let tasks = 
	const [tasks, settasks] = useState([
		{
			name: 'TASK2',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'MATH',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'THIS',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		},{
			name: 'work',
			requiredTime: 5,
			deadline: 35663,
			priority: 0.7,
			like: 3,
			repeat: [0,0,0,0,0,0,0]
		}
	]);

	// settasks([
	// 	{
	// 		name: 'TASK3',
	// 		requiredTime: 5,
	// 		deadline: 35663,
	// 		priority: 0.7,
	// 		like: 3,
	// 		repeat: [0,0,0,0,0,0,0]
	// 	},{
	// 		name: 'MATH',
	// 		requiredTime: 5,
	// 		deadline: 35663,
	// 		priority: 0.7,
	// 		like: 3,
	// 		repeat: [0,0,0,0,0,0,0]
	// 	},{
	// 		name: 'THIS',
	// 		requiredTime: 5,
	// 		deadline: 35663,
	// 		priority: 0.7,
	// 		like: 3,
	// 		repeat: [0,0,0,0,0,0,0]
	// 	},{
	// 		name: 'work',
	// 		requiredTime: 5,
	// 		deadline: 35663,
	// 		priority: 0.7,
	// 		like: 3,
	// 		repeat: [0,0,0,0,0,0,0]
	// 	}
	// ]);


  // {
  //   string: "example",
  //   number: 5,
  //   array: [0,0,0,0,0,0,0]
  // }

//   useEffect(() => {
//     // getDoc(doc(firestore, "testCollection", "testDocument"))
//     getDoc(doc(firestore, "uitgevers", "Frontrunners", "boeken", "bidden = ontvangen"))
//     .then((doc) => {
//       console.log(doc.data()); 
//       setUserData(doc.data());
//     })
//   }, [])

	// getDoc(doc(firestore, "ToDo", "FUpLyEGm0O08pThw1oHx")).then((tasks) => {
	// 	//successMessage is whatever we passed in the resolve(...) function above.
	// 	//It doesn't have to be a string, but if it is only a succeed message, it probably will be.
	// 	console.log(`Yay! ${tasks}`);
	// });


	useEffect(() => {
		getDoc(doc(firestore, "ToDo", "testDocument")).then((doc) => {
			console.log(doc.data().test);
			settasks(doc.data().test);
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
  return (
		<View style={
			styles.background
		}>
			<SafeAreaView style={styles.container}>
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
				<ScrollView style={styles.scrollingList}>
					
					<ToDoListItems/>	
					
				</ScrollView>
				<View style={
					styles.menuButtons
				}>
					<TouchableOpacity style={
						styles.menuButton1
						
					}/>
					<TouchableOpacity style={
						styles.menuButton2
						}
						onPress={() =>
							navigation.navigate('Planning')
						}
					/>
					<TouchableOpacity style={
						styles.menuButton3
						}
						onPress={() =>
							navigation.navigate('Focus')
						}
					/>
				</View>
			</SafeAreaView>
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
})

export default ToDoScreen;