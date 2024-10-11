import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Topic({
	image,
	title,
}: {
	image: string;
	title: string;
}) {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: image,
				}}
				style={styles.image}
			/>
			<Text>{title}</Text>
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
