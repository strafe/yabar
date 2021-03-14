import { run } from 'uebersicht';
import { dispatchSpaces } from './lib/js/utils.js'

// Never refresh (WebSocket handles updates).
const refreshFrequency = false;

const initialState = [{
  index: 0,
  name: '',
  focused: false
}];

const init = dispatch => {
  const ws = new WebSocket('ws://localhost:15997');
  ws.onmessage = event => {
    dispatchSpaces(run, dispatch, JSON.parse(event.data));
  };
};

const updateState = (event, previousState) => {
    if (!event.data) {
      return previousState;
    }

    return event.data;
};

const render = output => (
  <section id="spaces">
    {output.map(space => (
      <div className="space">
        <div className="outer">
          <div className="inner" style={{width: space.focused ? '100%' : '0%'}}></div>
        </div>
        {typeof space.name === 'string' ? <span className='icon'>{space.name}</span> : <span className='number'>{space.name}</span>}
      </div>
    ))}
  </section>
);

const className = {
  top: '0px', // Absolute position.
  left: '0px',
  fontSize: '10px', // Font family and sizing.
  fontFamily: 'CaskaydiaCove Nerd Font',
  lineHeight: '20px', // Borders need to reach the bottom of the bar.
  color: '#b6b6b6', // Text color.
  '& #spaces': {
    display: 'flex', // Use flex to display spaces in a row.
    '& .space': {
      paddingLeft: '10px', // Spaces need a small gap between them.
      paddingRight: '10px',
      borderRight: '1px solid #1c1c1c', // Black separator.
      '& .outer': {
        display: 'inline-block', // Display outer box in-line with icon/text.
        boxSizing: 'border-box', // Include padding in height to keep things consistent.
        marginRight: '8px', // Space between outer box and icon/text.
        width: '7px', // Static width and height of the outer box.
        height: '7px',
        border: '1px solid #565656', // Thin grey border to mark outer box.
        marginTop: '8px', // Center spaces vertically.
        padding: '1px', // Pad to place the inner box directly inside.
        '& .inner': {
          height: '3px', // 3px fills the outer box without clipping.
          backgroundColor: '#b6b6b6' // Inner box color.
        }
      },
      '& .number': {
        fontFamily: "CozetteVector" // Use an alternative font for textual space names.
      }
    }
  }
};

export { refreshFrequency, initialState, init, updateState, render, className };
