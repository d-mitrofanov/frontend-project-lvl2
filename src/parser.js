import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const transformNumbers = (data) => {
  const entries = Object.entries(data);
  const result = entries.reduce((acc, [key, value]) => {
    if (_.isPlainObject(value)) {
      return { ...acc, [key]: transformNumbers(value) };
    }

    if (!(typeof value === 'boolean') && Number.isInteger(Number(value))) {
      return { ...acc, [key]: Number(value) };
    }
    return { ...acc, [key]: value };
  }, {});
  return result;
};

const chooseParser = (fileFormat, data) => {
  let parser;
  switch (fileFormat) {
    case '.yml':
      parser = yaml.safeLoad;
      break;

    case '.ini':
      parser = () => {
        const parsedData = ini.parse(data);
        return transformNumbers(parsedData);
      };
      break;

    case '.json':
      parser = JSON.parse;
      break;

    default:
      break;
  }

  return parser(data);
};

export default chooseParser;
