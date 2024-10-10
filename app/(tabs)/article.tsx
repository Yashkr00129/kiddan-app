import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Article from "@/components/Article";

export default function FeedScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Article />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
