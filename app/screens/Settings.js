import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View , Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Button, TextInput} from 'react-native';

const Settings = ({ navigation }) => {
    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.headerText}>
                        Settings
                    </Text>
                    <Text style={styles.scrollText}>
                        There are no settings yet.
                    </Text>
                    <Text style={styles.headerText}>
                        Support
                    </Text>
                    <Text style={styles.scrollText}>
                        If you encounter any problems, or you want to give feedback, please send an e-mail to "plannedout2@gmail.com".
                    </Text>
                    <Text style={styles.headerText}>
                        About me
                    </Text>
                    <Text style={styles.scrollText}>
                        I am Boaz Crezee, and this is my first app. It took a year to make. The goal of this app is that it calculates what you should do now for you to get the things done you want to get done now, next week, next year, or ever.
                    </Text>
                </ScrollView>
                <View style={styles.menuButtons}>
                    <TouchableOpacity style={styles.menuButton1} onPress={() => navigation.navigate("ToDo"    )}/>
                    <TouchableOpacity style={styles.menuButton2} onPress={() => navigation.navigate("Planning")}/>
                    <TouchableOpacity style={styles.menuButton3} onPress={() => navigation.navigate("Focus"   )}/>
                    <TouchableOpacity style={styles.menuButton3} onPress={() => navigation.navigate("Settings")}/>
                </View>
            </SafeAreaView>
        </View>
    )
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
	scrollItem2: {
		flexDirection: "row",
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
	headerText: {
		fontSize: 50,
		color: "#fff",
		textAlign: "center",
	},
	scrollText2: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 50,
	},
	scrollItemL: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "right",
		// width: 50,
	},
	scrollItemM: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 50,
	},
	scrollItemR: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "left",
		// width: 50,
	},
	dateText: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 10,
		// margin: 0,
		// padding: 0,
	},
	dateTextLong: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 20,
	},
	dateTextSeparator: {
		flex: 1,
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
		width: 5,
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
		marginLeft: 1,
		marginRight: 1,
		marginTop: 4,
		marginBottom: 4
		// width: 1
	}
})

export default Settings;