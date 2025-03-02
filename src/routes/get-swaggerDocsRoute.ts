import { FastifyInstance } from "fastify";
import path from "path";
import { fileURLToPath } from "url"; // Needed to resolve paths
import fs from "fs";
import YAML from "yaml";
import fastifyStatic from "@fastify/static";

// Define __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getSwaggerDocsRoute = async (app: FastifyInstance) => {
  const docsPath = path.join(__dirname, "../src/docs");

  // Register fastify-static to serve files from the docs directory
  app.register(fastifyStatic, {
    root: docsPath,
    prefix: "/docs/",
  });

  try {
    // Load and parse Swagger YAML once at startup
    const yamlPath = path.join(docsPath, "swagger.yaml");
    const yamlData = fs.readFileSync(yamlPath, "utf8");
    const definitionJSON = JSON.stringify(YAML.parse(yamlData));

    const htmlPath = path.join(docsPath, "index.html");
    let htmlData = fs.readFileSync(htmlPath, "utf-8");

    // Inject Swagger JSON into HTML
    const injectedHtml = htmlData.replace(
      '"...dumped definitionJSON..."',
      JSON.stringify(definitionJSON)
    );

    app.get("/docs", (_, reply) => {
      reply.type("text/html").send(injectedHtml);
    });
  } catch (error) {
    console.error("Error loading Swagger docs:", error);
  }
};
