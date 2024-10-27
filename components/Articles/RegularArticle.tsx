import {
	Button,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Dimensions,
} from "react-native";

import React, { useLayoutEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

import * as WebBrowser from "expo-web-browser";

import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function RegularArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const descriptionList = splitString(article.description);

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={{
					uri: article.images[0],
				}}
				style={styles.image}
			/>
			<View style={{ padding: 20 }}>
				<View style={styles.controls}>
					<View style={styles.topic}>
						<Text style={{ color: "white" }}>
							{" "}
							{article.topics[0]?.title || ""}
						</Text>
					</View>
					<Feather name="share-2" size={30} color="purple" />
				</View>
				<Text style={styles.heading}>{article.title}</Text>
				<SwiperFlatList
					// index={1}
					showPagination
					paginationStyleItem={{ width: 10, height: 10, marginTop: 20 }}
					paginationStyleItemActive={{ backgroundColor: "purple" }}
					data={descriptionList}
					renderItem={({ item: text }) => (
						<View style={styles.swiperFlatlistChild}>
							<Text style={styles.articleText}>{text}</Text>
						</View>
					)}
				/>
			</View>
			{article.url && (
				<View style={styles.readMoreButtonContainer}>
					<Button
						title="Read More"
						color={"purple"}
						onPress={openOriginalArticle}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	image: {
		height: 360,
		width: "100%",
	},
	container: {
		width: "100%",
		height: "100%",
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
		paddingTop: 10,
		lineHeight: 24,
		letterSpacing: 3,
		// backgroundColor: "teal",
	},
	topic: {
		backgroundColor: "purple",
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	swiperFlatlistChild: {
		maxHeight: 170,
		width: width - 40,
		// backgroundColor: "green",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	readMoreButtonContainer: {
		position: "absolute",
		bottom: 0,
		padding: 20,
		margin: "auto",
		alignSelf: "center",
		width: 200,
	},
});

function splitString(text: string): string[] {
	return text.split("\n").filter((item) => item !== "");
}
