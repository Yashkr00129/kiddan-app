import { Text, View, StyleSheet, ImageBackground } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FeaturedArticle = ({
	article,
}: {
	article: ArticleWithPopulatedTopic;
}) => {
	console.log(article);
	return (
		<ImageBackground
			blurRadius={2}
			imageStyle={{
				borderRadius: 10,
			}}
			source={{
				uri: article.images[0],
			}}
			style={{ marginRight: 10 }}
		>
			<View style={styles.container}>
				<View>
					<View
						style={{
							backgroundColor: "purple",
							padding: 5,
							paddingHorizontal: 10,
							borderRadius: 5,
						}}
					>
						<Text
							style={{
								color: "white",
							}}
						>
							{article.topics[0]?.title || ""}
						</Text>
					</View>
				</View>
				<Text style={styles.title}>{article.title}</Text>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 200,
		justifyContent: "space-between",
		alignItems: "flex-start",
		borderRadius: 10,
		padding: 10,
		paddingLeft: 12,
		backgroundColor: "#00000069",
	},
	title: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
});

export default FeaturedArticle;
