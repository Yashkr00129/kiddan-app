import { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function AppLoader() {
	const animation = useRef<LottieView>(null);
	useEffect(() => {
		// You can control the ref programmatically, rather than using autoPlay
		// animation.current?.play();
	}, []);

	return (
		<View style={styles.animationContainer}>
			<LottieView
				autoPlay
				ref={animation}
				style={{
					width: 100,
					height: 100,
				}}
				// Find more Lottie files at https://lottiefiles.com/featured
				source={require("@/assets/animations/loader.json")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	buttonContainer: {
		paddingTop: 20,
	},
});
