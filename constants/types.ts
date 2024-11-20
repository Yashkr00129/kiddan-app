type Topic = {
	_id: number;
	title: string;
	image: string;
	__v: number;
};

type ArticleWithPopulatedTopic = {
	_id: string;
	title: string;
	images: string[];
	thumbnail: string;
	topics: Topic[];
	description: string;
	contents: string[];
	featured: boolean;
	type: "Regular" | "Image Carousel" | "Video Carousel";
	url: string;
	createdAt: string;
	updatedAt: string;
};

type Article = {
	_id: number;
	title: string;
	images: string[];
	topics: string[];
	description: string;
	url: string;
	featured: boolean;
};

type DbNotification = {
	_id: string;
	title: string;
	description: string;
	article: Article;
	__v: number;
};
