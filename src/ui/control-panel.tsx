import type { IMusicAlbum } from "../utils/declarations";

import forwardIcon from "../assets/forward.svg";
import playIcon from "../assets/play.svg";
import pauseIcon from "../assets/pause.svg";

interface ControlPanelProps {
  isPlaying: boolean;
  songIndex: number;
  musicAlbum: IMusicAlbum;
  audioRef: React.RefObject<HTMLAudioElement>;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ControlPanel({
  songIndex,
  musicAlbum,
  audioRef,
  setSongIndex,
  setIsPlaying,
  isPlaying,
}: ControlPanelProps) {
  const controlMusicPlayer = (type: string) => {
    if (audioRef.current) {
      switch (type) {
        case "toggle":
          setIsPlaying(!isPlaying);
          isPlaying ? audioRef.current.pause() : audioRef.current.play();
          break;
        case "next":
          audioRef.current.pause();
          songIndex === musicAlbum.songs.length - 1
            ? setSongIndex(0)
            : setSongIndex((songIndex) => songIndex + 1);
          break;
        case "previous":
          audioRef.current.pause();
          songIndex === 0
            ? setSongIndex(musicAlbum.songs.length - 1)
            : setSongIndex((songIndex) => songIndex - 1);
          break;
      }
    }
  };
  return (
    <div className=" flex justify-between max-[500px]:w-1/2 w-1/3">
      <img
        onClick={() => controlMusicPlayer("previous")}
        className="w-7 rotate-180 cursor-pointer hover:scale-110 transition-all"
        src={forwardIcon}
        alt="Previous track button"
      />
      <img
        onClick={() => controlMusicPlayer("toggle")}
        className="w-7 h-7 cursor-pointer hover:scale-110 transition-all"
        src={isPlaying ? pauseIcon : playIcon}
        alt="Play and Pause button"
      />
      <img
        onClick={() => controlMusicPlayer("next")}
        className="w-7 cursor-pointer hover:scale-110 transition-all"
        src={forwardIcon}
        alt="Next track button"
      />
    </div>
  );
}
