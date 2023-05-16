import React, {useEffect, useState} from 'react';
import {
  BuildingLibraryIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon
} from "@heroicons/react/24/outline";
import {HeartIcon} from "@heroicons/react/24/solid";
import {useSession} from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import {useRecoilState} from "recoil";
import {playlistIDState} from "@/atoms/playlist.atom";

function Sidebar() {
  const { data: session, status} = useSession();
  const spotifyClient = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIDState);


  useEffect(() => {
    if(spotifyClient.getAccessToken()) {
      spotifyClient.getUserPlaylists()
        .then(playlist => setPlaylists(playlist?.body.items ?? []))
    }
  }, [session, spotifyClient]);

  return (
    <div className={`text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex`}>
      <div className={`space-y-4`}>
        <button className={`flex items-center space-x-2 hover:text-white`}>
          <HomeIcon className={`h-5 w-5`}/>
          <p>Home</p>
        </button>
        <button className={`flex items-center space-x-2 hover:text-white`}>
          <MagnifyingGlassIcon className={`h-5 w-5`}/>
          <p>Search</p>
        </button>
        <button className={`flex items-center space-x-2 hover:text-white`}>
          <BuildingLibraryIcon className={`h-5 w-5`}/>
          <p>Your Library</p>
        </button>
        <hr className={`border-t-[0.1px] border-gray-900`}/>

        <button className={`flex items-center space-x-2 hover:text-white`}>
          <PlusCircleIcon className={`h-5 w-5`}/>
          <p>Create Playlist</p>
        </button>
        <button className={`flex items-center text-blue-500 space-x-2 hover:text-white`}>
          <HeartIcon className={`h-5 w-5 text-blue-500`}/>
          <p>Liked Songs</p>
        </button>
        <button className={`flex items-center space-x-2 hover:text-white`}>
          <RssIcon className={`h-5 w-5 text-green-500`}/>
          <p>Your episodes</p>
        </button>
        <hr className={`border-t-[0.1px] border-gray-900`}/>

        {
          playlists.map((playlist) => (
            <p onClick={() => setPlaylistId(playlist.id)} key={playlist.id} className={`cursor-pointer hover:text-white`}>
              {playlist.name}
            </p>
          ))
        }
      </div>
    </div>
  );
}

export default Sidebar;