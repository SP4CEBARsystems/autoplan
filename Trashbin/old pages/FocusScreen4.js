import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, TouchableOpacity, SafeAreaView} from 'react-native';

const DispUpdate = (props) => {
  const [str, setStr] = useState(true);

   useEffect(() => {
	 var ms=new Date(Date.now())
	 //Auto-correcting timer (A is the time to wait)
	 var A=1500-(ms.getMilliseconds()+500)%1000
	 //console.log(A)
     const trigger = setInterval(() => {
       setStr(ms.getHours().toString()+":"+ms.getMinutes().toString()+":"+ms.getSeconds().toString());
     }, A);

    return () => clearInterval(trigger);
  })
  return (
		<View style={styles.timerBar}>
			
		</View>
  );
}

const FocusScreen4 = () => {
  return (
		<View 
			style={styles.background}
		>
			<SafeAreaView style={styles.background2}>
				<View style={styles.topBar}>
					
				</View>
				
				<View style={styles.bottomBar}>
					
				</View>
			</SafeAreaView>
			<DispUpdate/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#111",
	},
	background2: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	timerBar:{
		alignItems: "center",
		position: "absolute",
	},
	textStyle1:{
		fontSize: 90,
		color: "#fff",
	},
	textStyle2:{
		fontSize: 90,
		color: "#fff",
	},
	nowLine:{
		backgroundColor: "#222",
		flex: 1,
		width: 10,
		height: 200,
	},
	topBar:{
		//justifyContent:"flex-start",
		//alignItems:"center",
		//position: "relative",
		backgroundColor: "#777",
		flex: 1,
		//height: 1000,
	},
	bottomBar:{
		//justifyContent:"flex-end",
		//position: "relative",
		backgroundColor: "#777",
		flex: 1,
		//height: 200,
	},
	taskBar: {
		//flex: 1,
		width: 400,
		height: 200,
		backgroundColor: "#555",
		//position: "relative",
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
		top: 20,
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
		//alignSelf: "center",
		flex: 1,
		backgroundColor: "#999",
		//position: "absolute",
	},
	musicButton: {
		alignSelf: "center",
		flex: 1,
	},
	exitButton: {
		position: "absolute",
		//flex: 1,
		width:100,
		height:100,
		backgroundColor: "#222",
		alignSelf: "flex-start",
	},
})

export default FocusScreen4;