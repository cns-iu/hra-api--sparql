import { SparqlEndpointFetcher } from 'fetch-sparql-endpoint';
import jsonld from 'jsonld';

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

/**
 * Generator that constructs a JSON-LD object based on a SPARQL CONSTRUCT query
 *
 * @param {string} query the SPARQL query as a string
 * @param {string} sparqlEndpoint the remote SPARQL endpoint to query
 * @param {object | undefined} frameObj an optional frame object for json-ld
 * @returns a JSON-LD object
 */
export async function constructJsonLd(query, sparqlEndpoint, frameObj = undefined) {
  const fetcher = new SparqlEndpointFetcher({});
  const stream = await fetcher.fetchTriples(sparqlEndpoint, query);
  return new Promise((resolve, _reject) => {
    const results = [];
    stream.on('data', (quad) => {
      results.push(quad);
    });
    stream.on('end', () => {
      resolve(results);
    });
  })
    .then((data) => jsonld.fromRDF(data))
    .then((data) => {
      if (frameObj) {
        return jsonld.frame(data, frameObj);
      } else {
        return data;
      }
    });
}
