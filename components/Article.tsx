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
import VideoScreen from "./Video";

export default function Article({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const descriptionList = splitString(article.description, 400);

	if (article.type === "Video Carousel") return <VideoScreen />;
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
							<Text style={{ color: "white" }}>
								{" "}
								{article.topics[0]?.title || ""}
							</Text>
						</View>
						<Feather name="share-2" size={30} color="purple" />
					</View>
					<Text style={styles.heading}>{article.title}</Text>
					<PagerView initialPage={0} style={{ height: 250 }}>
						{descriptionList.map((text, index) => (
							<View key={index}>
								<Text style={styles.articleText}>{text}</Text>
							</View>
						))}
					</PagerView>
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

function splitString(text: string, chunkSize: number): string[] {
	// Split by both spaces and newlines
	const lines = text.split("\n");
	const chunks: string[] = [];
	let currentChunk = "";

	for (const line of lines) {
		// If this is not the first line and adding \n + line would exceed chunk size
		if (currentChunk && currentChunk.length + 1 + line.length > chunkSize) {
			chunks.push(currentChunk.trim());
			currentChunk = line;
		} else {
			// Add newline before line if it's not the first line in chunk
			if (currentChunk) currentChunk += "\n";
			currentChunk += line;
		}

		// Process words within the current line
		const words = line.split(" ");
		let lineChunk = "";

		for (const word of words) {
			if (lineChunk && lineChunk.length + 1 + word.length > chunkSize) {
				chunks.push(lineChunk.trim());
				lineChunk = word;
			} else {
				if (lineChunk) lineChunk += " ";
				lineChunk += word;
			}
		}

		if (lineChunk) {
			chunks.push(lineChunk.trim());
		}
	}

	// Push the last chunk if there's anything left
	if (currentChunk) {
		chunks.push(currentChunk.trim());
	}

	return chunks.filter((chunk) => chunk.length > 0); // Remove empty chunks
}
