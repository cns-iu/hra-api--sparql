import express from "express";
import {
  getAggregateResults,
  getCellTypeTermOccurences,
  getCellTypeTreeModel,
  getDatasetTechnologyNames,
  getDbStatus,
  getHubmapRuiLocations,
  getOntologyTermOccurences,
  getOntologyTreeModel,
  getReferenceOrgans,
  getRuiLocations,
  getTissueBlocks,
  getTissueProviderNames,
  getGtexRuiLocations,
  getReferenceOrganScene,
  getScene,
  getBiomarkerTreeModel,
  getBiomarkerTermOccurences,
} from "./utils/api-endpoints.js";
import { forwardSparqlQuery } from "./utils/forward-sparql-db.js";
import { getSpatialPlacement } from "./utils/get-spatial-placement.js";
const routes = express.Router();

routes.get("/technology-names", forwardSparqlQuery(getDatasetTechnologyNames));
routes.get("/provider-names", forwardSparqlQuery(getTissueProviderNames));
routes.get(
  "/ontology-term-occurences",
  forwardSparqlQuery(getOntologyTermOccurences),
);
routes.get(
  "/cell-type-term-occurences",
  forwardSparqlQuery(getCellTypeTermOccurences),
);
routes.get("/tissue-blocks", forwardSparqlQuery(getTissueBlocks));
routes.get("/reference-organs", forwardSparqlQuery(getReferenceOrgans));
routes.get("/ontology-tree-model", forwardSparqlQuery(getOntologyTreeModel));
routes.get("/celltype-tree-model", forwardSparqlQuery(getCellTypeTreeModel));
routes.get("/rui-locations", forwardSparqlQuery(getRuiLocations));
routes.get("/aggregate-results", forwardSparqlQuery(getAggregateResults));
routes.get("/db-status", forwardSparqlQuery(getDbStatus));
routes.get(
  "/hubmap/rui_locations.jsonld",
  forwardSparqlQuery(getHubmapRuiLocations),
);
routes.get(
  "/gtex/rui_locations.jsonld",
  forwardSparqlQuery(getGtexRuiLocations),
);
routes.get(
  "/reference-organ-scene",
  forwardSparqlQuery(getReferenceOrganScene),
);
routes.get("/scene", forwardSparqlQuery(getScene));
routes.post("/get-spatial-placement", getSpatialPlacement());
routes.get("/biomarker-tree-model", getBiomarkerTreeModel());
routes.get("/biomarker-term-occurences", getBiomarkerTermOccurences());
export default routes;
