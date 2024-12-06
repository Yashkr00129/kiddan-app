import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ListItemSeperator() {
	return <View style={styles.seperator} />;
}

const styles = StyleSheet.create({
	seperator: {
		width: "100%",
		height: 1,
		backgroundColor: "#f5f5f5",
	},
});
