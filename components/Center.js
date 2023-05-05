import React, {useEffect, useState} from 'react';
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {useSession} from "next-auth/react";
import {shuffle} from 'lodash';
import {useRecoilState, useRecoilValue} from "recoil";
import {playlistIdState, playlistState} from "@/atoms/playlist.atom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "@/components/Songs";


const COLORS = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]
function Center(props) {
  const { data: session} = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyClient = useSpotify();

  useEffect(() => {
    setColor(shuffle(COLORS).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyClient.getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(error => console.error(error));
  }, [spotifyClient, playlistId, setPlaylist]);

  return (
    <div className={`flex-grow`}>
      <header className={`absolute top-5 right-0`}>
        <div className={`flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-4`}>
          <img
            className={`rounded-full w-10 h-10`}
            src={session?.user.image}
            alt="user"
          />
          <h2>{session?.user.name} </h2>
          <ChevronDownIcon className={`w-5 h-5`} />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full `}>
        <img src={playlist?.images[0]?.url} className={`h-44 w-44 shadow-2xl`} alt="image"/>
        <div>
          <p>PLAYLIST</p>
          <h1 className={`text-2xl md:text-3xl xl:text-5xl font-bold`}>
            { playlist?.name }
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>

  );
}

export default Center;