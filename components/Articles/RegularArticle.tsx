import {Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import React from "react";
import Feather from "@expo/vector-icons/Feather";

import * as WebBrowser from "expo-web-browser";

import {SwiperFlatList} from "react-native-swiper-flatlist";

export default function RegularArticle({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const descriptionList = splitString(article.description);

	const openOriginalArticle = async () =>
		await WebBrowser.openBrowserAsync(article.url);

	const openKiddan = async () => {
		await WebBrowser.openBrowserAsync("http://kiddaan.com");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={{
					uri: article.images[0],
				}}
				style={styles.image}
			/>
			<View style={styles.brandingContainer}>
				<TouchableOpacity onPress={openKiddan}>
					<View style={styles.branding}>
						<Text style={styles.brandingText}>Kiddan</Text>
					</View>
				</TouchableOpacity>
			</View>

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
				<View style={{flexDirection: "row", gap: 10, marginVertical: 10}}>
					<Text style={{color: "purple", fontSize: 16, fontWeight: "semibold"}}>
						{new Date(article.createdAt).toDateString()}
					</Text>

					<Text style={{color: "purple", fontSize: 16, fontWeight: "semibold"}}>
						{new Date(article.createdAt).toLocaleTimeString()}
					</Text>
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
	},
	controlGroup: {
		flexDirection: "row",
		gap: 10,
	},
	heading: {
		fontSize: 20,
		fontWeight: "600",
	},
	articleText: {
		fontSize: 18,
		paddingTop: 5,
		lineHeight: 24,
		letterSpacing: 3,
		// backgroundColor: "teal",
	},
	brandingContainer: {
		position: "absolute",
		top: 350,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	branding: {
		backgroundColor: "white",
		borderColor: "purple",
		borderWidth: 1,
		padding: 5,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	brandingText: { color: "purple" },
	topic: {
		backgroundColor: "purple",
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	swiperFlatlistChild: {
		maxHeight: 175,
		width: width - 40,
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
