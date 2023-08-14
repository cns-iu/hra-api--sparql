import { SparqlEndpointFetcher } from 'fetch-sparql-endpoint';

/**
 * Run a SPARQL query and return results as an array of values
 *
 * @param {string} query the SPARQL query as a string
 * @param {string} sparqlEndpoint the remote SPARQL endpoint to query
 * @returns array of values
 */
export async function selectRemoteObjects(query, sparqlEndpoint) {
  console.log('query',query)
  const fetcher = new SparqlEndpointFetcher({});
  const stream = await fetcher.fetchBindings(sparqlEndpoint, query);
  return new Promise((resolve, reject) => {
    const values = [];
    stream.on('data', (bindings) => {
      // Extract the values from the bindings object
      for (const key in bindings) {
        const value = bindings[key]?.value;
        if (value !== undefined) {
          values.push(value);
        }
      }
    });
    stream.on('end', () => {
      resolve(values);
    });
  });
}
export async function selectRemoteObjectsForOntology(query, sparqlEndpoint) {
  const fetcher = new SparqlEndpointFetcher({});
  const stream = await fetcher.fetchBindings(sparqlEndpoint, query);
  return new Promise((resolve, reject) => {
    const results = [];
    stream.on('data', (bindings) => {
      const result = Object.keys(bindings).reduce(
        (acc, key) => ((acc[key] = bindings[key]?.value), acc),
        {}
      );
      results.push(result);
    });
    stream.on('end', () => {
      resolve(results);
    });
  });
}
