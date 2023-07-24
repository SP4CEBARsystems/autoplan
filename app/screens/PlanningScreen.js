import React, { useState, useEffect, useRef, Component } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput, Animated, PanResponder } from 'react-native';

const ToDoScreen = ({ navigation }) => {
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
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 500,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
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
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	},{
		name          : "new Event",
		duration      : 60,
		startTime     : 300,
		source        : "",
		type          : "agenda",
		repeatTimespan: "days",
		repeatInterval: 0,
		repeatOffset  : 0,
		repeatOffsets : [],
		zIndex        : 0
	}
	]
	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={displayed2}
					renderItem={({item, index}) => <ToDoListItem2 task={item} /> }
					keyExtractor={(item, index) => index}
				/>
				<View style={styles.menuButtons}>
					<TouchableOpacity style={styles.menuButton1} onPress={() => {navigation.navigate("ToDo" );}}/>
					<TouchableOpacity style={styles.menuButton2}/>
					<TouchableOpacity style={styles.menuButton3} onPress={() => {navigation.navigate("Focus");}}/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const ToDoListItem2 = ({task}) => {
	return (
		// <View style={{
		// 	position: 'absolute',
		// 	height: task.duration,
		// 	top: task.startTime, 
		// 	bottom: 0,
		// 	left: 0, right: 0, 
		// 	backgroundColor  : "#111",
		// 	borderColor      : "#222",
		// 	borderWidth: 5,
		<View style={{
			height: task.duration,
			backgroundColor  : "#111",
			borderColor      : "#222",
			borderWidth: 5,
		}}>
			<View style={styles.scrollBlock}>
				<Text style={styles.scrollText}>
					{task.name}
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