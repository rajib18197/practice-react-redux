import { useSelector } from "react-redux";
import VideoItem from "./videoItem";
import {
  selectAllVideos,
  selectUnWatchedVideos,
  selectWatchedVideos,
} from "./videoSelector";
import { selectFilter } from "./filterSelector";

export default function VideoList() {
  const filter = useSelector(selectFilter);
  console.log(filter);

  const videos = useSelector((state) => {
    if (filter === "all") {
        console.log(100);
        return selectAllVideos(state);
    } else if (filter === true) {
        console.log(200);
        return selectWatchedVideos(state);
    } else {
        console.log(300);
      return selectUnWatchedVideos(state);
    }
  }, {stabilityCheck: "never", noopCheck: 'never'});

  console.log("[AllVideos] renders");

  return (
    <div>
      <ul className="divide-y divide-slate-200">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </ul>
    </div>
  );
}
