import yaml from 'js-yaml';
import ini from 'ini';

const chooseParser = (fileFormat, data) => {
  let parser;
  switch (fileFormat) {
    case '.yml':
      parser = yaml.safeLoad;
      break;

    case '.ini':
      parser = ini.parse;
      break;

    default:
      parser = JSON.parse;
      break;
  }

  return parser(data);
};

export default chooseParser;
