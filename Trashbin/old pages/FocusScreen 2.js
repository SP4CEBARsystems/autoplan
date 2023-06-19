import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View , Text, TouchableOpacity} from 'react-native';

function MainTimer() {
	const [str, setStr] = useState("00:00");
	console.log(str)
	console.log("timing")
	var ms=new Date(Date.now())
	var H=ms.getHours()
	var M=ms.getMinutes()
	var S=ms.getSeconds()
	setStr(H.toString()+":"+M.toString()+":"+S.toString());
	return str
	var A=1500-(ms.getMilliseconds()+500)%1000
	//console.log(A)
}

function FocusScreen(props) {
	var str = "00:00"
	//setTimeout(FocusScreen, 1000)
	return (<View 
			style={styles.background}
		>
			<TouchableOpacity onPress={MainTimer()}>
				<Text 
					style={styles.textStyle}
				>
					{str}
				</Text>
			</TouchableOpacity>
		</View>)
	//return RefreshGui(str)
	//return means that we're done
	
	//for (var i = 0; i< 4; i++){
	//	var str="00:01"
	//	console.log("Hi3")
	//}
}

function RefreshGui(str) {
	//var str = "00:00";
	console.log(str)
	return (
		<View 
			style={styles.background}
		>
			<TouchableOpacity onPress={MainTimer()}>
				<Text 
					style={styles.textStyle}
				>
					{str}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textStyle:{
		fontSize: 100,
	}
})

export default FocusScreen;