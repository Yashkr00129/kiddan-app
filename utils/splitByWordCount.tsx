export function splitByWordCount(text: string, maxWords: number): string[] {
	const words = text.split(" ");
	const splitText: string[] = [];
	let currentChunk: string[] = [];

	for (const word of words) {
		if (currentChunk.length < maxWords) {
			currentChunk.push(word);
		} else {
			splitText.push(currentChunk.join(" "));
			currentChunk = [word];
		}
	}

	if (currentChunk.length > 0) {
		splitText.push(currentChunk.join(" "));
	}

	return splitText;
}

export function splitByCharacterCount(
	text: string,
	maxCharacters: number
): string[] {
	const words = text.split(" ");
	const splitText: string[] = [];
	let currentChunk: string[] = [];

	for (const word of words) {
		if (currentChunk.join(" ").length < maxCharacters) {
			currentChunk.push(word);
		} else {
			splitText.push(currentChunk.join(" "));
			currentChunk = [word];
		}
	}

	return splitText;
}
