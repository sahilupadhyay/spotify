import React, {useState, useEffect, useCallback} from 'react';
import useSpotify from "@/hooks/useSpotify";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "@/atoms/Songatom";
import {useSongInfo} from "@/hooks/useSongInfo";
import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon as VolumeDownIcon
} from "@heroicons/react/24/solid";
import {SpeakerWaveIcon as VolumeUpIcon} from "@heroicons/react/24/outline/index";
import {debounce} from 'lodash';

function Player(props) {
  const spotifyClient =  useSpotify();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSongs = () => {
    if(!songInfo) {
      spotifyClient.getMyCurrentPlayingTrack()
        .then(data => {
          console.log('Now playing', setCurrentIdTrack(data.body?.item))
          setCurrentIdTrack(data.body?.item?.id)

          spotifyClient.getMyCurrentPlaybackState()
            .then(data => {
              setIsPlaying(data?.body?.is_playing)
            })
        })
    }
  }

  const debounceAdjustVolume = useCallback((volume) => {
    debounce(()=> {
      spotifyClient.setVolume(parseInt(volume)).catch(error => console.error(error));
    }, 500);
  }, [spotifyClient])

  useEffect(() => {
    if(spotifyClient.getAccessToken() && !currentTrackId) {
      fetchCurrentSongs();
      setVolume(50);
    }
  }, [currentTrackId, spotifyClient, fetchCurrentSongs])

  useEffect(() => {
    if(volume > 0 && volume <100) {
      debounceAdjustVolume(volume);
    }
  }, [volume, debounceAdjustVolume])



  const playPauseHandler = () => {
    spotifyClient.getMyCurrentPlaybackState()
      .then(data => {
        if(data?.body.is_playing) {
          spotifyClient.pause();
          setIsPlaying(false);
        } else {
          spotifyClient.play();
          setIsPlaying(true);
        }
      })
  }

  return (
    // left block
    <div className={`h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8`}>
      <div className={`flex items-center space-x-4`}>
        <img className={`hidden md:inline h-10 w-10 `} src={songInfo?.album?.images?.[0]?.url} alt=""/>
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      {/*center block*/}
      <div className={`flex items-center justify-evenly`}>
        <ArrowsRightLeftIcon className={`button`} />
        <BackwardIcon className={`button`} />
        {
          isPlaying ? (
            <PauseIcon onClick={playPauseHandler} className={`button w-10 h-10`}/>
          ) : (
            <PlayIcon onClick={playPauseHandler} className={`button w-10 h-10`}/>
          )
        }

        <ForwardIcon className={`button`} />
        <ArrowUturnLeftIcon className={`button`} />
      </div>

      {/*right block*/}
      <div className={`flex items-center space-x-3 md:space-x-4 justify-end pr-5`}>
        <VolumeDownIcon className={`button`} onClick={() => volume > 0 && setVolume(volume - 10)} />
        <input type='range' value={volume} min={0} max={100} className={`w-14 md:w-20`} onChange={e=> Number(setVolume(e.target.value))}/>
        <VolumeUpIcon className={`button`} onClick={() => volume < 100 && setVolume(volume + 10)} />
      </div>
    </div>
  );
}

export default Player;