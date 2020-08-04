import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumberInQuotes = (value) => !_.isBoolean(value) && parseFloat(value);

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

const parse = (data, fileFormat) => {
  const parsers = {
    yml: yaml.safeLoad,
    ini: customIniParser,
    json: JSON.parse,
  };
  if (!parsers[fileFormat]) {
    throw new Error('Please use supported format.');
  }
  return parsers[fileFormat](data);
};

export default parse;
