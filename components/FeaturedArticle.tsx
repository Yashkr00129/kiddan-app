import { Text, View, StyleSheet, ImageBackground } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FeaturedArticle = () => {
	return (
		<ImageBackground
			blurRadius={5}
			imageStyle={{
				borderRadius: 10,
			}}
			source={{
				uri: "https://media.nature.com/w1248/magazine-assets/d41586-024-03320-6/d41586-024-03320-6_27701526.jpg?as=webp",
			}}
			style={styles.container}
		>
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
						Social
					</Text>
				</View>
			</View>
			<Text style={styles.title}>
				How to create a college internship where students actually learn
			</Text>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 200,
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginRight: 10,
		padding: 10,
		paddingLeft: 12,
	},
	title: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
});

export default FeaturedArticle;
