import {Platform, StyleSheet, Text} from "react-native";

export default function AppText({style, children}: { style: any, children: any }) {
	return <Text style={[styles.text, style]}>
		{children}
	</Text>
}

const os = Platform.OS;

const styles = StyleSheet.create({
	text: {
		// fontFamily: os === "android" ? "sans-serif" : "San Francisco",
	}
})