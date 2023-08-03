import { readFileSync, writeFileSync } from 'fs';
import { selectRemoteObjects } from './sparql.js';

const sparqlEndpoint = 'https://lod.humanatlas.io/sparql';

export async function getDatasetTechnologyNames() {

  const queryFilePath = 'routes/v1/queries/dataset-technology-names.rq';
  const sparqlQuery = readFileSync(queryFilePath).toString();

  try {
    // Get results as an array of objects
    const results = await selectRemoteObjects(sparqlQuery, sparqlEndpoint);
    console.log('Results as array of objects:');
    console.log(results);
    return results;

  } catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }
}

export async function getTissueProviderNames() {

  const queryFilePath = 'routes/v1/queries/tissue-provider-names.rq';
  const sparqlQuery = readFileSync(queryFilePath).toString();
  try {
    // Get results as an array of objects
    const results = await selectRemoteObjects(sparqlQuery, sparqlEndpoint);
    console.log('Results as array of objects:');
    console.log(results);
    return results;

  } catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }
}
