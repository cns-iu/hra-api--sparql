const FILTER_DEFAULTS = {
  sex: undefined,
  minAge: undefined,
  maxAge: undefined,
  minBMI: undefined,
  maxBMI: undefined,
  tmc: [],
  technologies: [],
  ontologyTerms: [],
  cellTypeTerms: [],
  spatialSearches: [],
  consortiums: [],
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
  const values = ['Female', 'Male'];
  value = typeof value === 'string' ? value.toLowerCase() : value;
  return values.find((v) => v.toLowerCase() === value);
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

function parseMinMaxRange(value, min, max) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return parseRange([value?.['min'], value?.['max']], min, max);
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
          searches = values.map((_) => ({}));
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

function parseArray(value, excludeValue) {
  if (typeof value === 'string') {
    const values = value.includes(',') ? value.split(',') : [value];
    const filteredValues = values.filter(val => val !== excludeValue);
    return filteredValues.length > 0 ? filteredValues : undefined;
  }
  return Array.isArray(value) ? value : undefined;
}


function processParameter(result, key, value) {
  let minAge, maxAge, minBMI, maxBMI;
  switch (key.toLowerCase()) {
    case 'sex':
      setIfDefined(result, 'sex', parseSex(value));
      break;

    case 'agerange':
    case 'age-range':
      [minAge, maxAge] = parseRange(value, 1, 110);
      setIfDefined(result, 'minAge', minAge);
      setIfDefined(result, 'maxAge', maxAge);
      break;

    case 'age':
      [minAge, maxAge] = parseRange(value, 1, 110);
      setIfDefined(result, 'minAge', minAge);
      setIfDefined(result, 'maxAge', maxAge);
      break;

    case 'bmirange':
    case 'bmi-range':
      [minBMI, maxBMI] = parseRange(value, 13, 83);
      setIfDefined(result, 'minBMI', minBMI);
      setIfDefined(result, 'maxBMI', maxBMI);
      break;

    case 'bmi':
      [minBMI, maxBMI] = parseMinMaxRange(value, 13, 83);
      setIfDefined(result, 'minBMI', minBMI);
      setIfDefined(result, 'maxBMI', maxBMI);
      break;

    case 'spatial':
      setIfDefined(result, 'spatialSearches', parseSpatial(value));
      break;

    case 'tmc':
    case 'providers':
      setIfDefined(result, 'tmc', parseArray(value));
      break;

    case 'technologies':
      setIfDefined(result, 'technologies', parseArray(value));
      break;

    case 'ontologyterms':
    case 'ontology-terms':
      setIfDefined(result, 'ontologyTerms', parseArray(value, 'http://purl.obolibrary.org/obo/UBERON_0013702'));
      break;

    case 'celltypeterms':
    case 'cell-type-terms':
      setIfDefined(result, 'cellTypeTerms', parseArray(value, 'http://purl.obolibrary.org/obo/CL_0000000'));
      break;

    case 'consortiums':
      setIfDefined(result, 'consortiums', parseArray(value));
      break;
  }
}

export function queryParametersToFilter(query) {
  const result = { ...FILTER_DEFAULTS };

  for (const key in query) {
    processParameter(result, key, query[key]);
  }

  return result;
}
