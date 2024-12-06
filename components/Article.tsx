import React, { useState } from "react";
import VideoArticle from "./Articles/VideoArticle";
import ImageArticle from "./Articles/ImageArticle";
import RegularArticle from "./Articles/RegularArticle";
import { Modal, View } from "react-native";

export default function Article({
	article,
	index,
	currentIndex,
}: {
	article: ArticleWithPopulatedTopic;
	index: number;
	currentIndex: number;
}) {
	const [] = useState(false);
	return (
		<>
			{article.type === "Image Carousel" && <ImageArticle article={article} />}
			{article.type === "Regular" && <RegularArticle article={article} />}
			{article.type === "Video Carousel" && (
				<VideoArticle
					videoSource={article.images[0]}
					index={index}
					currentIndex={currentIndex}
					articleUrl={article.url}
				/>
			)}
			{/* <Modal visible={true} animationType="fade" transparent={true}>
				<View
					style={{
						backgroundColor: "white",
						padding: 20,
						height: "10%",
						position: "absolute",
						bottom: 0,
						width: "100%",
					}}
				></View>
			</Modal> */}
		</>
	);
}
