import React from 'react';
import useSpotify from "@/hooks/useSpotify";
import {millisToMinutesAndSecond} from "@/helpers/millisToMinutesAndSecond";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentTrackIdState, isPlayingState} from "@/atoms/Songatom";

function Song({order, track}) {
  const spotifyClient = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyClient.play({
      uris: [track.track.uri]
    })
  }

  return (
    <div
      className={`grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer`}
      onClick={playSong}
    >
      <div className={`flex items-center space-x-4`}>
        <p>{order + 1}</p>

        <img className={`h-10 w-10`} src={track?.track?.album?.images[0]?.url} alt=""/>

        <div>
          <p className={`w-36 lg:w-64 text-white truncate`}>{track?.track?.name}</p>
          <p className={`w-40`}>{track?.track?.artists[0].name}</p>
        </div>
      </div>

        <div className={`flex items-center justify-between ml-auto md:ml-0`}>
          <p className={`w-40 hidden md:inline`}>{track?.track?.album?.name || 'Title not available'}</p>
          <p>{millisToMinutesAndSecond(track?.track.duration_ms)}</p>
        </div>
    </div>
  );
}

export default Song;