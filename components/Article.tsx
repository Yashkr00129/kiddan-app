import React from "react";
import VideoArticle from "./Articles/VideoArticle";
import ImageArticle from "./Articles/ImageArticle";
import RegularArticle from "./Articles/RegularArticle";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Article({
	article,
	index,
	currentIndex,
}: {
	article: ArticleWithPopulatedTopic;
	index: number;
	currentIndex: number;
}) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	const { bottom, top } = useSafeAreaInsets();

	return (
		<View
			style={{
				width: windowWidth,
				height: windowHeight - bottom - top,
				maxHeight: windowHeight - bottom - top,
				flex: 1,
				position: "relative",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{article.type === "Image Carousel" && <ImageArticle article={article} />}
			{article.type === "Video Carousel" && (
				<VideoArticle
					videoSource={article.images[0]}
					index={index}
					currentIndex={currentIndex}
					articleUrl={article.url}
				/>
			)}
			{article.type === "Regular" && <RegularArticle article={article} />}
		</View>
	);
}
