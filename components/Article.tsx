import {
	Button,
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
import ImageArticle from "./Articles/ImageArticle";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import RegularArticle from "./Articles/RegularArticle";

export default function Article({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) {
	const descriptionList = splitString(article.description, 400);

	if (article.type === "Image Carousel")
		return <ImageArticle article={article} />;

	if (article.type === "Video Carousel")
		return <VideoScreen videoSource={article.images[0]} />;
	return <RegularArticle article={article} />;
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
	readMoreButtonContainer: {
		position: "absolute",
		bottom: 0,
		padding: 20,
		margin: "auto",
		alignSelf: "center",
		width: 200,
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
