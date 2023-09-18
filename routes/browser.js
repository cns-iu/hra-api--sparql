import { Router } from "express";
import { resolve } from "path";

export const browserRoute = (req, res, next) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>CCF-API Browser</title>

    <script src="https://cdn.jsdelivr.net/npm/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@stoplight/elements/styles.min.css">
  </head>
  <body>
    <elements-api apiDescriptionUrl="ccf-api-spec.yaml" router="hash" />
  </body>
</html>`);
};

export const openApiRoute = (req, res, next) => {
  const apiFile = resolve("ccf-api-spec.yaml");
  res.sendFile(apiFile);
};

const routes = Router()
  .get("/", browserRoute)
  .get("/ccf-api-spec.yaml", openApiRoute);

export default routes;