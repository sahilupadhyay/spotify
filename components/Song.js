import React from 'react';

function Song({order, track}) {

  const spotifyClient = useSpotify();
  return (
    <div>
      <div>
        <p>{order + 1}</p>
        src={track.track}
      </div>
    </div>
  );
}

export default Song;