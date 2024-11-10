import {StyleSheet, Text, TouchableOpacity, View} from "react-native";


type AppButtonProps = {
	onPress: () => any
	style: any
	title: string
}

export default function AppButton({onPress, style, title}: AppButtonProps) {
	return <TouchableOpacity onPress={onPress}>
		<View style={[styles.button, style]}>
			<Text style={{color: "white"}}>{title}</Text>
		</View>
	</TouchableOpacity>

}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 15,
		backgroundColor: "purple",
		justifyContent: "center",
		alignItems: "center",
	}
})