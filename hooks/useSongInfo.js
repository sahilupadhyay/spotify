import useSpotify from "./useSpotify";
import {useRecoilState} from "recoil";
import {currentTrackIdState} from "../atoms/Songatom";
import {useEffect, useState} from "react";

export function useSongInfo() {
  const spotifyClient = useSpotify();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async  () => {
      if (!currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyClient.getAccessToken()}`
            }
          }
        ).then(res => res.json())
      }
    }

    fetchInfo();
  }, [currentTrackId, spotifyClient]);

  return songInfo;

}