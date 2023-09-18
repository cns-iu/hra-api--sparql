import express from 'express';
import { getDatasetTechnologyNames, getOntologyTermOccurences, getTissueProviderNames, getCellTypeTermOccurences, getTissueBlocks ,getReferenceOrgans, 
    getOntologyTreeModel, getCellTypeTreeModel, getRuiLocation, getAggregateResults, getDbStatus} from './utils/api-endpoints.js';
import { forwardSparqlQuery } from './utils/forward-sparql-db.js';

const routes = express.Router();

routes.get('/technology-names',forwardSparqlQuery(getDatasetTechnologyNames));
routes.get('/provider-names', forwardSparqlQuery(getTissueProviderNames));
routes.get('/ontology-term-occurences', forwardSparqlQuery(getOntologyTermOccurences));
routes.get('/cell-type-term-occurences', forwardSparqlQuery(getCellTypeTermOccurences));
routes.get('/tissue-blocks', forwardSparqlQuery(getTissueBlocks));
routes.get('/reference-organs', forwardSparqlQuery(getReferenceOrgans));
routes.get('/ontology-tree-model', forwardSparqlQuery(getOntologyTreeModel));
routes.get('/celltype-tree-model', forwardSparqlQuery(getCellTypeTreeModel));
routes.get('/rui-location', forwardSparqlQuery(getRuiLocation));
routes.get('/aggregate-results', forwardSparqlQuery(getAggregateResults));
routes.get('/db-status', forwardSparqlQuery(getDbStatus));

export default routes;
