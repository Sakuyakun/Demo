const convertDuration = time => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  minutes = String(minutes).length < 2 ? String(minutes).padStart(2,'0'): minutes;
  seconds = String(seconds).length < 2 ? String(seconds).padStart(2,'0'): seconds;
  return minutes + ":" + seconds;
}

export default convertDuration
