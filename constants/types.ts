type Topic = {
	_id: number;
	title: string;
	image: string;
	__v: number;
};

type ArticleWithPopulatedTopic = {
	_id: number;
	title: string;
	images: string[];
	topics: Topic[];
	description: string;
	featured: boolean;
};

type Article = {
	_id: number;
	title: string;
	images: string[];
	topics: string[];
	description: string;
	featured: boolean;
};

type DbNotification = {
	_id: string;
	title: string;
	description: string;
	article: Article;
	__v: number;
};
