import { readFileSync } from 'fs';
import { filterSparqlQuery } from './filter-sparql-query.js';
import { constructJsonLd, selectRemoteObjects } from './sparql.js';
const sparqlEndpoint = 'https://lod.humanatlas.io/sparql';


async function executeFilteredQuery(sparqlFile, filter) {
  const sparqlQueryTemplate = readFileSync(sparqlFile).toString();
  try {
    // Get results as an array of objects
    const sparqlQuery = filterSparqlQuery(sparqlQueryTemplate, filter);
    const results = await selectRemoteObjects(sparqlQuery, sparqlEndpoint);
    return results;
  } catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }
}

async function executeFilteredConstructQuery(sparqlFile, filter, jsonFrame) {
  const sparqlQueryTemplate = readFileSync(sparqlFile).toString();
  const frameObj = JSON.parse(readFileSync(jsonFrame).toString());

  try {
    // Get results as an array of objects
    const sparqlQuery = filterSparqlQuery(sparqlQueryTemplate, filter);
    const results = await constructJsonLd(sparqlQuery, sparqlEndpoint, frameObj);
    return results;
  } catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }
}

function getSparqlFilePath(filename) {
  return `routes/v1/queries/${filename}`;
}


export async function getDatasetTechnologyNames(filter) {
  try {
    const queryFilePath = getSparqlFilePath('dataset-technology-names.rq');
    const results = executeFilteredQuery(queryFilePath, filter);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }
}

export async function getTissueProviderNames(filter) {
  try {
    const queryFilePath = getSparqlFilePath('tissue-provider-names.rq');
    const results = executeFilteredQuery(queryFilePath, filter);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
export async function getOntologyTermOccurences(filter) {
  try {
    const queryFilePath = getSparqlFilePath('ontology-term-occurences.rq');
    const results = executeFilteredQuery(queryFilePath, filter);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}

export async function getCellTypeTermOccurences(filter) {
  try {
    const queryFilePath = getSparqlFilePath('cell-type-term-occurences.rq');
    const results = executeFilteredQuery(queryFilePath, filter);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
export async function getReferenceOrgans(filter) {
  try {
    const queryFilePath = getSparqlFilePath('reference-organs.rq');
    const jsonFrame = getSparqlFilePath('jsonld-frames/reference-organs.jsonld');
    const results = executeFilteredConstructQuery(queryFilePath, filter, jsonFrame);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
export async function getTissueBlocks(filter) {
  try {
    const queryFilePath = getSparqlFilePath('tissue-blocks.rq');
    const jsonFrame = getSparqlFilePath('jsonld-frames/tissue-blocks.jsonld');
    const results = executeFilteredConstructQuery(queryFilePath, filter, jsonFrame);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
export async function getOntologyTreeModel(filter) {
  try {
    const queryFilePath = getSparqlFilePath('ontology-tree-model.rq');
    const jsonFrame = getSparqlFilePath('jsonld-frames/ontology-frame.jsonld');
    const results = executeFilteredConstructQuery(queryFilePath, filter, jsonFrame);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
export async function getCellTypeTreeModel(filter) {
  try {
    const queryFilePath = getSparqlFilePath('celltype-tree-model.rq');
    const jsonFrame = getSparqlFilePath('jsonld-frames/celltype-frame.jsonld');
    const results = executeFilteredConstructQuery(queryFilePath, filter, jsonFrame);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
export async function getRuiLocation(filter) {
  try {
    const queryFilePath = getSparqlFilePath('rui-location.rq');
    const jsonFrame = getSparqlFilePath('jsonld-frames/rui-location-frame.jsonld');
    const results = executeFilteredConstructQuery(queryFilePath, filter, jsonFrame);
    return results;
  }
  catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }

}
