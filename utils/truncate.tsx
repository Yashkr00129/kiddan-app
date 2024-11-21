function truncate(text: string, maxLength: number): string {
	const words = text.split(" ");
	const truncatedWords = [];
	let currentLength = 0;

	for (const word of words) {
		if (currentLength + word.length > maxLength) {
			break;
		}
		truncatedWords.push(word);
		currentLength += word.length + 1; // Add 1 for the space
	}

	let truncatedText = truncatedWords.join(" ");
	if (text.length > maxLength) {
		truncatedText += "...";
	}

	return truncatedText;
}

export default truncate;
