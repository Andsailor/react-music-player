import { useEffect, useRef, useState } from "react";

import VolumeBar from "./volume-bar";
import ProgressBar from "./progress-bar";
import ControlPanel from "./control-panel";

import type { IMusicAlbum } from "../utils/declarations";
import { foreverNeverland } from "../utils/data";

interface MusicPlayerProps {
  songIndex: number;
  musicAlbum: IMusicAlbum;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function MusicPlayer({
  songIndex,
  setSongIndex,
  musicAlbum,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [audioVolume, setAudioVolume] = useState<number>(0.5);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.volume = audioVolume;
      }
    }
  }, [audioVolume, songIndex, isPlaying]);

  return (
    <>
      <div className="mt-5 flex gap-7 sm:gap-0 justify-between">
        <ControlPanel
          songIndex={songIndex}
          musicAlbum={musicAlbum}
          audioRef={audioRef}
          setSongIndex={setSongIndex}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
        />
        <VolumeBar audioVolume={audioVolume} setAudioVolume={setAudioVolume} />
      </div>
      <audio
        onEnded={() => {
          if (songIndex === musicAlbum.songs.length - 1) {
            setSongIndex(0);
            setIsPlaying(false);
          } else {
            setSongIndex((songIndex) => songIndex + 1);
          }
        }}
        onTimeUpdate={() => {
          audioRef.current && setCurrentAudioTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() =>
          audioRef.current && setAudioDuration(audioRef.current.duration)
        }
        id="audio"
        ref={audioRef}
        src={foreverNeverland.songs[songIndex].track}
      />
      <ProgressBar
        audioRef={audioRef}
        audioDuration={audioDuration}
        currentAudioTime={currentAudioTime}
        setIsPlaying={setIsPlaying}
      />
    </>
  );
}
