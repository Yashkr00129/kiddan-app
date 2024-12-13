import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import truncate from "@/utils/truncate";

const Notification = ({ notification }: { notification: DbNotification }) => {
	const router = useRouter();

	return (
		<TouchableOpacity
			onPress={() =>
				router.push(`/articles?articleId=${notification.article._id}`)
			}
		>
			<View style={styles.notificationContainer}>
				<View style={{ flex: 10 }}>
					<Text style={styles.notificationText}>
						{truncate(notification.title, 70)}
					</Text>
				</View>
				<View style={{ flex: 2 }}>
					<Image
						source={{
							uri:
								notification.article.images[0] ||
								"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
						}}
						style={{
							width: 60,
							height: 60,
							borderRadius: 10,
						}}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		paddingBottom: 50,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	heading: {
		fontSize: 20,
		fontWeight: "500",
		paddingTop: 20,
		paddingBottom: 10,
	},
	viewButton: {
		fontSize: 14,
		fontWeight: "bold",
		paddingTop: 20,
		paddingBottom: 10,
		color: "purple",
	},
	notificationContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 10,
		marginRight: 10,
		flex: 1,
		gap: 10,
	},
	notificationText: {
		fontSize: 16,
		paddingTop: 10,
	},
});

export default Notification;
