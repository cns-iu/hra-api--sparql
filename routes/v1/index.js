import express from 'express';
import { getDatasetTechnologyNames, getOntologyTermOccurences, getTissueProviderNames, getCellTypeTermOccurences, getTissueBlocks ,getReferenceOrgans } from './utils/api-endpoints.js';
import { forwardSparqlQuery } from './utils/forward-sparql-db.js';

const routes = express.Router();

routes.get('/technology-names',forwardSparqlQuery(getDatasetTechnologyNames));
routes.get('/tissue-provider-names', forwardSparqlQuery(getTissueProviderNames));
routes.get('/ontology-term-occurences', forwardSparqlQuery(getOntologyTermOccurences));
routes.get('/cell-type-term-occurences', forwardSparqlQuery(getCellTypeTermOccurences));
routes.get('/tissue-blocks', forwardSparqlQuery(getTissueBlocks));
routes.get('/reference-organs', forwardSparqlQuery(getReferenceOrgans));

export default routes;
