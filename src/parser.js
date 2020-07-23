import yaml from 'js-yaml';

const chooseParser = (fileFormat, data) => {
  let parser;
  switch (fileFormat) {
    case '.yml':
      parser = yaml.safeLoad;
      break;

    default:
      parser = JSON.parse;
      break;
  }

  return parser(data);
};

export default chooseParser;
