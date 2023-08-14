import express from 'express';
import { getDatasetTechnologyNames, getOntologyTermOccurences, getTissueProviderNames } from './api-endpoints.js';
import {queryParametersToFilter} from './parse-filter.js'

export function forwardSparqlQuery(method) {
  return async (req, res) => {
    try {
      const {query} = req;
      const filter = queryParametersToFilter(query);
      console.log(filter)
      const result = await method(filter.minAge, filter.maxAge, filter.ontologyTerms, filter.sex);
      res.json(result);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };
}
