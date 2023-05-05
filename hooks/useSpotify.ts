import React, {useEffect} from 'react';
import {signIn, useSession} from "next-auth/react";
import {spotifyApi} from '@/lib/spotify';

function useSpotify() {
  const { data : session, status}: { data: any; status: string } = useSession();

  useEffect(() => {
    if(session) {
      console.log(session);
      if(session?.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session?.user.accessToken)
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;