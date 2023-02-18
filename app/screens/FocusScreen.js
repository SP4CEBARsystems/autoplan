import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, TouchableOpacity, SafeAreaView} from 'react-native';

const DispUpdate = (props) => {
	const [str, setStr] = useState(true);

	useEffect(() => {
		var ms=new Date(Date.now())
		//Auto-correcting timer (A is the time to wait) - Designed in BASIC
		var A=1500-(ms.getMilliseconds()+500)%1000
		//console.log(A)
		const trigger = setInterval(() => {
			setStr(ms.getHours().toString()+":"+ms.getMinutes().toString()+":"+ms.getSeconds().toString());
		}, A);

    	return () => clearInterval(trigger);
	})
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

const FocusScreen = ({ navigation }) => {
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
				
			</View>
			<View style={styles.bottomBar}>
				<View style={styles.musicBar}>
					<View style={styles.musicButton}/>
					<View style={styles.musicButton}/>
					<View style={styles.musicButton}/>
				</View>
			</View>
			<DispUpdate/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		//alignItems: "center",
		//position: "relative",
		backgroundColor: "#111",
	},
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
})

export default FocusScreen;