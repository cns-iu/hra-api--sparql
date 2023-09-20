import express from 'express';
import {
  getAggregateResults,
  getCellTypeTermOccurences,
  getCellTypeTreeModel,
  getDatasetTechnologyNames,
  getDbStatus,
  getHuBMAPRuiLocation,
  getOntologyTermOccurences,
  getOntologyTreeModel,
  getReferenceOrgans,
  getRuiLocation,
  getTissueBlocks,
  getTissueProviderNames,
} from './utils/api-endpoints.js';
import { forwardSparqlQuery } from './utils/forward-sparql-db.js';

const routes = express.Router();

routes.get('/technology-names', forwardSparqlQuery(getDatasetTechnologyNames));
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
routes.get('/hubmap/rui_locations.jsonld', forwardSparqlQuery(getHuBMAPRuiLocation));

export default routes;
