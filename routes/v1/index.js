import express from 'express';
import { getDatasetTechnologyNames, getOntologyTermOccurences, getTissueProviderNames } from './utils/api-endpoints.js';
import { forwardSparqlQuery } from './utils/forward-sparql-db.js';
const routes = express.Router();
/*
routes.get('/technology-names', async (_req, res) => res.json(await getDatasetTechnologyNames()));
routes.get('/tissue-provider-names', async (_req, res) => res.json(await getTissueProviderNames()));
routes.get('/ontology-term-occurences', async (_req, res) => res.json(await getOntologyTermOccurences()));
*/
const handleOntologyTermOccurences = forwardSparqlQuery(getDatasetTechnologyNames)
routes.get('/technology-names',handleOntologyTermOccurences);
routes.get('/tissue-provider-names', async (_req, res) => res.json(await getTissueProviderNames()));
routes.get('/ontology-term-occurences', forwardSparqlQuery(getOntologyTermOccurences));
export default routes;
