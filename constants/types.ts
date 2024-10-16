type Topic = {
	_id: number;
	title: string;
	image: string;
};

type Article = {
	id: number;
	title: string;
	image: string;
	topic: string;
	text: string;
	featured: boolean;
};
