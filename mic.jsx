import { run } from 'uebersicht';
import { clickEffect } from './lib/js/utils.js';

// Refresh once every 60 seconds (includes refresh after change as well).
const refreshFrequency = 60000;

const initialState = false;

const command = "osascript -e 'get input volume of (get volume settings)'";

const updateState = event => {
  return event.output.trim() === '0';
};

const render = output => {
  const onClick = e => {
    clickEffect(e);
    run(`osascript -e 'set volume input volume ${output ? '50' : '0'}'`);
    run(`osascript -e 'tell application id "tracesOf.Uebersicht" to refresh widget id "yabar-mic-jsx"'`);
  };

  return (
    <section onClick={onClick}>
      {output ? '' : ''}
      <div className='outer'>
        <div className='inner' style={{width: `${output ? '100' : '0'}%`}}></div>
      </div>
    </section>
  );
};

const className = {
  top: '0px', // Absolute position.
  right: '174px',
  borderLeft: '1px solid #1c1c1c', // Black separator.
  padding: '7px 12px 6px 12px', // Roughly center the widget contents.
  fontFamily: 'CozetteVector', // Font family and sizing.
  fontSize: '12px',
  lineHeight: '10px', // Line height to keep border and centering consistent.
  color: '#b6b6b6', // Text color.
  '& .outer': {
    display: 'inline-block', // Display the outer box in-line rather than below.
    boxSizing: 'border-box', // Include the padding and border in the total width/height of the outer box.
    marginLeft: '8px', // Spacing between the outer box and the text.
    width: '7px', // Static width and height of the outer box.
    height: '7px',
    border: '1px solid #565656', // Thin grey border to mark outer box.
    padding: '1px', // Pad to place the inner bar directly inside.
    '& .inner': {
      height: '3px', // 3px fills the outer box without clipping.
      backgroundColor: '#b6b6b6' // Inner box color.
    }
  }
};

export { refreshFrequency, initialState, command, updateState, render, className };
