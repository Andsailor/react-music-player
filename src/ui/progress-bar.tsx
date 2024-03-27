interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentAudioTime: number;
  audioDuration: number;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProgressBar({
  audioRef,
  currentAudioTime,
  audioDuration,
  setIsPlaying,
}: ProgressBarProps) {
  const handleAudioProgressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  function formatSecondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = secondsLeft.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <label htmlFor="progress">
          {formatSecondsToMinutes(Number(currentAudioTime.toFixed(0)))}
        </label>
        <label htmlFor="progress">
          {audioRef.current &&
            formatSecondsToMinutes(Number(audioDuration.toFixed(0)))}
        </label>
      </div>
      <input
        onChange={(e) => {
          handleAudioProgressInput(e);
          if (audioRef.current) audioRef.current.play();
          setIsPlaying(true);
        }}
        max={Number(audioRef.current && audioRef.current.duration)}
        min={0}
        value={currentAudioTime}
        id="progress"
        className="w-full"
        type="range"
      />
    </div>
  );
}
