import { interpolateHue, hsvToHex, getDayProgress } from './lib/js/utils.js'

// Refresh once every 30 seconds.
const refreshFrequency = 30000;

const command = () => {};

const render = output => {
  const time = new Intl.DateTimeFormat('en-GB', {hour: 'numeric', minute: 'numeric', hour12: false}).format(Date.now());
  const date = new Intl.DateTimeFormat('en-GB', {weekday: 'short', day: '2-digit', month: 'short'}).format(Date.now());
  const progress = getDayProgress();

  return (
    <section>
      {date} @ {time}
      <div className='outer'>
        <div className='inner' style={{
          width: `${progress}%`,
          backgroundColor: hsvToHex(interpolateHue(88, 356, 100)[progress], 27.8, 62.0)
        }}></div>
      </div>
    </section>
  );
};

const className = {
  top: '0px', // Absolute position.
  right: '267px',
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

export { refreshFrequency, command, render, className };
