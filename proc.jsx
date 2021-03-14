import { run } from 'uebersicht'
import { dispatchFocusedProcess } from './lib/js/utils.js'

// Refresh once every 5 seconds (WebSocket does the heavy lifting).
const refreshFrequency = 5000;

const initialState = '?';

const init = dispatch => {
  const ws = new WebSocket('ws://localhost:15997');
  ws.onmessage = event => {
    setTimeout(() => {
      dispatchFocusedProcess(run, dispatch);
    }, 150);
  };
};

const command = dispatch => {
  dispatchFocusedProcess(run, dispatch);
};

const updateState = (event, previousState) => {
  if (!event.data) {
    return previousState;
  }
  
  return event.data;
};

const render = output => (
  <div>{output}</div>
);

const className = {
  top: '0px', // Absolute position (centered).
  right: 'calc(50% - 375px)',
  width: '750px', // Maximum width.
  boxSizing: 'border-box', // Text follows width with padding applied.
  padding: '7px 12px 6px 12px', // Roughly center the widget contents.
  fontFamily: 'CozetteVector', // Font family and sizing.
  fontSize: '10px',
  color: '#b6b6b6', // Text color.
  textAlign: 'center' // Center process name.
};

export { refreshFrequency, initialState, init, command, updateState, render, className };
