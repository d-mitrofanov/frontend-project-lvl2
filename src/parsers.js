import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumberInQuotes = (value) => !Number.isNaN(parseFloat(value));

const transformNumbers = (data) => {
  const result = _.mapValues(data, (value) => {
    if (_.isPlainObject(value)) {
      return transformNumbers(value);
    }
    return isNumberInQuotes(value) ? Number(value) : value;
  });
  return result;
};

const customIniParser = (data) => {
  const parsedData = ini.parse(data);
  return transformNumbers(parsedData);
};

const parsers = {
  yml: yaml.safeLoad,
  ini: customIniParser,
  json: JSON.parse,
};

export default (data, format) => {
  if (!parsers[format]) {
    throw new Error(`The format '${format}' is not supported.`);
  }
  return parsers[format](data);
};
