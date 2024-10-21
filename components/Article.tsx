import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import PagerView from "react-native-pager-view";

export default function Article({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Image
					source={{
						uri: article.images[0],
					}}
					style={styles.image}
				/>
				<View style={{ padding: 20 }}>
					<View style={styles.controls}>
						<View style={styles.topic}>
							<Text style={{ color: "white" }}>{article.topics[0].title}</Text>
						</View>
						<Feather name="share-2" size={30} color="purple" />
					</View>
					<Text style={styles.heading}>{article.title}</Text>
					<Text style={styles.articleText}>{article.description}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 360,
		width: "100%",
	},
	container: {
		flex: 1,
	},
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 20,
	},
	controlGroup: {
		flexDirection: "row",
		gap: 10,
	},
	heading: {
		fontSize: 22,
		fontWeight: "500",
	},
	articleText: {
		fontSize: 20,
		textAlign: "left",
		paddingTop: 10,
		lineHeight: 24,
	},
	topic: {
		backgroundColor: "purple",
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
});
