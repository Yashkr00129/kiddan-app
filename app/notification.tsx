import NotificationList from "@/components/NotificationList";
import { ScrollView, View } from "react-native";

export default function AllNotificationsScreen() {
	return (
		<View style={{ padding: 10, flex: 1 }}>
			<NotificationList disableRedirect />
		</View>
	);
}
