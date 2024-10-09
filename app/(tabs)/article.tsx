import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function Article() {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={{
					uri: "https://plus.unsplash.com/premium_photo-1666855824562-26a49abf15a0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				}}
				style={styles.image}
			/>
			<View style={styles.controls}>
				<View style={styles.topic}>
					<Text>Tech</Text>
				</View>
				<View style={styles.controlGroup}>
					<Feather name="bookmark" size={24} color="black" />
					<Feather name="share-2" size={24} color="black" />
				</View>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.heading}>
					Big setback': Why India's Congress lost out to Modi in key state
					election
				</Text>
				<Text style={styles.articleText}>
					New Delhi, India - Four months after losing its majority in parliament
					for the first time in a decade, Prime Minister Narendra Modi's
					Bharatiya Janata Party (BJP) secured a record third term in the
					northern state of Haryana and scored its best ever performance in
					Indian-administered Kashmir, marking a dramatic turnaround. The
					results of the two northern states' assembly elections announced on
					Tuesday also represent a significant setback for the opposition
					Congress party's bid to end the BJP's dominance over electoral
					politics in India since 2014, political analysts told Al Jazeera on
					Wednesday.
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 300,
		width: "100%",
	},
	container: {
		flex: 1,
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 12,
	},
	controlGroup: {
		flexDirection: "row",
		gap: 10,
	},
	textContainer: {
		padding: 10,
	},
	heading: {
		fontSize: 28,
		fontWeight: "bold",
	},
	articleText: {
		fontSize: 17,
	},
	topic: {
		backgroundColor: "lightblue",
		padding: 5,
		borderRadius: 5,
	},
});
