import express from 'express';
import { getDatasetTechnologyNames, getTissueProviderNames } from './utils/api-endpoints.js';

const routes = express.Router();

routes.get('/technology-names', async (_req, res) => res.json(await getDatasetTechnologyNames()));
routes.get('/tissue-provider-names', async (_req, res) => res.json(await getTissueProviderNames()));

export default routes;
