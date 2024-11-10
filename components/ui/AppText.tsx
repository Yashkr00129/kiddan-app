import {StyleSheet, Text} from "react-native";

export default function AppText({style}: { style: any }) {
	return <Text style={[styles.text, style]}></Text>
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Roboto',
	}
})