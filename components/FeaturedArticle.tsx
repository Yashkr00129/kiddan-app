import { Text, View, StyleSheet, ImageBackground } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FeaturedArticle = () => {
	return (
		<ImageBackground
			blurRadius={10}
			imageStyle={{
				borderRadius: 10,
			}}
			source={{
				uri: "https://images.unsplash.com/photo-1719937206168-f4c829152b91?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			}}
			style={styles.container}
		>
			<View>
				<View
					style={{
						backgroundColor: "black",
						padding: 5,
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
	},
	title: {
		color: "white",
		fontSize: 15,
		fontWeight: "700",
	},
});

export default FeaturedArticle;
