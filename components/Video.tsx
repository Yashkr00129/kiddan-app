import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { PixelRatio, StyleSheet, View, Button } from "react-native";

export default function VideoScreen({
	videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
}: {
	videoSource?: string;
}) {
	const ref = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const player = useVideoPlayer(videoSource, (player: any) => {
		player.loop = true;
		player.play();
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

	return (
		<View style={styles.contentContainer}>
			<VideoView
				ref={ref}
				style={styles.video}
				contentFit="cover"
				player={player}
				allowsFullscreen={false}
				allowsPictureInPicture={false}
				// nativeControls={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
	video: {
		flex: 1,
	},
	controlsContainer: {
		padding: 10,
	},
});
