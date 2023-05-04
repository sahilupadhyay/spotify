const SpotifyWebApi = require('spotify-web-api-node');

const scopes: string = [
  'user-read-email',
  "playlist-read-private",
  "playlist-read-collaborative",
  // "playlist-modify-private",
  // "playlist-modify-public",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-top-read",
  "user-read-recently-played",
].join(',');

const params: {scope: string} = {
  scope: scopes
}

const queryParamString: URLSearchParams = new URLSearchParams(params);

export const LOGIN_URL: string = `https //accounts.spotify.com/authorize?${queryParamString.toString()}`

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECERT,
});
