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
