import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatter = (data, format) => {
  let formatter;
  switch (format) {
    case 'stylish':
      formatter = stylish;
      break;

    case 'plain':
      formatter = plain;
      break;

    default:
      formatter = stylish;
      break;
  }

  return formatter(data);
};

export default chooseFormatter;
