import config from './lib/config.js'

// Refresh once every 15 seconds.
const refreshFrequency = 15000;

const initialState = {
  used: '0',
  color: '#b6b6b6'
};

const command = `${config.shell} ./yabar/lib/sh/mem.sh`;

const updateState = event => {
  return {
    used: event.output,
    color: event.output >= 80
    ? '#9e7275'
    : '#b6b6b6'
  };
};

const render = output => (
  <section>
    
    <div className='outer'>
      <div className='inner' style={{
        width: `${output.used}%`,
        backgroundColor: output.color
      }}></div>
    </div>
  </section>
);

const className = {
  top: '0px', // Absolute position.
  right: '116px',
  borderLeft: '1px solid #1c1c1c', // Black separator.
  padding: '8px 12px 6px 12px', // Roughly center the widget contents.
  fontFamily: 'CozetteVector', // Font family and sizing.
  fontSize: '10px',
  lineHeight: '10px', // Line height to keep border and centering consistent.
  color: '#b6b6b6', // Text color.
  '& .outer': {
    display: 'inline-block', // Display the outer box in-line rather than below.
    boxSizing: 'border-box', // Include the padding and border in the total width/height of the outer box.
    marginLeft: '8px', // Spacing between the outer box and the text.
    width: '20px', // Static width and height of the outer box.
    height: '7px',
    border: '1px solid #565656', // Thin grey border to mark outer box.
    padding: '2px', // Pad to place the inner bar directly inside.
    '& .inner': {
      height: '1px' // 1px fills the outer box without clipping.
    }
  }
};

export { refreshFrequency, initialState, command, updateState, render, className };
