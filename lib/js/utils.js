import config from '../config.js'

const interpolateHue = (h1, h2, points) => {
  const delta = h2 - h1;
  const result = (delta + ((Math.abs(delta) > 180) ? ((delta < 0) ? 360 : -360) : 0)) / (points + 1.0);

  const turns = [];
  for (let i = 1; delta && i <= points; ++i) {
    turns.push(((h1 + (result * i)) + 360) % 360);
  }

  return turns;
};

const hsvToHex = (h, s, v) => {
  var i, f, p, q, t, r, g, b;
  
  // Convert HSV values.
  h /= 360;
  s /= 100;
  v /= 100;
  i = Math.floor(h * 6);
  f = (h * 6) - i;
  p = v * (1 - s);
  q = v * (1 - (f * s));
  t = v * (1 - ((1 - f) * s));

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;
    case 1:
      r = q, g = v, b = p;
      break;
    case 2:
      r = p, g = v, b = t;
      break;
    case 3:
      r = p, g = q, b = v;
      break;
    case 4:
      r = t, g = p, b = v;
      break;
    case 5:
      r = v, g = p, b = q;
      break;
  }

  // Return the calculated RGB values in HEX format (e.g. #FFFFFF).
  return "#" + ((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1);
};

const getDayProgress = () => {
  const [dayStart, dayEnd] = [new Date(), new Date()];
  dayStart.setHours(0, 0, 0);
  dayEnd.setHours(0, 0, 0);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const range = dayEnd - dayStart;
  const diff = Math.max(0, dayEnd - new Date());
  const progress = Math.floor((100 - (100 * diff) / range));
  return progress == 100 ? 99 : progress;
};

const clickEffect = (e) => {
  const { body } = document
  const { clientX: x, clientY: y } = e
  const color = '255';
  const cursor = document.createElement('div')
  Object.assign(cursor.style, {
    position: 'absolute',
    top: `${y - 20 / 2}px`,
    left: `${x - 20 / 2}px`,
    width: `20px`,
    height: `20px`,
    backgroundColor: `rgba(${color}, ${color}, ${color}, 0.3)`,
    borderRadius: '50%',
    zIndex: 2147483647,
    opacity: 1,
    transform: 'scale(0)',
    pointerEvents: 'none',
    touchAction: 'none',
    transition: `transform 320 ease`
  })
  if (cursor && 'animate' in cursor) {
    body.appendChild(cursor)
    cursor.animate(
      [
        { opacity: 0, transform: 'scale(0)' },
        { opacity: 1, transform: 'scale(2)' },
        { opacity: 0, transform: 'scale(1.6)' }
      ],
      { duration: 320 }
    )
  }
  setTimeout(() => cursor && body.removeChild(cursor), 320)
};

const dispatchFocusedProcess = (run, dispatch) => {
  run(`${config.shell} -c '/usr/local/bin/yabai -m query --windows --space'`)
  .then(output => {
    const data = JSON.parse(output);
    data.forEach(process => {
      if (process.focused) {
        dispatch({type: 'SPACES', data: process.app});
      }
    });
  });
};

const getSpaceName = index => {
  switch (index) {
    case 1:
      return '';
      break;
    case 2:
      return '';
      break;
    case 3:
      return '';
      break;
    case 4:
      return '';
      break;
    default:
      return index;
  }
};

const dispatchSpaces = (run, dispatch, data) => {
  let spaces = [];
    
  data['Spaces'].forEach((space, i) => {
    spaces.push({
      index: i + 1,
      name: getSpaceName(i + 1),
      focused: space.ManagedSpaceID == data['Current Space'].ManagedSpaceID
    });
  });

  dispatch({type: 'SPACES', data: spaces});
};

const focusSpace = (run, index) => {
  run(`${config.shell} -c '/usr/local/bin/yabai -m space --focus ${index}'`);
};

export { interpolateHue, hsvToHex, getDayProgress, clickEffect, dispatchFocusedProcess, dispatchSpaces, focusSpace };
