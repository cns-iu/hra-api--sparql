
import { selectRemoteObjects } from './sparql.js';


export async function getDatasetTechnologyNames() {
  const sparqlEndpoint = 'https://lod.humanatlas.io/sparql';

  const sparqlQuery = `
      PREFIX ccf: <http://purl.org/ccf/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
      SELECT DISTINCT ?allTech
      WHERE {
        ?subject ccf:technology ?allTech .
      }
    `;

  try {
    // Get results as an array of objects
    console.log('Query Execution Started')
    const results = await selectRemoteObjects(sparqlQuery, sparqlEndpoint);
    console.log('Results as array of objects:');
    console.log(results);
    return results;

  } catch (error) {
    console.error('Error executing SPARQL query:', error.message);
  }
}

export async function getTissueProviderNames() {
  const sparqlEndpoint = 'https://lod.humanatlas.io/sparql';

  const sparqlQuery = `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX ccf: <http://purl.org/ccf/>
      
      SELECT DISTINCT ?providerName
      WHERE {
        ?tissueDonor a ccf:Donor ;
                    ccf:tissue_provider_name ?providerName .
      }    
    `;

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
