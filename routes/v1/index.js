import express from 'express';
import { getDatasetTechnologyNames, getTissueProviderNames } from './utils/api-endpoints.js';

const routes = express.Router();

routes.get('/technology-names', getDatasetTechnologyNames);
routes.get('/tissue-provider-names', getTissueProviderNames);
// routes.get('/ontology-term-occurences', getOntologyTermOccurences);

export default routes;
