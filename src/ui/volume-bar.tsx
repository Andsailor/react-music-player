import { useState } from "react";

import volumeIcon from "../assets/volume.svg";
import mutedIcon from "../assets/muted.svg";

interface VolumeBarProps {
  audioVolume: number;
  setAudioVolume: React.Dispatch<React.SetStateAction<number>>;
}

export default function VolumeBar({
  audioVolume,
  setAudioVolume,
}: VolumeBarProps) {
  const [isLabelVisible, setIsLabelVisible] = useState<boolean>(false);

  const handleVolumeControlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioVolume(Number(e.target.value));
  };

  return (
    <div className="flex gap-2 relative w-1/2">
      <img
        className="w-7 h-7"
        src={audioVolume === 0 ? mutedIcon : volumeIcon}
        alt="volume icon"
      />
      {isLabelVisible && (
        <label
          className="absolute left-10 bottom-5 font-semibold text-zinc-800"
          htmlFor="volume"
        >
          {(audioVolume * 100).toFixed(0) + "%"}
        </label>
      )}
      <input
        id="volume"
        className="w-full"
        type="range"
        value={audioVolume}
        onChange={handleVolumeControlInput}
        onMouseDown={() => setIsLabelVisible(true)}
        onMouseUp={() => setIsLabelVisible(false)}
        min={0}
        max={1.0}
        step={0.01}
      />
    </div>
  );
}
