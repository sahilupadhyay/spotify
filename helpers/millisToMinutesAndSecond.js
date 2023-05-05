export function millisToMinutesAndSecond(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = parseInt(((duration % 60000) / 1000).toFixed(0));

  return seconds === 60
    ? minutes + 1 + ":00"
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}