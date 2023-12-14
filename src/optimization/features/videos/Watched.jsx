import { useSelector } from "react-redux";
import { selectMemoizedWatchedVideos } from "./videoSelector";
import VideoItem from "./videoItem";

export default function Watched() {
    const watchedVideos = useSelector(selectMemoizedWatchedVideos);

    console.log("[WatchedVideos] renders");

    return (
        <div>
            <ul className="divide-y divide-slate-200">
                {watchedVideos.map((video) => (
                    <VideoItem key={video.id} video={video} />
                ))}
            </ul>
        </div>
    );
}