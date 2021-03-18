import { run } from 'uebersicht';
import { clickEffect } from './lib/js/utils.js';

// Refresh once every 10 seconds (mainly due to DND being garbage on Big Sur).
const refreshFrequency = 10000;

const initialState = false;

// Currently using calm-notifications (https://github.com/vitorgalvao/tiny-scripts).
const command = 'calm-notifications status';

const updateState = (event, previousState) => {
  if (!event.output) {
    return previousState;
  }

  return event.output.trim() === 'on';
};

const render = output => {
  const onClick = e => {
    clickEffect(e);
    run(`calm-notifications ${output ? 'off' : 'on'}`);
  };

  return (
    <section onClick={onClick}>
      {output ? '' : ''}
      <div className='outer'>
        <div className='inner' style={{width: `${output ? '100' : '0'}%`}}></div>
      </div>
    </section>
  );
};

const className = {
  top: '0px', // Absolute position.
  right: '219px',
  borderLeft: '1px solid #1c1c1c', // Black separator.
  padding: '6px 12px 6px 12px', // Roughly center the widget contents.
  fontFamily: 'CozetteVector', // Font family and sizing.
  fontSize: '13px',
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
