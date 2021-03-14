import { run } from 'uebersicht'
import { clickEffect } from './lib/js/utils.js'
import config from './lib/config.js'

// Refresh once every 30 seconds.
const refreshFrequency = 30000;

const initialState = {
  running: false,
  state: 'paused',
  track: '',
  artist: ''
};

const command = `${config.shell} ./yabar/lib/sh/spotify.sh`;

const updateState = event => {
  const data = JSON.parse(event.output);
  return {
    running: data.running == 'true',
    state: data.state == 'playing',
    track: data.track,
    artist: data.artist
  };
};

const render = output => {
  const onClick = e => {
    clickEffect(e);

    run(output.running ? `osascript -e 'tell application "Spotify" to ${output.state ? 'pause' : 'play'}'` : 'open -a Spotify');
    run(`osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "yabar-spotify-jsx"'`);
  };

  return (
    <section onClick={onClick}>
      {output.running ? (output.state ? ' ' : ' ') : ' '}
      {output.running ? `${output.artist} - ${output.track}` : 'N/A'}
    </section>
  );
};

const className = {
  top: '0px', // Absolute position.
  right: '489px',
  borderLeft: '1px solid #1c1c1c', // Black separator.
  padding: '8px 12px 6px 12px', // Roughly center the widget contents.
  fontFamily: 'CozetteVector', // Font family and sizing.
  fontSize: '10px',
  lineHeight: '10px', // Line height to keep border and centering consistent.
  color: '#b6b6b6' // Text color.
};

export { refreshFrequency, initialState, command, updateState, render, className };
