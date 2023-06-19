import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, TouchableOpacity} from 'react-native';

const DispUpdate = (props) => {
  const [str, setStr] = useState(true);

   useEffect(() => {
	 var ms=new Date(Date.now())
	 var A=1500-(ms.getMilliseconds()+500)%1000
	 //console.log(A)
     const trigger = setInterval(() => {
       setStr(ms.getHours().toString()+":"+ms.getMinutes().toString()+":"+ms.getSeconds().toString());
     }, A);

    return () => clearInterval(trigger);
  })
  return <Text style={styles.textStyle} >{str}</Text>;
}

const FocusScreen = () => {
  return (
		<View 
			style={styles.background}
		>
			<DispUpdate/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
	},
	textStyle:{
		fontSize: 90,
		color: "#fff",
	}
})

export default FocusScreen;