import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Topic() {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				}}
				style={styles.image}
			/>
			<Text>Laptop</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginRight: 10,
	},
	image: {
		height: 90,
		width: 90,
		borderRadius: 100,
	},
});
