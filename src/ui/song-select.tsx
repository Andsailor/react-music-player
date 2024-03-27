import type { IMusicAlbum } from "../utils/declarations";

interface SongSelectProps {
  musicAlbum: IMusicAlbum;
  songIndex: number;
  setSongIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SongSelect({
  setSongIndex,
  musicAlbum,
  songIndex,
}: SongSelectProps) {
  return (
    <select
      onChange={(e) => setSongIndex(Number(e.target.value))}
      className="bg-transparent text-lg font-semibold text-zinc-700 cursor-pointer mb-7 sm:mb-0"
    >
      <option className="bg-purple-200">
        {musicAlbum.songs[songIndex].name}
      </option>
      {musicAlbum.songs.map((item, i) => {
        if (item.name === musicAlbum.songs[songIndex].name) {
          return;
        }
        return (
          <option key={i} value={i} className="bg-transparent bg-purple-200">
            {item.name}
          </option>
        );
      })}
    </select>
  );
}
