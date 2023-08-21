//const { Filter, SpatialSearch } = require('ccf-database');
import ParsedQs from 'qs';

const FILTER_DEFAULTS = {
  sex: 'both',
  minAge: undefined,
  maxAge: undefined,
  minBMI: undefined,
  maxBMI: undefined,
  tmc: [],
  technology: [],
  ontologyTerms: [],
  cellTypeTerms: [],
  spatialSearches: []
};


function clamp(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

function setIfDefined(obj, prop, value) {
  if (value !== undefined) {
    obj[prop] = value;
  }
}

function parseSex(value) {
  const values = ['Both', 'Female', 'Male'];
  value = typeof value === 'string' ? value.toLowerCase() : value;
  return values.find(v => v.toLowerCase() === value);
}

function parseRange(value, min, max) {
  if (typeof value === 'string') {
    value = value.includes(',') ? value.split(',') : [value, value];
  }

  if (Array.isArray(value)) {
    let low = Number(value[0] || 'NaN');
    let high = Number(value[1] || 'NaN');

    if (isNaN(low) && isNaN(high)) {
      return undefined;
    }

    low = isNaN(low) ? min : low;
    high = isNaN(high) ? max : high;
    if (low > high) {
      [low, high] = [high, low];
    }

    low = clamp(low, min, max);
    high = clamp(high, min, max);
    return [low, high];
  }

  return undefined;
}

function parseAgeBMI(value) {
  if (!value ) {
    return undefined;
  }

  return parseInt(value);
}

function parseArray(value) {
  if (typeof value === 'string') {
    return value.includes(',') ? value.split(',') : [value];
  }

  return Array.isArray(value) ? value : undefined;
}

function parseSpatial(value) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  if (typeof value === 'object') {
    const numericSpatialAttributes = new Set(['x', 'y', 'z', 'radius']);
    let searches = undefined;
    for (const [key, valueOrValues] of Object.entries(value)) {
      const values = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      if (Array.isArray(values)) {
        if (!searches) {
          searches = values.map(_ => ({}));
        }
        values.forEach((val, index) => {
          if (searches && searches.length > index) {
            if (numericSpatialAttributes.has(key)) {
              val = +val;
            }
            searches[index][key] = val;
          }
        });
      }
    }
    return searches;
  }
  return undefined;
}

function processParameter(result, key, value) {
  switch (key.toLowerCase()) {
    case 'sex':
      setIfDefined(result, 'sex', parseSex(value));
      break;

    case 'age.min':
      setIfDefined(result, 'minAge', parseAgeBMI(value));
      break;

    case 'age.max':
      setIfDefined(result, 'maxAge', parseAgeBMI(value));
      break;

    case 'bmi.min':
      setIfDefined(result, 'minBMI', parseAgeBMI(value));
      break;

    case 'bmi.max':
      setIfDefined(result, 'maxBMI', parseAgeBMI(value));
      break;

    case 'spatial':
      setIfDefined(result, 'spatialSearches', parseSpatial(value));
      break;

    case 'tmc':
    case 'providers':
      setIfDefined(result, 'tmc', parseArray(value));
      break;

    case 'technologies':
      setIfDefined(result, 'technology', parseArray(value));
      break;

    case 'ontologyterms':
    case 'ontology-terms':
      setIfDefined(result, 'ontologyTerms', parseArray(value));
      break;

    case 'celltypeterms':
    case 'cell-type-terms':
      setIfDefined(result, 'cellTypeTerms', parseArray(value));
      break;
  }
}
/**
 * Run a SPARQL query and return results as an array of values
 *
 * @param {ParsedQs} query the SPARQL query as a string
 */
export function queryParametersToFilter(query) {
  /*
  const result = { ...FILTER_DEFAULTS };
  Object.entries(query).forEach(([key, value]) => processParameter(result, key, value));
  return result;*/

  const result = { ...FILTER_DEFAULTS };

  for (const key in query) {
    processParameter(result, key, query[key]);
  }

  return result;
}

