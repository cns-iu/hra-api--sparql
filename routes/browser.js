import { Router } from "express";
import { resolve } from "path";

export const browserRoute = (_req, res, _next) => {
  res.send(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
    </head>
    <body>
      <rapi-doc
        spec-url="ccf-api-spec.yaml"
        fill-request-fields-with-example="false"
        theme="light"
        show-header="false"
        render-style="view"
        layout="column"
        allow-authentication="false"
      ></rapi-doc>
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
