import config from './lib/config.js'

// Refresh once every 2 minutes.
const refreshFrequency = 120000;

const initialState = {
  remaining: '100',
  charging: false,
  color: '#899d72'
};

const command = `${config.shell} ./yabar/lib/sh/bat.sh`;

const updateState = event => {
  const data = event.output.split('\n');
  const remaining = data[1];
  const charging = data[0] == 'AC';

  return {
    remaining: remaining,
    charging: charging,
    color: charging && remaining == 100
    ? '#b6b6b6'
    : remaining > 20 ? '#899d72' : '#9e7275'
  };
};

const render = output => (
  <section>
    {output.charging ? '' : ''}
    <div className='outer'>
      <div className='inner' style={{
        width: `${output.remaining}%`,
        backgroundColor: output.color
      }}></div>
    </div>
  </section>
);

const className = {
  top: '0px', // Absolute position.
  right: '0px',
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
