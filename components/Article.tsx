import React from "react";
import VideoArticle from "./Articles/VideoArticle";
import ImageArticle from "./Articles/ImageArticle";
import RegularArticle from "./Articles/RegularArticle";
import { Dimensions, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Article({
	article,
	index,
	currentIndex,
}: {
	article: ArticleWithPopulatedTopic;
	index: number;
	currentIndex: number;
}) {
	const windowWidth = Dimensions.get("screen").width;
	const windowHeight = Dimensions.get("window").height;
	const bottomTabBarHeight = useBottomTabBarHeight();

	const { bottom, top } = useSafeAreaInsets();

	if (article.type === "Image Carousel")
		return <ImageArticle article={article} />;
	if (article.type == "Video Carousel")
		return (
			<VideoArticle
				videoSource={article.images[0]}
				index={index}
				currentIndex={currentIndex}
				articleUrl={article.url}
			/>
		);

	if (article.type == "Regular") return <RegularArticle article={article} />;
	if (article.type == "Image Carousel")
		return <ImageArticle article={article} />;

	return (
		<SafeAreaView
			style={{
				// height: `calc(100%) - ${bottomTabBarHeight}`,
				height: windowHeight - bottomTabBarHeight,
				// backgroundColor: "lightblue",
				// position: "relative",
				// justifyContent: "center",
				// alignItems: "center",
			}}
		>
			{/* {article.type === "Image Carousel" && <ImageArticle article={article} />}
			{article.type === "Video Carousel" && (
				<VideoArticle
					videoSource={article.images[0]}
					index={index}
					currentIndex={currentIndex}
					articleUrl={article.url}
				/>
			)} */}
			{/* {article.type === "Regular" && <RegularArticle article={article} />} */}
		</SafeAreaView>
	);
}
