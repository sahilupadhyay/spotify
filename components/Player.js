import React, {useState} from 'react';
import useSpotify from "@/hooks/useSpotify";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "@/atoms/Songatom";
import {useSongInfo} from "@/hooks/useSongInfo";

function Player(props) {
  const spotifyClient =  useSpotify();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();


  return (
    <div>
      <div>
        <img className={`hidden md:inline h-10 w-10`} src={songInfo.album.images?.[0]?.url} alt=""/>
      </div>
    </div>
  );
}

export default Player;