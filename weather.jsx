import { getDayProgress } from './lib/js/utils.js';

// Refresh once every 15 minutes.
const refreshFrequency = 900000;

const initialState = {
  tempC: '?',
  precipChance: '0'
};

const command = dispatch => {
  // https://wttr.in JSON format.
  fetch('https://wttr.in/?format=j1')
  .then(response => response.json())
  .then(data => {
    dispatch({
      type: 'WEATHER',
      data: data
    });
  })
  .catch(error => {
    console.error(error.message);
  });
};

const updateState = (event, previousState) => {
  if (!event.data) {
    return previousState;
  }

  // wttr.in offers a forecast with 8 sections throughout the day, use the nearest one.
  const hourlyIndex = Math.round(getDayProgress() * 8 / 100) - 1;
  const weather = event.data.weather[0].hourly[hourlyIndex == -1 ? 0 : hourlyIndex];
  return {
    tempC: weather.tempC,
    precipChance: weather.chanceofrain
  };
};

const render = output => (
  <section>
    &nbsp;&nbsp;{output.tempC}°
    <div className='outer'>
      <div className='inner' style={{width: `${output.precipChance}%`}}></div>
    </div>
  </section>
);

const className = {
  top: '0px', // Absolute position.
  right: '409px',
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
      height: '1px', // 1px fills the outer box without clipping.
      backgroundColor: '#72869d' // Blue for rain!
    }
  }
};

export { refreshFrequency, initialState, command, updateState, render, className };
