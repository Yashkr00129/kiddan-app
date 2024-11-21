import React from "react";
import VideoArticle from "./Articles/VideoArticle";
import ImageArticle from "./Articles/ImageArticle";
import RegularArticle from "./Articles/RegularArticle";

export default function Article({
	article,
	index,
	currentIndex,
}: {
	article: ArticleWithPopulatedTopic;
	index: number;
	currentIndex: number;
}) {
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
}
