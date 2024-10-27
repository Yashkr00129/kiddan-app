import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Touchable,
	TouchableOpacity,
	Dimensions,
	Pressable,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function VideoArticle({
	videoSource,
	index,
	currentIndex,
}: {
	videoSource: string;
	index: number;
	currentIndex: number;
}) {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;
	const ref = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const player = useVideoPlayer(videoSource, (player: any) => {
		player.loop = true;
		if (index === currentIndex) player.play();
	});

	useEffect(() => {
		const subscription = player.addListener(
			"playingChange",
			(isPlaying: boolean) => {
				setIsPlaying(isPlaying);
			}
		);

		return () => {
			subscription.remove();
		};
	}, [player]);

	useEffect(() => {
		if (index === currentIndex) player.play();
		else player.pause();
	}, [currentIndex]);

	return (
		<Pressable
			style={{ width: "100%", height: "100%" }}
			onLongPress={() => player.pause()}
			onPressOut={() => player.play()}
		>
			<View
				style={[
					{
						width: windowWidth,
						height: windowHeight - 50,
						zIndex: 10,
						position: "absolute",
						top: 0,
						justifyContent: "center",
						alignItems: "center",
					},
					!isPlaying && {
						backgroundColor: "#0000005d",
					},
				]}
			>
				{!isPlaying && (
					<MaterialCommunityIcons name="play" size={80} color="white" />
				)}
			</View>
			<VideoView
				ref={ref}
				style={{
					width: windowWidth,
					height: windowHeight - 50,
				}}
				contentFit="cover"
				player={player}
				allowsFullscreen={false}
				allowsPictureInPicture={false}
				nativeControls={false}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	controlsContainer: {
		padding: 10,
	},
});
