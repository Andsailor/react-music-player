import { useState } from "react";

import MusicPlayer from "../ui/music-player";
import SongSelect from "../ui/song-select";

import { foreverNeverland } from "../utils/data";
import Mo from "../assets/neverland.png";
import Git from "../assets/git.svg";

function App() {
  const [songIndex, setSongIndex] = useState<number>(0);

  return (
    <div className="container px-4 sm:px-0 max-w-xl m-auto">
      <div className="mt-10 relative">
        <img
          className="rounded-2xl w-full"
          src={Mo}
          alt="Forever neverland cover"
        />
        <a
          href="https://github.com/Andsailor/react-music-player"
          target="_blank"
        >
          <img
            className="absolute top-0 right-0 opacity-50 hover:opacity-100 cursor-pointer"
            src={Git}
          />
        </a>
      </div>
      <h2 className=" max-[500px]:text-xl text-2xl font-semibold mt-4 text-zinc-200">
        {foreverNeverland.title}
      </h2>
      <SongSelect
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        musicAlbum={foreverNeverland}
      />
      <MusicPlayer
        songIndex={songIndex}
        setSongIndex={setSongIndex}
        musicAlbum={foreverNeverland}
      />
    </div>
  );
}

export default App;
