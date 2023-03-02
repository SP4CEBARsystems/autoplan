import React, { useState, useEffect, useRef, Component } from 'react';
import { ImageBackground, StyleSheet, View , Text, TouchableOpacity, SafeAreaView, Animated, PanResponder} from 'react-native';


const ToDoListItems = (props) => {

	const [tasks, settasks] = useState([
		{
			name: 'first',
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


	useEffect(() => {
		getDoc(doc(firestore, "ToDo", "testDocument"))
		.then((doc) => {
			//console.log(doc.data().test);
			settasks(doc.data().test);
			// settasks([
			// ]);
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


const ToDoScreen = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				pan.setOffset({
					x: pan.x._value,
					y: pan.y._value
				});
			},
			onPanResponderMove: Animated.event(
				[
					null,
					{ dx: pan.x, dy: pan.y }
				],
				{useNativeDriver: false}
			),
			onPanResponderRelease: () => {
				pan.flattenOffset();
			}
		})
	).current;
	
	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<View style={styles.headerBar}>
					
				</View>
				<View style={styles.scrollingList}>
					<View style={styles.scrollBlock}>
						<Animated.View
							style={[styles.animatedBox,{
									paddingTop: pan.y,
									paddingLeft: pan.x,
									//top: pan.y,
									//left: pan.x,
								}]}
								{...panResponder.panHandlers}
						>
							
						</Animated.View>
					</View>
				</View>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1}
						onPress={() => navigation.navigate('ToDo')}
					/>
					<TouchableOpacity style={styles.menuButton2}
					/>
					<TouchableOpacity style={styles.menuButton3}
						onPress={() => navigation.navigate('Focus')}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}


const styles = StyleSheet.create({
	animatedBox:{
		width : 180,
		height: 180,
		backgroundColor : '#0091EA'
	},
	background: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#000",
	},
	container: {
		flex: 1,
		backgroundColor: "#000"
	},
	textStyle: {
		fontSize: 90,
		color: "#fff",
	},
	headerBar: {
		height: 100,
		backgroundColor: "#444",
	},
	scrollingList: {
		flex: 1,
		backgroundColor: "#AAA",
		flexDirection: "row",
		justifyContent: "center"
	},
	scrollBlock: {
		width: "95%",
		backgroundColor: "#888",
		marginHorizontal: "1%",
		//marginLeft: 10,
		//marginRight: 10,
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
	box: {
		height: 150,
		width: 150,
		backgroundColor: "blue",
		borderRadius: 5
	},
})

export default ToDoScreen;