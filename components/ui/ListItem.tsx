import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

type ListItemProps = {
	title: string;
	subTitle?: string;
	image?: any;
	onPress: () => any;
	renderRightActions?: () => any;
	IconComponent?: React.ReactNode;
};

export default function ListItem({
	title,
	subTitle,
	image,
	onPress,
	renderRightActions,
	IconComponent,
}: ListItemProps) {
	return (
		<Swipeable renderRightActions={renderRightActions}>
			<TouchableHighlight onPress={onPress} underlayColor={"#f5f5f5"}>
				<View style={styles.container}>
					{IconComponent}
					{image && <Image style={styles.image} source={image} />}
					<View style={styles.detailsContainer}>
						<Text style={styles.title} numberOfLines={1}>
							{title}
						</Text>
						{subTitle && (
							<Text style={styles.subTitle} numberOfLines={2}>
								{subTitle}
							</Text>
						)}
					</View>
					<MaterialCommunityIcons
						name="chevron-right"
						color={"purple"}
						size={25}
					/>
				</View>
			</TouchableHighlight>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 15,
		backgroundColor: "white",
		alignItems: "center",
	},
	detailsContainer: {
		marginLeft: 10,
		justifyContent: "center",
		flex: 1,
	},
	image: {
		width: 45,
		height: 45,
		borderRadius: 35,
	},
	subTitle: {
		color: "#11181C",
		fontSize: 14,
	},
	title: {
		fontWeight: "500",
	},
});
